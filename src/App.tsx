import { type ReactNode, useEffect, useMemo, useState } from 'react'

type Screen = 'home' | 'mood' | 'result' | 'mymusic'
type Mood = '행복' | '사랑' | '슬픔' | '화남' | '피곤' | '위로' | '신남' | 'SHARK'
type Genre = 'ALL' | 'KPOP' | 'POP' | 'INDIE'

type Song = { title: string; artist: string; videoId?: string }
type MusicData = Partial<Record<Mood, { KPOP: Song[]; POP: Song[]; INDIE: Song[] }>>

declare global {
  interface Window {
    musicData?: MusicData
  }
}

const moods: Array<{ id: Mood; emoji: string; description: string; message: string }> = [
  { id: '행복', emoji: '😊', description: '밝고 기분 좋은 순간', message: '기분을 더 밝게 만들어줄 노래를 골라봤어.' },
  { id: '사랑', emoji: '💗', description: '설레고 따뜻한 마음', message: '설레는 마음에 어울리는 노래를 골라봤어.' },
  { id: '슬픔', emoji: '😢', description: '혼자 있고 싶은 밤', message: '조용히 감정에 머물 수 있는 노래를 골라봤어.' },
  { id: '화남', emoji: '😡', description: '답답함을 날리고 싶을 때', message: '답답한 기분을 시원하게 날려줄 노래를 골라봤어.' },
  { id: '피곤', emoji: '😴', description: '힘을 빼고 쉬고 싶은 날', message: '힘을 빼고 편하게 들을 수 있는 노래를 골라봤어.' },
  { id: '위로', emoji: '🥺', description: '조용히 기대고 싶은 순간', message: '오늘 너에게 따뜻하게 닿을 노래를 골라봤어.' },
  { id: '신남', emoji: '🤩', description: '에너지가 필요한 지금', message: '지금 에너지를 더 끌어올릴 노래를 골라봤어.' },
  { id: 'SHARK', emoji: '🦈', description: '바다 · 새벽 · 드라이브', message: '몽환적인 바다와 새벽 드라이브에 어울리는 노래를 골라봤어.' },
]

const genres: Array<{ id: Genre; label: string }> = [
  { id: 'ALL', label: '전체' },
  { id: 'KPOP', label: 'K-POP' },
  { id: 'POP', label: 'POP' },
  { id: 'INDIE', label: 'INDIE' },
]

const directTracks = new Map<string, string>([
  ['butter|||bts', 'WMweEpGlu_U'], ['permission to dance|||bts', 'CuklIb9d3fI'], ['dynamite|||bts', 'gdZLi9oWNZg'],
  ['sunday morning|||maroon 5', 'S2Cti12XBw4'], ['sugar|||maroon 5', '09R8_2nJtjg'],
  ['dandelion|||oohyo', 'Kaq4LFM47I0'], ['comes and goes|||hyukoh', 'ECMc1SB60E0'],
  ['love wins all|||iu', 'JleoAppaxi0'], ['밤편지|||iu', 'BzYnNdJhZQw'], ['through the night|||iu', 'BzYnNdJhZQw'], ['love poem|||iu', 'iOKRYIMhaDk'],
  ['attention|||newjeans', 'js1CtxSY38I'], ['ditto|||newjeans', 'pSUydWEqKwE'],
  ['perfect|||ed sheeran', '2Vv-BfVoq4g'], ['thinking out loud|||ed sheeran', 'lp-EO5I60KA'],
  ['bad|||wave to earth', '6Q5xqNkCk7w'], ['seasons|||wave to earth', 'CnVVjLOGVoY'],
  ['beautiful goodbye|||chen', 'JrOrlhjIYVk'], ['untitled, 2014|||g-dragon', 'Nged3LwJsvQ'],
  ['let her go|||passenger', 'RBumgq5yVrA'], ['drivers license|||olivia rodrigo', 'ZmDBbnmKpqQ'],
  ['기억을 걷는 시간|||nell', 'K72ZxP9ZAP4'], ['space song|||beach house', 'RBtlPT23PTM'],
  ["god's menu|||stray kids", 'TQTlCHxyuu8'], ['maniac|||stray kids', 'OvioeS1ZZ7o'],
  ['believer|||imagine dragons', '7wtfhZwyrcc'], ['natural|||imagine dragons', '0I647GU3Jsc'],
  ['do i wanna know?|||arctic monkeys', 'bpOSxM0rNPM'], ['seven nation army|||the white stripes', '0J2QdDbelmY'],
  ['golden hour|||jvke', 'PEM0Vs8jf1w'], ['comethru|||jeremy zucker', 'jO2viLEW-1A'],
  ['instagram|||dean', 'wKyMIrBClYw'], ['d (half moon)|||dean', 'eelfrHtmk68'],
  ['fix you|||coldplay', 'k4V3Mo61fJM'], ['yellow|||coldplay', 'yKNxeF4KMsY'],
  ['for lovers who hesitate|||jannabi', 'GpQ222I1ULc'],
  ['apt.|||rosé & bruno mars', 'ekr2nIex040'], ['uptown funk|||mark ronson feat. bruno mars', 'OPf0YbXqDm0'], ["don't start now|||dua lipa", 'oygrmJFKYZY'], ['phonecert|||10cm', 'mOo8bVzN9M8'],
  ['wave|||ateez', 'FIInyEWWW-s'], ['ocean view|||rothy', '5wiW60inhgw'], ['ocean eyes|||billie eilish', 'viimfQi_pUw'], ['ocean|||martin garrix feat. khalid', 'BDocp-VpCwY'],
])

const keyOf = (song: Song) => `${song.title.trim().toLowerCase()}|||${song.artist.trim().toLowerCase()}`
const videoIdOf = (song: Song) => song.videoId?.trim() || directTracks.get(keyOf(song)) || ''
const shuffled = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5)

function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [mood, setMood] = useState<Mood | null>(null)
  const [genre, setGenre] = useState<Genre>('ALL')
  const [refreshSeed, setRefreshSeed] = useState(0)
  const [saved, setSaved] = useState<Song[]>(() => {
    try {
      const legacy = JSON.parse(localStorage.getItem('sharkPlaylist') || '[]')
      if (Array.isArray(legacy) && legacy.length) return legacy
      const current = JSON.parse(localStorage.getItem('mymusic-youtube-library') || '[]')
      return Array.isArray(current) ? current.map((x: any) => ({ title: x.title, artist: x.artist, videoId: x.videoId })) : []
    } catch {
      return []
    }
  })
  const [current, setCurrent] = useState<Song | null>(null)

  useEffect(() => localStorage.setItem('sharkPlaylist', JSON.stringify(saved)), [saved])

  const pool = useMemo(() => {
    if (!mood) return []
    const data = window.musicData?.[mood]
    if (!data) return []
    const list = genre === 'ALL' ? [...data.KPOP, ...data.POP, ...data.INDIE] : data[genre]
    return list.filter((song) => Boolean(videoIdOf(song)))
  }, [mood, genre, refreshSeed])

  const recommendations = useMemo(() => shuffled(pool).slice(0, 5), [pool, refreshSeed])

  const isSaved = (song: Song) => saved.some((item) => keyOf(item) === keyOf(song))

  const toggleSaved = (song: Song) => {
    setSaved((items) => {
      const exists = items.some((item) => keyOf(item) === keyOf(song))
      return exists
        ? items.filter((item) => keyOf(item) !== keyOf(song))
        : [...items, { ...song, videoId: videoIdOf(song) }]
    })
  }

  const play = (song: Song) => {
    const videoId = videoIdOf(song)
    if (!videoId) return
    setCurrent({ ...song, videoId })
  }

  const Header = ({ back }: { back?: () => void }) => (
    <header className="topbar">
      {back ? <button className="back" onClick={back} aria-label="뒤로 가기">←</button> : <div className="top-spacer" />}
      <div className="shark-logo">SHARK</div>
      <div className="logo-dot" />
    </header>
  )

  let content: ReactNode

  if (screen === 'home') {
    content = (
      <main className="page home-page">
        <div className="glow" />
        <Header />
        <section className="home-hero">
          <h1><span>지금 기분을</span><span className="accent">노래로 바꿔줄게.</span></h1>
          <p>네가 지금 어떤 기분인지 골라줘.<br />그 순간에 어울리는 음악을 찾아줄게.</p>
        </section>
        <footer className="home-bottom">
          <div className="glass-card">
            <button className="primary-cta" onClick={() => setScreen('mood')}>
              <span>내 기분으로 음악 찾기</span><span className="arrow">→</span>
            </button>
          </div>
          <div className="bottom-note">YOUR MOOD · YOUR MUSIC</div>
        </footer>
      </main>
    )
  } else if (screen === 'mood') {
    content = (
      <main className="page mood-page">
        <Header back={() => setScreen('home')} />
        <section className="intro"><h1>지금 기분은<br /><span>어떤 쪽이야?</span></h1><p>가장 가까운 감정 하나만 골라줘.</p></section>
        <div className="mood-grid">
          {moods.map((item) => (
            <button key={item.id} className={`mood-button ${mood === item.id ? 'selected' : ''}`} onClick={() => setMood(item.id)}>
              <span className="emoji">{item.emoji}</span>
              <span className="mood-copy"><span className="mood-name">{item.id}</span><span className="mood-description">{item.description}</span></span>
            </button>
          ))}
        </div>
        <div className="recommend-wrap">
          <button className={`recommend-button ${mood ? 'visible' : ''}`} onClick={() => mood && setScreen('result')}>
            <span>이 기분으로 음악 찾기</span><span className="arrow">→</span>
          </button>
        </div>
      </main>
    )
  } else if (screen === 'mymusic') {
    content = (
      <main className="page playlist-page">
        <Header back={() => setScreen(mood ? 'result' : 'mood')} />
        <section className="playlist-head"><h1>MY MUSIC</h1><p>내가 좋아하는 노래만 모아봤어.</p></section>
        {saved.length > 0 && <button className="play-all-button" onClick={() => play(saved[0])}>▶ 첫 곡부터 듣기</button>}
        {current && <div className="now-playing">▶ {current.title} — {current.artist}</div>}
        <div className="music-list">
          {saved.map((song) => (
            <article key={keyOf(song)} className={`music-item ${current && keyOf(current) === keyOf(song) ? 'selected' : ''}`}>
              <div className="music-info"><h2>{song.title}</h2><p>{song.artist}</p></div>
              <div className="music-actions">
                <button className="play-button" onClick={() => play(song)}>▶ 바로 재생</button>
                <button className="remove-button" onClick={() => toggleSaved(song)}>♥</button>
              </div>
            </article>
          ))}
        </div>
        {!saved.length && <div className="empty-message"><span className="empty-heart">♡</span>아직 저장한 노래가 없어.<br />마음에 드는 노래에<br />♥를 눌러 저장해봐.</div>}
        <button className="text-button" onClick={() => setScreen('mood')}>다시 기분 고르기</button>
      </main>
    )
  } else {
    const selectedMood = moods.find((item) => item.id === mood) || moods[0]
    content = (
      <main className="page result-page">
        <Header back={() => setScreen('mood')} />
        <section className="result-head">
          <h1>오늘은 이런 노래 어때?</h1>
          <div className="mood-summary"><div className="selected-mood-wrap"><span>{selectedMood.emoji}</span></div><p>{selectedMood.message}</p></div>
        </section>
        <section className="genre-section">
          <div className="genre-row">
            {genres.map((item) => <button key={item.id} className={`genre-button ${genre === item.id ? 'active' : ''}`} onClick={() => setGenre(item.id)}>{item.label}</button>)}
          </div>
        </section>
        <div className="music-list">
          {recommendations.map((song, index) => (
            <article key={`${keyOf(song)}-${index}`} className="music-card" onClick={() => play(song)}>
              <div className="music-top"><div className="music-number">{String(index + 1).padStart(2, '0')}</div><div className="music-info"><h2>{song.title}</h2><p>{song.artist}</p></div></div>
              <div className="button-row">
                <button className="music-button" onClick={(event) => { event.stopPropagation(); play(song) }}>▶ 바로 재생</button>
                <button className={`heart-button ${isSaved(song) ? 'saved' : ''}`} onClick={(event) => { event.stopPropagation(); toggleSaved(song) }}>{isSaved(song) ? '♥' : '♡'}</button>
              </div>
            </article>
          ))}
        </div>
        {!recommendations.length && <div className="empty-message">현재 바로 재생 링크가 확인된 곡이 없어.</div>}
        <button className="action-button random-button" onClick={() => setRefreshSeed((value) => value + 1)}>다른 노래 추천</button>
        <button className="action-button playlist-button" onClick={() => setScreen('mymusic')}>MY MUSIC</button>
        <button className="text-button" onClick={() => setScreen('mood')}>다시 고르기</button>
      </main>
    )
  }

  return (
    <>
      {content}
      <Player current={current} />
    </>
  )
}

function Player({ current }: { current: Song | null }) {
  const videoId = current ? videoIdOf(current) : ''
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?autoplay=1&playsinline=1&controls=1&rel=0&modestbranding=1`
    : ''
  const musicUrl = videoId ? `https://music.youtube.com/watch?v=${encodeURIComponent(videoId)}` : ''

  return (
    <div className={`inapp-player ${current ? 'visible' : ''}`}>
      <div className="video-frame">
        {videoId && (
          <iframe
            key={videoId}
            src={embedUrl}
            title={current ? `${current.title} - ${current.artist}` : 'YouTube player'}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}
      </div>
      {current && (
        <div className="player-meta">
          <span><b>{current.title}</b><small>{current.artist}</small><small className="player-hint">자동재생이 막히면 영상의 ▶를 눌러주세요.</small></span>
          {musicUrl && <a className="fallback-link" href={musicUrl} target="_blank" rel="noreferrer">YT Music</a>}
        </div>
      )}
    </div>
  )
}

export default App
