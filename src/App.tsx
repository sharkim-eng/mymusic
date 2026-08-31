import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import { deleteStoredTrack, getStoredTracks, saveStoredTrack } from './lib/musicDb'
import type { StoredTrack, Track } from './types'

const demos: Track[] = [
  { id: 'demo-1', title: 'Blue Horizon', artist: 'MYMUSIC Demo', album: 'Ocean Drive', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', source: 'demo' },
  { id: 'demo-2', title: 'After Rain', artist: 'MYMUSIC Demo', album: 'Night Air', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', source: 'demo' },
  { id: 'demo-3', title: 'Slow Current', artist: 'MYMUSIC Demo', album: 'Blue Hour', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', source: 'demo' },
]

type RepeatMode = 'off' | 'all' | 'one'
type Mood = 'happy' | 'calm' | 'focus' | 'energy' | 'sentimental'

type MoodOption = {
  id: Mood
  label: string
  emoji: string
  description: string
}

const moodOptions: MoodOption[] = [
  { id: 'happy', label: '행복', emoji: '😊', description: '기분 좋은 리듬' },
  { id: 'calm', label: '차분', emoji: '🌙', description: '편안하게 쉬고 싶을 때' },
  { id: 'focus', label: '집중', emoji: '🎧', description: '몰입이 필요한 순간' },
  { id: 'energy', label: '신남', emoji: '⚡', description: '에너지를 올리고 싶을 때' },
  { id: 'sentimental', label: '감성', emoji: '🌊', description: '감성에 잠기고 싶을 때' },
]

const defaultMoodTags: Record<string, Mood[]> = {
  'demo-1': ['happy', 'energy'],
  'demo-2': ['calm', 'focus'],
  'demo-3': ['sentimental', 'calm'],
}

const time = (n = 0) => {
  if (!Number.isFinite(n)) return '0:00'
  return `${Math.floor(n / 60)}:${Math.floor(n % 60).toString().padStart(2, '0')}`
}

const titleFromFile = (name: string) => name.replace(/\.[^/.]+$/, '')

function App() {
  const audio = useRef<HTMLAudioElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const urls = useRef<string[]>([])

  const [local, setLocal] = useState<Track[]>([])
  const [currentId, setCurrentId] = useState(demos[0].id)
  const [playing, setPlaying] = useState(false)
  const [position, setPosition] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [query, setQuery] = useState('')
  const [favorites, setFavorites] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('mymusic-favorites') || '[]') as string[] } catch { return [] }
  })
  const [trackMoods, setTrackMoods] = useState<Record<string, Mood[]>>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mymusic-moods') || '{}') as Record<string, Mood[]>
      return { ...defaultMoodTags, ...saved }
    } catch {
      return defaultMoodTags
    }
  })
  const [selectedMood, setSelectedMood] = useState<Mood>('happy')
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState<RepeatMode>('all')
  const [notice, setNotice] = useState('')

  const tracks = useMemo(() => [...local, ...demos], [local])
  const current = tracks.find((t) => t.id === currentId) ?? tracks[0]
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return tracks.filter((t) => (!favoritesOnly || favorites.includes(t.id)) && (!q || `${t.title} ${t.artist} ${t.album}`.toLowerCase().includes(q)))
  }, [tracks, query, favoritesOnly, favorites])
  const mood = moodOptions.find((item) => item.id === selectedMood) ?? moodOptions[0]
  const moodRecommendations = useMemo(
    () => tracks.filter((track) => (trackMoods[track.id] ?? []).includes(selectedMood)),
    [tracks, trackMoods, selectedMood],
  )

  useEffect(() => {
    getStoredTracks().then((saved) => {
      const loaded = saved.map((s) => {
        const src = URL.createObjectURL(s.blob)
        urls.current.push(src)
        return { id: s.id, title: s.title, artist: s.artist, album: s.album, src, duration: s.duration, source: 'local' as const, addedAt: s.addedAt }
      })
      setLocal(loaded)
    }).catch(() => setNotice('저장된 음악을 불러오지 못했습니다.'))
    return () => urls.current.forEach(URL.revokeObjectURL)
  }, [])

  useEffect(() => { localStorage.setItem('mymusic-favorites', JSON.stringify(favorites)) }, [favorites])
  useEffect(() => { localStorage.setItem('mymusic-moods', JSON.stringify(trackMoods)) }, [trackMoods])
  useEffect(() => { if (audio.current) audio.current.volume = volume }, [volume])
  useEffect(() => {
    const el = audio.current
    if (!el || !current) return
    el.src = current.src
    el.load()
    setPosition(0)
    setDuration(current.duration ?? 0)
    if (playing) el.play().catch(() => setPlaying(false))
  }, [current?.id])
  useEffect(() => {
    if (!notice) return
    const t = window.setTimeout(() => setNotice(''), 2500)
    return () => clearTimeout(t)
  }, [notice])

  const select = (track: Track) => {
    if (track.id === currentId) return togglePlay()
    setCurrentId(track.id)
    setPlaying(true)
  }

  const togglePlay = () => {
    const el = audio.current
    if (!el) return
    if (el.paused) el.play().then(() => setPlaying(true)).catch(() => setNotice('이 곡을 재생할 수 없습니다.'))
    else { el.pause(); setPlaying(false) }
  }

  const next = () => {
    if (!current || tracks.length === 0) return
    if (repeat === 'one' && audio.current) {
      audio.current.currentTime = 0
      audio.current.play().catch(() => setPlaying(false))
      return
    }
    if (shuffle && tracks.length > 1) {
      const candidates = tracks.filter((t) => t.id !== current.id)
      setCurrentId(candidates[Math.floor(Math.random() * candidates.length)].id)
      setPlaying(true)
      return
    }
    const i = tracks.findIndex((t) => t.id === current.id)
    if (i < tracks.length - 1) { setCurrentId(tracks[i + 1].id); setPlaying(true) }
    else if (repeat === 'all') { setCurrentId(tracks[0].id); setPlaying(true) }
    else setPlaying(false)
  }

  const prev = () => {
    const el = audio.current
    if (el && el.currentTime > 3) { el.currentTime = 0; return }
    const i = tracks.findIndex((t) => t.id === current?.id)
    setCurrentId(tracks[i <= 0 ? tracks.length - 1 : i - 1].id)
    setPlaying(true)
  }

  const toggleFavorite = (id: string) => setFavorites((v) => v.includes(id) ? v.filter((x) => x !== id) : [...v, id])

  const cycleTrackMood = (track: Track) => {
    const existing = trackMoods[track.id] ?? []
    const currentMood = existing[0]
    const index = moodOptions.findIndex((item) => item.id === currentMood)
    const nextMood = moodOptions[(index + 1 + moodOptions.length) % moodOptions.length].id
    setTrackMoods((value) => ({ ...value, [track.id]: [nextMood] }))
    const label = moodOptions.find((item) => item.id === nextMood)?.label
    setNotice(`${track.title} → ${label} 기분으로 분류했습니다.`)
  }

  const playMood = () => {
    if (!moodRecommendations.length) return setNotice('이 기분으로 분류된 곡이 아직 없습니다.')
    const first = moodRecommendations[Math.floor(Math.random() * moodRecommendations.length)]
    setCurrentId(first.id)
    setPlaying(true)
  }

  const importFiles = async (files: File[]) => {
    const audioFiles = files.filter((f) => f.type.startsWith('audio/') || /\.(mp3|m4a|wav|ogg|flac)$/i.test(f.name))
    if (!audioFiles.length) return setNotice('오디오 파일을 선택해 주세요.')
    const added: Track[] = []
    for (const file of audioFiles) {
      const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`
      const stored: StoredTrack = { id, title: titleFromFile(file.name), artist: '내 음악', album: 'Local Library', blob: file, addedAt: Date.now() }
      await saveStoredTrack(stored)
      const src = URL.createObjectURL(file)
      urls.current.push(src)
      added.push({ ...stored, src, source: 'local' })
    }
    setLocal((v) => [...added, ...v])
    setCurrentId(added[0].id)
    setPlaying(true)
    setNotice(`${added.length}곡을 추가했습니다. 곡 오른쪽 기분 버튼으로 태그를 지정해 보세요.`)
  }

  const onFiles = (e: ChangeEvent<HTMLInputElement>) => {
    void importFiles(Array.from(e.target.files ?? []))
    e.target.value = ''
  }

  const remove = async (track: Track) => {
    if (track.source !== 'local') return
    await deleteStoredTrack(track.id)
    URL.revokeObjectURL(track.src)
    setLocal((v) => v.filter((t) => t.id !== track.id))
    setFavorites((v) => v.filter((id) => id !== track.id))
    setTrackMoods((value) => {
      const nextValue = { ...value }
      delete nextValue[track.id]
      return nextValue
    })
    if (track.id === currentId) { setCurrentId(demos[0].id); setPlaying(false) }
  }

  const cycleRepeat = () => setRepeat((v) => v === 'off' ? 'all' : v === 'all' ? 'one' : 'off')

  return <div className="app">
    <audio ref={audio} onTimeUpdate={(e) => setPosition(e.currentTarget.currentTime)} onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={next} />

    <aside>
      <div className="logo"><span>♫</span> MYMUSIC</div>
      <button className={!favoritesOnly ? 'active' : ''} onClick={() => setFavoritesOnly(false)}>▦ 모든 음악</button>
      <button className={favoritesOnly ? 'active' : ''} onClick={() => setFavoritesOnly(true)}>♥ 좋아요</button>
      <div className="spacer" />
      <p>{local.length}곡이 이 브라우저에 저장됨</p>
      <button className="add" onClick={() => input.current?.click()}>＋ 음악 추가</button>
    </aside>

    <main>
      <header>
        <div><small>YOUR SOUND, YOUR SPACE</small><h1>{favoritesOnly ? '좋아하는 음악' : '내 플레이리스트'}</h1></div>
        <input className="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="곡 또는 아티스트 검색" />
      </header>

      <section className="hero" onClick={() => input.current?.click()}>
        <div><b>MYMUSIC</b><h2>원하는 음악을<br />바로 재생하세요.</h2><p>MP3 · M4A · WAV 파일을 추가하면 브라우저에 저장됩니다.</p><button>내 음악 추가</button></div>
        <div className="record">♪</div>
      </section>

      <section className="moodSection">
        <div className="sectionTitle"><div><small>MOOD RECOMMENDATION</small><h3>지금 기분이 어때요?</h3></div><span>기분에 맞는 음악을 골라드려요</span></div>
        <div className="moodButtons">
          {moodOptions.map((item) => <button key={item.id} className={selectedMood === item.id ? 'selected' : ''} onClick={() => setSelectedMood(item.id)}><span>{item.emoji}</span><b>{item.label}</b><small>{item.description}</small></button>)}
        </div>
        <div className="moodMix">
          <div className="moodSummary"><span className="moodEmoji">{mood.emoji}</span><div><small>FOR YOUR MOOD</small><h4>{mood.label}한 지금, 이런 음악 어때요?</h4><p>{moodRecommendations.length ? `${moodRecommendations.length}곡을 추천합니다.` : '아직 이 기분으로 분류된 곡이 없습니다.'}</p></div><button onClick={playMood}>▶ 이 기분으로 재생</button></div>
          <div className="recommendations">
            {moodRecommendations.slice(0, 4).map((track) => <button key={track.id} className={track.id === current?.id ? 'playing' : ''} onClick={() => select(track)}><span className="cover">♪</span><span><b>{track.title}</b><small>{track.artist}</small></span></button>)}
            {!moodRecommendations.length && <div className="moodEmpty">아래 곡 목록의 기분 버튼을 눌러 곡을 분류해 보세요.</div>}
          </div>
        </div>
      </section>

      <section className="library">
        <div className="sectionTitle"><h3>Library</h3><span>{shown.length} tracks</span></div>
        <div className="head"><span>#</span><span>곡</span><span>앨범</span><span>시간</span><span /></div>
        {shown.map((track, index) => {
          const trackMood = moodOptions.find((item) => item.id === (trackMoods[track.id] ?? [])[0])
          return <div className={`row ${track.id === current?.id ? 'selected' : ''}`} key={track.id}>
            <button className="index" onClick={() => select(track)}>{track.id === current?.id && playing ? '▮▮' : index + 1}</button>
            <button className="song" onClick={() => select(track)}><span className="cover">♪</span><span><b>{track.title}</b><small>{track.artist}{trackMood ? ` · ${trackMood.emoji} ${trackMood.label}` : ''}</small></span></button>
            <span className="album">{track.album}</span>
            <span>{track.duration ? time(track.duration) : '—'}</span>
            <span className="actions"><button className="moodTag" title="기분 태그 변경" onClick={() => cycleTrackMood(track)}>{trackMood?.emoji ?? '＋🙂'}</button><button onClick={() => toggleFavorite(track.id)}>{favorites.includes(track.id) ? '♥' : '♡'}</button>{track.source === 'local' && <button onClick={() => void remove(track)}>×</button>}</span>
          </div>
        })}
        {!shown.length && <div className="empty">표시할 음악이 없습니다.</div>}
      </section>
    </main>

    {current && <footer>
      <div className="now"><span className="cover big">♪</span><span><b>{current.title}</b><small>{current.artist}</small></span></div>
      <div className="center"><div className="controls"><button className={shuffle ? 'on' : ''} onClick={() => setShuffle((v) => !v)}>⤨</button><button onClick={prev}>◀</button><button className="play" onClick={togglePlay}>{playing ? 'Ⅱ' : '▶'}</button><button onClick={next}>▶</button><button className={repeat !== 'off' ? 'on' : ''} onClick={cycleRepeat}>{repeat === 'one' ? '↻1' : '↻'}</button></div><div className="progress"><span>{time(position)}</span><input type="range" min="0" max={Math.max(duration, 1)} step="0.1" value={Math.min(position, Math.max(duration, 1))} onChange={(e) => { const n = Number(e.target.value); if (audio.current) audio.current.currentTime = n; setPosition(n) }} /><span>{time(duration)}</span></div></div>
      <div className="volume">🔊 <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(Number(e.target.value))} /></div>
    </footer>}

    <input ref={input} hidden type="file" accept="audio/*,.mp3,.m4a,.wav,.ogg,.flac" multiple onChange={onFiles} />
    {notice && <div className="notice">{notice}</div>}
  </div>
}

export default App
