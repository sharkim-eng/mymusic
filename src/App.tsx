import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'

type Mood = 'happy' | 'calm' | 'focus' | 'energy' | 'emotional'
type Genre = 'indie' | 'domestic' | 'international'
type View = 'discover' | 'mymusic'

type Track = {
  id: string
  videoId: string
  title: string
  artist: string
  thumbnail: string
  mood: Mood
  genre: Genre
}

type YouTubeSearchItem = {
  id?: { videoId?: string }
  snippet?: {
    title?: string
    channelTitle?: string
    thumbnails?: {
      medium?: { url?: string }
      high?: { url?: string }
      default?: { url?: string }
    }
  }
}

type YouTubeVideoItem = {
  id?: string
  snippet?: YouTubeSearchItem['snippet']
  status?: { embeddable?: boolean }
}

const moods: Array<{ id: Mood; emoji: string; label: string; query: string }> = [
  { id: 'happy', emoji: '😊', label: '행복', query: 'happy upbeat music' },
  { id: 'calm', emoji: '🌙', label: '차분', query: 'calm chill relaxing music' },
  { id: 'focus', emoji: '🎧', label: '집중', query: 'focus study music' },
  { id: 'energy', emoji: '⚡', label: '신남', query: 'energetic workout music' },
  { id: 'emotional', emoji: '🌊', label: '감성', query: 'emotional indie music' },
]

const genres: Array<{ id: Genre; label: string; query: string }> = [
  { id: 'indie', label: '인디', query: 'indie music' },
  { id: 'domestic', label: '국내', query: 'korean music' },
  { id: 'international', label: '해외', query: 'international pop music' },
]

const moodMap = Object.fromEntries(moods.map((m) => [m.id, m])) as Record<Mood, (typeof moods)[number]>
const genreMap = Object.fromEntries(genres.map((g) => [g.id, g])) as Record<Genre, (typeof genres)[number]>

const decode = (value = '') => {
  const doc = new DOMParser().parseFromString(value, 'text/html')
  return doc.documentElement.textContent || value
}

const guessGenre = (title: string, artist: string): Genre => {
  const text = `${title} ${artist}`
  if (/indie|인디/i.test(text)) return 'indie'
  if (/[가-힣]/.test(text)) return 'domestic'
  return 'international'
}

const guessMood = (title: string): Mood => {
  if (/study|focus|work|집중|공부/i.test(title)) return 'focus'
  if (/chill|calm|sleep|relax|차분|새벽|밤/i.test(title)) return 'calm'
  if (/dance|party|workout|energy|신나는|신남/i.test(title)) return 'energy'
  if (/sad|emotional|love|rain|감성|이별|사랑|비/i.test(title)) return 'emotional'
  return 'happy'
}

const parseYouTubeId = (raw: string) => {
  const value = raw.trim()
  if (/^[\w-]{11}$/.test(value)) return value
  try {
    const url = new URL(value)
    if (url.hostname.includes('youtu.be')) return url.pathname.split('/').filter(Boolean)[0] || ''
    const v = url.searchParams.get('v')
    if (v) return v
    const parts = url.pathname.split('/').filter(Boolean)
    const marker = parts.findIndex((p) => p === 'embed' || p === 'shorts' || p === 'live')
    if (marker >= 0) return parts[marker + 1] || ''
  } catch {
    return ''
  }
  return ''
}

function App() {
  const playerHost = useRef<HTMLDivElement>(null)
  const player = useRef<any>(null)
  const endedHandler = useRef<() => void>(() => undefined)

  const [view, setView] = useState<View>('discover')
  const [query, setQuery] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [results, setResults] = useState<Track[]>([])
  const [library, setLibrary] = useState<Track[]>(() => {
    try { return JSON.parse(localStorage.getItem('mymusic-youtube-library') || '[]') as Track[] } catch { return [] }
  })
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('mymusic-youtube-api-key') || '')
  const [showSettings, setShowSettings] = useState(false)
  const [mood, setMood] = useState<Mood | 'all'>('all')
  const [genre, setGenre] = useState<Genre | 'all'>('all')
  const [currentId, setCurrentId] = useState('')
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(80)
  const [loading, setLoading] = useState(false)
  const [notice, setNotice] = useState('')

  useEffect(() => localStorage.setItem('mymusic-youtube-library', JSON.stringify(library)), [library])
  useEffect(() => localStorage.setItem('mymusic-youtube-api-key', apiKey.trim()), [apiKey])
  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(''), 2800)
    return () => window.clearTimeout(timer)
  }, [notice])

  const allKnown = useMemo(() => {
    const map = new Map<string, Track>()
    library.forEach((track) => map.set(track.id, track))
    results.forEach((track) => map.set(track.id, track))
    return [...map.values()]
  }, [library, results])

  const current = allKnown.find((track) => track.id === currentId)
  const sourceTracks = view === 'mymusic' ? library : results
  const shown = useMemo(() => sourceTracks.filter((track) =>
    (mood === 'all' || track.mood === mood) && (genre === 'all' || track.genre === genre)
  ), [sourceTracks, mood, genre])

  const currentIndex = shown.findIndex((track) => track.id === currentId)

  const next = () => {
    if (!shown.length) return
    const index = currentIndex < 0 ? 0 : (currentIndex + 1) % shown.length
    playTrack(shown[index])
  }

  const previous = () => {
    if (!shown.length) return
    const index = currentIndex <= 0 ? shown.length - 1 : currentIndex - 1
    playTrack(shown[index])
  }

  endedHandler.current = next

  useEffect(() => {
    const win = window as typeof window & { YT?: any; onYouTubeIframeAPIReady?: () => void }

    const init = () => {
      if (!playerHost.current || player.current || !win.YT?.Player) return
      player.current = new win.YT.Player(playerHost.current, {
        height: '100%',
        width: '100%',
        playerVars: { playsinline: 1, rel: 0, modestbranding: 1 },
        events: {
          onReady: (event: any) => {
            event.target.setVolume(volume)
            if (current?.videoId) event.target.cueVideoById(current.videoId)
          },
          onStateChange: (event: any) => {
            if (event.data === 1) setPlaying(true)
            if (event.data === 2 || event.data === 0) setPlaying(false)
            if (event.data === 0) endedHandler.current()
          },
        },
      })
    }

    if (win.YT?.Player) init()
    else {
      const existing = document.querySelector('script[src="https://www.youtube.com/iframe_api"]')
      if (!existing) {
        const script = document.createElement('script')
        script.src = 'https://www.youtube.com/iframe_api'
        document.head.appendChild(script)
      }
      const previousReady = win.onYouTubeIframeAPIReady
      win.onYouTubeIframeAPIReady = () => {
        previousReady?.()
        init()
      }
    }

    return () => {
      player.current?.destroy?.()
      player.current = null
    }
  }, [])

  useEffect(() => {
    if (!current?.videoId || !player.current?.loadVideoById) return
    player.current.loadVideoById(current.videoId)
    player.current.setVolume?.(volume)
    setPlaying(true)
  }, [current?.videoId])

  useEffect(() => { player.current?.setVolume?.(volume) }, [volume])

  const makeTrack = (item: YouTubeSearchItem, forcedMood?: Mood, forcedGenre?: Genre): Track | null => {
    const videoId = item.id?.videoId
    const title = decode(item.snippet?.title)
    const artist = decode(item.snippet?.channelTitle)
    if (!videoId) return null
    return {
      id: `yt-${videoId}`,
      videoId,
      title: title || 'YouTube Music',
      artist: artist || 'YouTube',
      thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || item.snippet?.thumbnails?.default?.url || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      mood: forcedMood || guessMood(title),
      genre: forcedGenre || guessGenre(title, artist),
    }
  }

  const searchYouTube = async (term: string, forcedMood?: Mood, forcedGenre?: Genre) => {
    const key = apiKey.trim()
    if (!key) {
      setShowSettings(true)
      setNotice('YouTube 검색을 사용하려면 API 키를 입력해 주세요.')
      return
    }
    const searchTerm = term.trim()
    if (!searchTerm) return

    setLoading(true)
    try {
      const params = new URLSearchParams({
        part: 'snippet',
        type: 'video',
        videoCategoryId: '10',
        videoEmbeddable: 'true',
        maxResults: '18',
        regionCode: 'KR',
        q: searchTerm,
        key,
      })
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?${params.toString()}`)
      const data = await response.json() as { items?: YouTubeSearchItem[]; error?: { message?: string } }
      if (!response.ok) throw new Error(data.error?.message || 'YouTube 검색에 실패했습니다.')
      const tracks = (data.items || []).map((item) => makeTrack(item, forcedMood, forcedGenre)).filter(Boolean) as Track[]
      setResults(tracks)
      setView('discover')
      setMood(forcedMood || 'all')
      setGenre(forcedGenre || 'all')
      if (!tracks.length) setNotice('검색 결과가 없습니다.')
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'YouTube 검색에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const submitSearch = (event: FormEvent) => {
    event.preventDefault()
    void searchYouTube(query)
  }

  const recommendMood = (id: Mood) => {
    setMood(id)
    const selected = moodMap[id]
    const genreQuery = genre === 'all' ? '' : ` ${genreMap[genre].query}`
    void searchYouTube(`${selected.query}${genreQuery}`, id, genre === 'all' ? undefined : genre)
  }

  const chooseGenre = (id: Genre | 'all') => {
    setGenre(id)
    if (id === 'all') return
    const moodQuery = mood === 'all' ? '' : `${moodMap[mood].query} `
    void searchYouTube(`${moodQuery}${genreMap[id].query}`, mood === 'all' ? undefined : mood, id)
  }

  const fetchTrackById = async (videoId: string): Promise<Track> => {
    const key = apiKey.trim()
    if (!key) {
      return {
        id: `yt-${videoId}`,
        videoId,
        title: 'YouTube Music',
        artist: '링크로 추가한 음악',
        thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        mood: mood === 'all' ? 'happy' : mood,
        genre: genre === 'all' ? 'international' : genre,
      }
    }

    const params = new URLSearchParams({ part: 'snippet,status', id: videoId, key })
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?${params.toString()}`)
    const data = await response.json() as { items?: YouTubeVideoItem[]; error?: { message?: string } }
    if (!response.ok) throw new Error(data.error?.message || '영상 정보를 가져오지 못했습니다.')
    const item = data.items?.[0]
    if (!item) throw new Error('해당 YouTube 영상을 찾을 수 없습니다.')
    if (item.status?.embeddable === false) throw new Error('이 영상은 외부 사이트에서 재생할 수 없습니다.')
    const fakeSearchItem: YouTubeSearchItem = { id: { videoId }, snippet: item.snippet }
    return makeTrack(fakeSearchItem, mood === 'all' ? undefined : mood, genre === 'all' ? undefined : genre) as Track
  }

  const addUrl = async (event: FormEvent) => {
    event.preventDefault()
    const videoId = parseYouTubeId(urlInput)
    if (!videoId) return setNotice('올바른 YouTube 또는 YouTube Music 주소를 입력해 주세요.')
    try {
      const track = await fetchTrackById(videoId)
      setResults((items) => [track, ...items.filter((item) => item.id !== track.id)])
      setUrlInput('')
      setView('discover')
      playTrack(track)
    } catch (error) {
      setNotice(error instanceof Error ? error.message : '링크를 추가하지 못했습니다.')
    }
  }

  function playTrack(track: Track) {
    setCurrentId(track.id)
    if (player.current?.loadVideoById) {
      player.current.loadVideoById(track.videoId)
      setPlaying(true)
    }
  }

  const togglePlay = () => {
    if (!current) return
    if (playing) player.current?.pauseVideo?.()
    else player.current?.playVideo?.()
  }

  const isSaved = (id: string) => library.some((track) => track.id === id)
  const toggleHeart = (track: Track) => {
    if (isSaved(track.id)) {
      setLibrary((items) => items.filter((item) => item.id !== track.id))
      setNotice('My Music에서 삭제했습니다.')
    } else {
      setLibrary((items) => [track, ...items])
      setNotice('My Music에 저장했습니다.')
    }
  }

  const updateTrackMeta = (track: Track, kind: 'mood' | 'genre') => {
    const nextTrack = { ...track }
    if (kind === 'mood') {
      const index = moods.findIndex((item) => item.id === track.mood)
      nextTrack.mood = moods[(index + 1) % moods.length].id
    } else {
      const index = genres.findIndex((item) => item.id === track.genre)
      nextTrack.genre = genres[(index + 1) % genres.length].id
    }
    setResults((items) => items.map((item) => item.id === track.id ? nextTrack : item))
    setLibrary((items) => items.map((item) => item.id === track.id ? nextTrack : item))
  }

  return <div className="app">
    <aside className="sidebar">
      <div className="logo"><span>♫</span> MYMUSIC</div>
      <button className={view === 'discover' ? 'active' : ''} onClick={() => setView('discover')}>⌕ 둘러보기</button>
      <button className={view === 'mymusic' ? 'active' : ''} onClick={() => setView('mymusic')}>♥ My Music <b>{library.length}</b></button>
      <div className="sideLabel">장르</div>
      {genres.map((item) => <button key={item.id} className={genre === item.id ? 'active' : ''} onClick={() => chooseGenre(item.id)}># {item.label}</button>)}
      <div className="spacer" />
      <button onClick={() => setShowSettings((value) => !value)}>⚙ YouTube 설정</button>
      <p>공식 YouTube 임베드 플레이어와 YouTube Data API를 사용합니다.</p>
    </aside>

    <main>
      <header>
        <div><small>YOUR MOOD, YOUR MUSIC</small><h1>{view === 'mymusic' ? 'My Music' : '오늘 뭐 들을까요?'}</h1></div>
        <form className="searchForm" onSubmit={submitSearch}>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="노래, 가수 검색" />
          <button disabled={loading}>{loading ? '검색 중' : '검색'}</button>
        </form>
      </header>

      <section className="moodPanel">
        <div className="moodCopy"><small>MOOD RECOMMENDATION</small><h2>지금 기분이 어때요?</h2><p>기분을 고르면 YouTube 음악 검색 결과를 그 분위기에 맞춰 추천합니다.</p></div>
        <div className="moodButtons">
          {moods.map((item) => <button key={item.id} className={mood === item.id ? 'selected' : ''} onClick={() => recommendMood(item.id)}><span>{item.emoji}</span>{item.label}</button>)}
        </div>
      </section>

      <section className="quickBar">
        <div className="genreFilters"><button className={genre === 'all' ? 'selected' : ''} onClick={() => setGenre('all')}>전체</button>{genres.map((item) => <button key={item.id} className={genre === item.id ? 'selected' : ''} onClick={() => chooseGenre(item.id)}>{item.label}</button>)}</div>
        <form className="urlForm" onSubmit={addUrl}>
          <input value={urlInput} onChange={(event) => setUrlInput(event.target.value)} placeholder="YouTube Music 링크 붙여넣기" />
          <button>재생</button>
        </form>
      </section>

      {(showSettings || !apiKey) && <section className="settingsPanel">
        <div><b>YouTube Data API 키</b><p>검색 기능에만 사용합니다. 키는 이 브라우저에만 저장되며 GitHub 저장소에는 올라가지 않습니다. Google Cloud에서 HTTP 리퍼러 제한을 설정하는 것을 권장합니다.</p></div>
        <input type="password" value={apiKey} onChange={(event) => setApiKey(event.target.value)} placeholder="API key" />
        <button onClick={() => setShowSettings(false)}>완료</button>
      </section>}

      {current && <section className="nowPlaying">
        <div className="videoShell"><div ref={playerHost} id="youtube-player" /></div>
        <div className="nowInfo">
          <small>NOW PLAYING</small>
          <h2>{current.title}</h2>
          <p>{current.artist}</p>
          <div className="trackTags"><button onClick={() => updateTrackMeta(current, 'mood')}>{moodMap[current.mood].emoji} {moodMap[current.mood].label}</button><button onClick={() => updateTrackMeta(current, 'genre')}># {genreMap[current.genre].label}</button></div>
          <button className={`heartLarge ${isSaved(current.id) ? 'saved' : ''}`} onClick={() => toggleHeart(current)}>{isSaved(current.id) ? '♥ My Music에 저장됨' : '♡ My Music에 저장'}</button>
        </div>
      </section>}

      <section className="library">
        <div className="sectionTitle"><div><small>{view === 'mymusic' ? 'SAVED TRACKS' : 'YOUTUBE RESULTS'}</small><h3>{view === 'mymusic' ? '내가 저장한 음악' : '추천 · 검색 결과'}</h3></div><span>{shown.length} tracks</span></div>
        {!shown.length && <div className="empty">
          <div>♫</div>
          <b>{view === 'mymusic' ? '아직 저장한 음악이 없습니다.' : '검색하거나 기분을 선택해 보세요.'}</b>
          <p>{view === 'mymusic' ? '곡의 하트를 누르면 이곳 My Music으로 이동합니다.' : 'YouTube Music 링크를 붙여넣으면 API 키가 없어도 바로 재생할 수 있습니다.'}</p>
        </div>}
        <div className="trackGrid">
          {shown.map((track) => <article key={track.id} className={`trackCard ${currentId === track.id ? 'playing' : ''}`} onClick={() => playTrack(track)}>
            <div className="thumb"><img src={track.thumbnail} alt="" /><span className="playBadge">{currentId === track.id && playing ? 'Ⅱ' : '▶'}</span><button className={`heart ${isSaved(track.id) ? 'saved' : ''}`} aria-label="My Music" onClick={(event) => { event.stopPropagation(); toggleHeart(track) }}>{isSaved(track.id) ? '♥' : '♡'}</button></div>
            <div className="cardBody"><b>{track.title}</b><p>{track.artist}</p><div className="miniTags"><button onClick={(event) => { event.stopPropagation(); updateTrackMeta(track, 'mood') }}>{moodMap[track.mood].emoji} {moodMap[track.mood].label}</button><button onClick={(event) => { event.stopPropagation(); updateTrackMeta(track, 'genre') }}># {genreMap[track.genre].label}</button></div></div>
          </article>)}
        </div>
      </section>
    </main>

    {current && <footer>
      <div className="footerTrack"><img src={current.thumbnail} alt="" /><span><b>{current.title}</b><small>{current.artist}</small></span></div>
      <div className="footerControls"><button onClick={previous}>◀</button><button className="mainPlay" onClick={togglePlay}>{playing ? 'Ⅱ' : '▶'}</button><button onClick={next}>▶</button></div>
      <div className="footerVolume">🔊 <input type="range" min="0" max="100" value={volume} onChange={(event) => setVolume(Number(event.target.value))} /></div>
    </footer>}

    {notice && <div className="notice">{notice}</div>}
  </div>
}

export default App
