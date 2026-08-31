(() => {
  const tracks = new Map([
    ['butter|||bts', 'WMweEpGlu_U'],
    ['permission to dance|||bts', 'CuklIb9d3fI'],
    ['dynamite|||bts', 'gdZLi9oWNZg'],
    ['sunday morning|||maroon 5', 'S2Cti12XBw4'],
    ['sugar|||maroon 5', '09R8_2nJtjg'],
    ['dandelion|||oohyo', 'Kaq4LFM47I0'],
    ['comes and goes|||hyukoh', 'ECMc1SB60E0'],
    ['love wins all|||iu', 'JleoAppaxi0'],
    ['밤편지|||iu', 'BzYnNdJhZQw'],
    ['through the night|||iu', 'BzYnNdJhZQw'],
    ['love poem|||iu', 'iOKRYIMhaDk'],
    ['attention|||newjeans', 'js1CtxSY38I'],
    ['ditto|||newjeans', 'pSUydWEqKwE'],
    ['perfect|||ed sheeran', '2Vv-BfVoq4g'],
    ['thinking out loud|||ed sheeran', 'lp-EO5I60KA'],
    ['bad|||wave to earth', '6Q5xqNkCk7w'],
    ['seasons|||wave to earth', 'CnVVjLOGVoY'],
    ['beautiful goodbye|||chen', 'JrOrlhjIYVk'],
    ['untitled, 2014|||g-dragon', 'Nged3LwJsvQ'],
    ['let her go|||passenger', 'RBumgq5yVrA'],
    ['drivers license|||olivia rodrigo', 'ZmDBbnmKpqQ'],
    ['기억을 걷는 시간|||nell', 'K72ZxP9ZAP4'],
    ['space song|||beach house', 'RBtlPT23PTM'],
    ["god's menu|||stray kids", 'TQTlCHxyuu8'],
    ['maniac|||stray kids', 'OvioeS1ZZ7o'],
    ['believer|||imagine dragons', '7wtfhZwyrcc'],
    ['natural|||imagine dragons', '0I647GU3Jsc'],
    ['do i wanna know?|||arctic monkeys', 'bpOSxM0rNPM'],
    ['seven nation army|||the white stripes', '0J2QdDbelmY'],
    ['golden hour|||jvke', 'PEM0Vs8jf1w'],
    ['comethru|||jeremy zucker', 'jO2viLEW-1A'],
    ['instagram|||dean', 'wKyMIrBClYw'],
    ['d (half moon)|||dean', 'eelfrHtmk68'],
    ['fix you|||coldplay', 'k4V3Mo61fJM'],
    ['yellow|||coldplay', 'yKNxeF4KMsY'],
    ['for lovers who hesitate|||jannabi', 'GpQ222I1ULc'],
    ['apt.|||rosé & bruno mars', 'ekr2nIex040'],
    ['uptown funk|||mark ronson feat. bruno mars', 'OPf0YbXqDm0'],
    ["don't start now|||dua lipa", 'oygrmJFKYZY'],
    ['phonecert|||10cm', 'mOo8bVzN9M8'],
    ['wave|||ateez', 'FIInyEWWW-s'],
    ['ocean view|||rothy', '5wiW60inhgw'],
    ['ocean eyes|||billie eilish', 'viimfQi_pUw'],
    ['ocean|||martin garrix feat. khalid', 'BDocp-VpCwY']
  ])

  const normalize = (value) => String(value || '').trim().toLowerCase()
  const keyOf = (title, artist) => `${normalize(title)}|||${normalize(artist)}`

  function songFromElement(element) {
    const card = element.closest('.music-card, .music-item')
    if (!card) return null
    const title = card.querySelector('.music-info h2')?.textContent?.trim() || ''
    const artist = card.querySelector('.music-info p')?.textContent?.trim() || ''
    if (!title || !artist) return null
    return { title, artist }
  }

  function openYouTubeMusic(song) {
    const videoId = tracks.get(keyOf(song.title, song.artist))
    const url = videoId
      ? `https://music.youtube.com/watch?v=${encodeURIComponent(videoId)}`
      : `https://music.youtube.com/search?q=${encodeURIComponent(`${song.title} ${song.artist}`)}`
    window.location.assign(url)
  }

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null
    if (!target) return

    const playTarget = target.closest('.music-button, .play-button')
    const cardTarget = target.closest('.music-card')
    const playAll = target.closest('.play-all-button')

    if (playTarget || cardTarget) {
      const song = songFromElement(playTarget || cardTarget)
      if (!song) return
      event.preventDefault()
      event.stopPropagation()
      event.stopImmediatePropagation()
      openYouTubeMusic(song)
      return
    }

    if (playAll) {
      const firstSong = songFromElement(document.querySelector('.music-item') || playAll)
      if (!firstSong) return
      event.preventDefault()
      event.stopPropagation()
      event.stopImmediatePropagation()
      openYouTubeMusic(firstSong)
    }
  }, true)

  function refreshLabels() {
    document.querySelectorAll('.music-button, .play-button').forEach((button) => {
      button.textContent = '♫ YouTube Music에서 재생'
    })
    const playAll = document.querySelector('.play-all-button')
    if (playAll) playAll.textContent = '♫ YouTube Music에서 첫 곡 듣기'
  }

  const style = document.createElement('style')
  style.textContent = '.inapp-player{display:none!important}'
  document.head.appendChild(style)

  const observer = new MutationObserver(refreshLabels)
  observer.observe(document.documentElement, { childList: true, subtree: true })
  document.addEventListener('DOMContentLoaded', refreshLabels)
  refreshLabels()
})()
