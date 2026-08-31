#!/usr/bin/env python3
import json
import re
import time
import unicodedata
from difflib import SequenceMatcher
from pathlib import Path

from ytmusicapi import YTMusic

CATALOG = Path('tools/.generated/catalog.json')
CACHE = Path('ytmusic-id-cache.json')
OUTPUT = Path('direct-ids-generated.js')
RESOLVER_VERSION = 2

STOP_ARTIST_TOKENS = {
    'the', 'and', 'feat', 'ft', 'with', 'x', 'of', 'a', 'an', 'official',
    'music', 'records', 'recordings', 'entertainment'
}

# Only well-known naming aliases that cannot be recovered by punctuation/spacing normalization.
ARTIST_ALIASES = {
    'txt': {'tomorrowxtogether'},
    'tomorrowxtogether': {'txt'},
    'bss': {'booseoksoon', '부석순'},
    'booseoksoon': {'bss', '부석순'},
}


def norm(value: str) -> str:
    s = unicodedata.normalize('NFKC', str(value or '')).casefold()
    s = s.replace('’', "'").replace('“', '"').replace('”', '"')
    s = re.sub(r'\b(official|audio|video|mv|m/v|lyrics?|visualizer|topic)\b', ' ', s)
    s = re.sub(r'[^0-9a-z가-힣一-龥ぁ-ゟ゠-ヿ]+', ' ', s)
    return re.sub(r'\s+', ' ', s).strip()


def compact(value: str) -> str:
    return re.sub(r'\s+', '', norm(value))


def base_title(value: str) -> str:
    s = str(value or '')
    s = re.sub(r'\s*[\(\[（].*?[\)\]）]', ' ', s)
    s = re.sub(r'\s+(feat\.?|ft\.?)\s+.*$', ' ', s, flags=re.I)
    return norm(s)


def tokens(value: str):
    return {
        x for x in norm(value).split()
        if len(x) > 1 and x not in STOP_ARTIST_TOKENS
    }


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


def artist_is_valid(target: str, candidate: str) -> bool:
    nt, nc = norm(target), norm(candidate)
    ct, cc = compact(target), compact(candidate)
    if not nt or not nc:
        return False
    if ct == cc:
        return True

    # One named artist can be a subset of a collaboration, but avoid one-letter false positives.
    if min(len(ct), len(cc)) >= 4 and (ct in cc or cc in ct):
        return True

    if cc in ARTIST_ALIASES.get(ct, set()) or ct in ARTIST_ALIASES.get(cc, set()):
        return True

    ta, ca = tokens(target), tokens(candidate)
    shared = {x for x in ta & ca if len(x) >= 3}
    if shared:
        return True

    # Allows small spelling/spacing variations, not unrelated artists with the same song title.
    if min(len(ct), len(cc)) >= 5 and SequenceMatcher(None, ct, cc).ratio() >= 0.84:
        return True

    return False


def artist_similarity(target: str, candidate: str) -> float:
    nt, nc = norm(target), norm(candidate)
    if not nt or not nc:
        return 0.0
    ct, cc = compact(target), compact(candidate)
    if ct == cc:
        return 1.0
    if min(len(ct), len(cc)) >= 4 and (ct in cc or cc in ct):
        return 1.0
    ta, ca = tokens(target), tokens(candidate)
    overlap = len(ta & ca) / max(1, len(ta | ca))
    direct = SequenceMatcher(None, ct, cc).ratio()
    return max(direct, overlap)


def choose(results, title, artist, kind):
    best = None
    for r in results or []:
        video_id = str(r.get('videoId') or '').strip()
        if not video_id:
            continue
        ct = str(r.get('title') or '')
        ca = artist_text(r)
        if not artist_is_valid(artist, ca):
            continue
        ts = title_similarity(title, ct)
        ars = artist_similarity(artist, ca)
        score = ts * 0.82 + ars * 0.18
        if kind == 'audio':
            accepted = ts >= 0.78
        else:
            accepted = ts >= 0.84
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
        reusable = (
            old.get('resolverVersion') == RESOLVER_VERSION
            and old.get('kind') in {'audio', 'video'}
            and old.get('videoId')
        )
        if reusable:
            pass
        else:
            query = f'{title} {artist}'.strip()
            entry = None
            try:
                audio_results = search_with_retry(yt, query, 'songs')
                fresh_queries += 1
                match = choose(audio_results, title, artist, 'audio')
                if match:
                    entry = {'kind': 'audio', **match, 'query': query, 'resolverVersion': RESOLVER_VERSION}
                else:
                    video_results = search_with_retry(yt, query, 'videos')
                    fresh_queries += 1
                    match = choose(video_results, title, artist, 'video')
                    if match:
                        entry = {'kind': 'video', **match, 'query': query, 'resolverVersion': RESOLVER_VERSION}
            except Exception as exc:
                entry = {
                    'kind': 'unresolved', 'error': str(exc)[:240], 'query': query,
                    'resolverVersion': RESOLVER_VERSION
                }

            # Existing catalog IDs remain a safe fallback when the audio lookup cannot be verified.
            existing = str(song.get('existingVideoId') or '').strip()
            if entry is None and existing:
                entry = {
                    'kind': 'video', 'videoId': existing, 'query': query,
                    'source': 'catalog-existing', 'resolverVersion': RESOLVER_VERSION
                }
            if entry is None:
                entry = {'kind': 'unresolved', 'query': query, 'resolverVersion': RESOLVER_VERSION}

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
    unresolved_items = []
    for song in songs:
        key = song['key']
        item = cache.get(key) or {}
        vid = str(item.get('videoId') or '').strip()
        if item.get('kind') == 'audio' and vid:
            audio[key] = vid
        elif item.get('kind') == 'video' and vid:
            video[key] = vid
        else:
            unresolved_items.append({'key': key, 'title': song['title'], 'artist': song['artist']})

    generated = f"""(() => {{
  // Auto-generated by tools/resolve-ytmusic-ids.py.
  // Priority remains: audio/song ID -> official video fallback -> search.
  window.SHARK_AUDIO_IDS = Object.assign(window.SHARK_AUDIO_IDS || {{}}, {js_object(audio)});
  window.SHARK_VIDEO_IDS = Object.assign(window.SHARK_VIDEO_IDS || {{}}, {js_object(video)});
  window.SHARK_AUTO_ID_STATS = {{ version: {RESOLVER_VERSION}, total: {total}, audio: {len(audio)}, video: {len(video)}, unresolved: {len(unresolved_items)} }};
}})();
"""
    OUTPUT.write_text(generated, 'utf-8')
    print(f'Generated {OUTPUT}: version={RESOLVER_VERSION}, total={total}, audio={len(audio)}, video={len(video)}, unresolved={len(unresolved_items)}')
    if unresolved_items:
        print('UNRESOLVED_BEGIN')
        for item in unresolved_items:
            print(json.dumps(item, ensure_ascii=False))
        print('UNRESOLVED_END')


if __name__ == '__main__':
    main()
