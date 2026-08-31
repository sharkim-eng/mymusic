(() => {
  // Playback priority:
  // 1) verified YouTube Music audio / Topic ID
  // 2) verified music-video ID
  // 3) YouTube Music search
  // Key format: normalized title|||normalized artist

  // Auto-generated IDs are only trusted from resolver version 2+.
  // Version 1 was intentionally disabled after tightening artist validation.
  if (!window.SHARK_AUTO_ID_STATS || Number(window.SHARK_AUTO_ID_STATS.version || 0) < 2) {
    window.SHARK_AUDIO_IDS = {};
    window.SHARK_VIDEO_IDS = {};
  }

  window.SHARK_AUDIO_IDS = Object.assign(window.SHARK_AUDIO_IDS || {}, {
    // Only put IDs here after confirming the link opens the album/audio track
    // rather than a music video. Manual entries override generated entries.
  });

  window.SHARK_VIDEO_IDS = Object.assign(window.SHARK_VIDEO_IDS || {}, {
    'no one noticed|||the marías': 'Qn8F_u0vBNI',
    "i don't know you|||the marías": 'YzKM5g_FwYU',
    'hush|||the marías': 'jFy03i_LRO8',
    'only in my dreams|||the marías': 'qrqywuDWz_Q',
    'tailwhip|||men i trust': '9IZKcb3LndA',
    'myth|||beach house': 'FuvWc3ToDHg',
    'chamber of reflection|||mac demarco': 'kz9jhG963no',
    'my kind of woman|||mac demarco': 'wIuBcb2T55Q',
    'crystalised|||the xx': 'Pib8eYDSFEI',
    'bath|||offonoff': 'uCg-i8GEovI',
    'espresso|||sabrina carpenter': 'eVli-tstM5E',
    '24k magic|||bruno mars': 'UqyT8IEBkvY',
    'i am|||ive': '6ZUIwj3FgUY',
    'heya|||ive': '07EzMbVH3QE',
    'fancy|||twice': 'kOHB85vDuow',
    'boy with luv|||bts': 'XsX3ATc3FbA',
    'levitating|||dua lipa': 'TUVcZfQe-Kw',
    'super shy|||newjeans': 'ArmDp-zijuc',
    'as it was|||harry styles': 'H5v3kku4y6Q',
    'all of me|||john legend': '450p7goxZqg',
    'a thousand years|||christina perri': 'rtOvBOTyX00',
    'from the start|||laufey': 'lSD_L-xic9o',
    'sofia|||clairo': 'L9l8zCOwEII',
    'apocalypse|||cigarettes after sex': 'sElE_BfQ67s',
    'k.|||cigarettes after sex': 'L4sbDxR22z4'
  });

  // Backward compatibility for older code / stored entries.
  window.SHARK_DIRECT_IDS = window.SHARK_VIDEO_IDS;
})();
