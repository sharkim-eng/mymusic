#!/usr/bin/env python3
import json
import os
import re
import time
import unicodedata
from difflib import SequenceMatcher
from pathlib import Path

from ytmusicapi import YTMusic

CATALOG = Path('tools/.generated/catalog.json')
CACHE = Path('ytmusic-id-cache.json')
OUTPUT = Path('direct-ids-generated.js')


def norm(value: str) -> str:
    s = unicodedata.normalize('NFKC', str(value or '')).casefold()
    s = s.replace('’', "'").replace('“', '"').replace('”', '"')
    s = re.sub(r'\b(official|audio|video|mv|m/v|lyrics?|visualizer|topic)\b', ' ', s)
    s = re.sub(r'[^0-9a-z가-힣一-龥ぁ-ゟ゠-ヿ]+', ' ', s)
    return re.sub(r'\s+', ' ', s).strip()


def base_title(value: str) -> str:
    s = str(value or '')
    s = re.sub(r'\s*[\(\[（].*?[\)\]）]', ' ', s)
    s = re.sub(r'\s+(feat\.?|ft\.?)\s+.*$', ' ', s, flags=re.I)
    return norm(s)


def tokens(value: str):
    return {x for x in norm(value).split() if len(x) > 1}


def similarity(a: str, b: str) -> float:
    na, nb = norm(a), norm(b)
    if not na or not nb:
        return 0.0
    if na == nb:
        return 1.0
    return SequenceMatcher(None, na, nb).ratio()


def title_similarity(target: str, candidate: str) -> float:
    return max(
        similarity(target, candidate),
        similarity(base_title(target), candidate),
        similarity(target, base_title(candidate)),
        similarity(base_title(target), base_title(candidate)),
    )


def artist_text(result: dict) -> str:
    artists = result.get('artists') or []
    if isinstance(artists, list):
        names = [str(a.get('name') or '') for a in artists if isinstance(a, dict)]
        if names:
            return ' '.join(names)
    return str(result.get('artist') or result.get('author') or '')


def artist_similarity(target: str, candidate: str) -> float:
    nt, nc = norm(target), norm(candidate)
    if not nt or not nc:
        return 0.0
    if nt in nc or nc in nt:
        return 1.0
    direct = SequenceMatcher(None, nt, nc).ratio()
    ta, ca = tokens(target), tokens(candidate)
    overlap = len(ta & ca) / max(1, len(ta | ca))
    return max(direct, overlap)


def choose(results, title, artist, kind):
    best = None
    for r in results or []:
        video_id = str(r.get('videoId') or '').strip()
        if not video_id:
            continue
        ct = str(r.get('title') or '')
        ca = artist_text(r)
        ts = title_similarity(title, ct)
        ars = artist_similarity(artist, ca)
        score = ts * 0.78 + ars * 0.22
        if kind == 'audio':
            accepted = (ts >= 0.78 and ars >= 0.34) or (ts >= 0.94 and ars >= 0.18)
        else:
            accepted = (ts >= 0.84 and ars >= 0.34) or (ts >= 0.96 and ars >= 0.18)
        if not accepted:
            continue
        item = {
            'videoId': video_id,
            'matchedTitle': ct,
            'matchedArtist': ca,
            'titleScore': round(ts, 4),
            'artistScore': round(ars, 4),
            'score': round(score, 4),
        }
        if best is None or item['score'] > best['score']:
            best = item
    return best


def search_with_retry(yt, query, filter_name):
    last = None
    for attempt in range(3):
        try:
            return yt.search(query, filter=filter_name, limit=7)
        except Exception as exc:
            last = exc
            time.sleep(1.2 * (attempt + 1))
    raise last


def js_object(mapping):
    return json.dumps(mapping, ensure_ascii=False, indent=2, sort_keys=True)


def main():
    songs = json.loads(CATALOG.read_text('utf-8'))
    if CACHE.exists():
        try:
            cache = json.loads(CACHE.read_text('utf-8'))
        except Exception:
            cache = {}
    else:
        cache = {}

    yt = YTMusic()
    total = len(songs)
    resolved_audio = 0
    resolved_video = 0
    unresolved = 0
    fresh_queries = 0

    for idx, song in enumerate(songs, 1):
        key = song['key']
        title = song['title']
        artist = song['artist']
        old = cache.get(key) or {}
        if old.get('kind') in {'audio', 'video'} and old.get('videoId'):
            pass
        else:
            query = f'{title} {artist}'.strip()
            entry = None
            try:
                audio_results = search_with_retry(yt, query, 'songs')
                fresh_queries += 1
                match = choose(audio_results, title, artist, 'audio')
                if match:
                    entry = {'kind': 'audio', **match, 'query': query}
                else:
                    video_results = search_with_retry(yt, query, 'videos')
                    fresh_queries += 1
                    match = choose(video_results, title, artist, 'video')
                    if match:
                        entry = {'kind': 'video', **match, 'query': query}
            except Exception as exc:
                entry = {'kind': 'unresolved', 'error': str(exc)[:240], 'query': query}

            if entry is None:
                entry = {'kind': 'unresolved', 'query': query}
            cache[key] = entry
            if idx % 20 == 0:
                CACHE.write_text(json.dumps(cache, ensure_ascii=False, indent=2, sort_keys=True), 'utf-8')
            time.sleep(0.10)

        kind = (cache.get(key) or {}).get('kind')
        if kind == 'audio':
            resolved_audio += 1
        elif kind == 'video':
            resolved_video += 1
        else:
            unresolved += 1

        if idx % 25 == 0 or idx == total:
            print(f'[{idx}/{total}] audio={resolved_audio}, video={resolved_video}, unresolved={unresolved}, queries={fresh_queries}', flush=True)

    CACHE.write_text(json.dumps(cache, ensure_ascii=False, indent=2, sort_keys=True), 'utf-8')

    audio = {}
    video = {}
    for song in songs:
        key = song['key']
        item = cache.get(key) or {}
        vid = str(item.get('videoId') or '').strip()
        if item.get('kind') == 'audio' and vid:
            audio[key] = vid
        elif item.get('kind') == 'video' and vid:
            video[key] = vid

    generated = f"""(() => {{
  // Auto-generated by tools/resolve-ytmusic-ids.py.
  // Priority remains: audio/song ID -> official video fallback -> search.
  window.SHARK_AUDIO_IDS = Object.assign(window.SHARK_AUDIO_IDS || {{}}, {js_object(audio)});
  window.SHARK_VIDEO_IDS = Object.assign(window.SHARK_VIDEO_IDS || {{}}, {js_object(video)});
  window.SHARK_AUTO_ID_STATS = {{ total: {total}, audio: {len(audio)}, video: {len(video)}, unresolved: {total - len(audio) - len(video)} }};
}})();
"""
    OUTPUT.write_text(generated, 'utf-8')
    print(f'Generated {OUTPUT}: total={total}, audio={len(audio)}, video={len(video)}, unresolved={total-len(audio)-len(video)}')


if __name__ == '__main__':
    main()
