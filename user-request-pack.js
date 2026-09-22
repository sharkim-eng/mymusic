(() => {
  const song = (title, artist, videoId = '') => ({ title, artist, videoId });

  function add(mood, genre, songs) {
    if (typeof musicData === 'undefined' || !musicData[mood] || !Array.isArray(musicData[mood][genre])) return;
    const target = musicData[mood][genre];
    const existing = new Set(target.map(s => `${String(s.title || '').trim().toLowerCase()}|||${String(s.artist || '').trim().toLowerCase()}`));
    songs.forEach(([title, artist, videoId = '']) => {
      const k = `${title.trim().toLowerCase()}|||${artist.trim().toLowerCase()}`;
      if (!existing.has(k)) {
        target.push(song(title, artist, videoId));
        existing.add(k);
      }
    });
  }

  const CLOUD = '구름';
  const CLAZZIQUAI = '클래지콰이(Clazziquai)';
  const NELL = 'NELL';
  const BIBI = 'BIBI';
  const ALEPH = 'ALEPH';
  const KARINA = 'Karina';
  const SEORI = 'Seori';
  const JOHN_LEGEND = 'John Legend';
  const ROSE = 'ROSÉ';
  const JENNIE = 'JENNIE';
  const SORN = 'SORN';
  const YOO_JAE_HA = '유재하';

  add('행복', 'INDIE', [
    ['춤', CLAZZIQUAI]
  ]);
  add('행복', 'KPOP', [
    ['BUMPA', BIBI]
  ]);

  add('사랑', 'INDIE', [
    ['After Love', CLAZZIQUAI]
  ]);
  add('사랑', 'POP', [
    ['Slow Motion', KARINA],
    ["P.D.A. (We Just Don't Care)", JOHN_LEGEND],
    ['drinks or coffee', ROSE],
    ['Cool Waters', SORN]
  ]);

  add('슬픔', 'INDIE', [
    ['Good Night', NELL],
    ['다시 사랑하지 않을 다짐', ALEPH],
    ['내 마음에 비친 내 모습', YOO_JAE_HA]
  ]);
  add('슬픔', 'KPOP', [
    ['BAD SAD AND MAD', BIBI],
    ['PADO', BIBI]
  ]);

  add('피곤', 'INDIE', [
    ['Prologue', CLOUD],
    ['NOTE AND PENCIL', SEORI]
  ]);
  add('피곤', 'POP', [
    ['Slow Motion', KARINA],
    ['Cool Waters', SORN]
  ]);

  add('위로', 'INDIE', [
    ['Prologue', CLOUD],
    ['Good Night', NELL],
    ['다시 사랑하지 않을 다짐', ALEPH],
    ['NOTE AND PENCIL', SEORI],
    ['내 마음에 비친 내 모습', YOO_JAE_HA]
  ]);

  add('신남', 'INDIE', [
    ['춤', CLAZZIQUAI]
  ]);
  add('신남', 'KPOP', [
    ['BUMPA', BIBI],
    ['ZEN', JENNIE]
  ]);

  add('SHARK', 'INDIE', [
    ['Prologue', CLOUD],
    ['After Love', CLAZZIQUAI],
    ['Good Night', NELL],
    ['다시 사랑하지 않을 다짐', ALEPH],
    ['NOTE AND PENCIL', SEORI],
    ['내 마음에 비친 내 모습', YOO_JAE_HA]
  ]);
  add('SHARK', 'KPOP', [
    ['PADO', BIBI],
    ['BAD SAD AND MAD', BIBI],
    ['ZEN', JENNIE]
  ]);
  add('SHARK', 'POP', [
    ['Slow Motion', KARINA],
    ["P.D.A. (We Just Don't Care)", JOHN_LEGEND],
    ['drinks or coffee', ROSE],
    ['Cool Waters', SORN]
  ]);

  // 2026-09-22: expanded SHARK night-drive recommendations.
  add('SHARK', 'POP', [
    ['Hard to Say', 'GRAACE feat. I.E.'],
    ['Evergreen (You Didn’t Deserve Me at All)', 'Omar Apollo'],
    ['Ugotme', 'Omar Apollo'],
    ['Snooze', 'SZA'],
    ['Good Days', 'SZA'],
    ['I Want You Around', 'Snoh Aalegra'],
    ['DO 4 LOVE', 'Snoh Aalegra'],
    ['Clouded', 'Brent Faiyaz'],
    ['Trust', 'Brent Faiyaz'],
    ['Like I Want You', 'Giveon'],
    ['Heartbreak Anniversary', 'Giveon'],
    ['Easy', 'Mac Ayres'],
    ['Slow Down', 'Mac Ayres'],
    ['Unravel Me', 'Sabrina Claudio'],
    ['Belong to You', 'Sabrina Claudio'],
    ['Fantasy', 'Alina Baraz & Galimatias'],
    ['Can I', 'Alina Baraz & Galimatias'],
    ['Remember Me', 'UMI'],
    ['Honey', 'Raveena'],
    ['Sure Thing', 'Miguel'],
    ['Adorn', 'Miguel'],
    ['Coffee', 'Miguel'],
    ['Come Through and Chill', 'Miguel feat. J. Cole'],
    ['3 Nights', 'Dominic Fike'],
    ['Phone Numbers', 'Dominic Fike'],
    ['Kingston', 'Faye Webster'],
    ['In a Good Way', 'Faye Webster'],
    ['I Know You', 'Faye Webster'],
    ['A Dream with a Baseball Player', 'Faye Webster']
  ]);

  add('SHARK', 'INDIE', [
    ['Locket', 'Crumb'],
    ['Ghostride', 'Crumb'],
    ['Bones', 'Crumb'],
    ['Homage', 'Mild High Club'],
    ['Windowpane', 'Mild High Club'],
    ['Shut up My Moms Calling', 'Hotel Ugly'],
    ['Young', 'Vacations'],
    ['Telephones', 'Vacations'],
    ['What Once Was', "Her's"],
    ['Harvey', "Her's"],
    ['Metamodernity', 'Vansire'],
    ['Nice to See You', 'Vansire'],
    ['Mrs Magic', 'Strawberry Guy'],
    ['F Song', 'Strawberry Guy'],
    ["Lovers' Carvings", 'Bibio'],
    ['Ambivalence Avenue', 'Bibio'],
    ['Fade Into You', 'Mazzy Star'],
    ['Heaven or Las Vegas', 'Cocteau Twins'],
    ['Cherry-coloured Funk', 'Cocteau Twins'],
    ['Saw You in a Dream', 'The Japanese House'],
    ["Maybe You're the Reason", 'The Japanese House'],
    ['Cool Blue', 'The Japanese House'],
    ['Open', 'Rhye'],
    ['The Fall', 'Rhye'],
    ['Song for You', 'Rhye'],
    ['Moon Undah Water', 'Puma Blue'],
    ['Want Me', 'Puma Blue'],
    ['Losing You', 'Puma Blue'],
    ['Road Head', 'Japanese Breakfast'],
    ['Boyish', 'Japanese Breakfast'],
    ['Under Your Spell', 'Desire'],
    ['Night Drive', 'Chromatics'],
    ['Cherry', 'Chromatics'],
    ['Shadow', 'Chromatics']
  ]);

  add('SHARK', 'KPOP', [
    ['Bonnie & Clyde', 'DEAN'],
    ['What 2 Do', 'DEAN feat. Crush & Jeff Bernat'],
    ['21', 'DEAN'],
    ['Pour Up', 'DEAN feat. ZICO'],
    ['Jasmine', 'DPR LIVE'],
    ['Martini Blue', 'DPR LIVE'],
    ['Text Me', 'DPR LIVE'],
    ['Jam & Butterfly', 'DPR LIVE feat. Crush & eaJ'],
    ['Bambi', 'BAEKHYUN'],
    ['Amusement Park', 'BAEKHYUN'],
    ['Cry For Love', 'BAEKHYUN'],
    ['Underwater', 'Red Velvet'],
    ['Kingdom Come', 'Red Velvet'],
    ['Automatic', 'Red Velvet'],
    ['Lucid Dream', 'aespa'],
    ['Thirsty', 'aespa'],
    ['Impurities', 'LE SSERAFIM'],
    ['Anywhere But Home', 'SEULGI'],
    ['Sugarcoat (NATTY Solo)', 'KISS OF LIFE'],
    ['Nothing', 'KISS OF LIFE'],
    ['Nobody Knows', 'KISS OF LIFE'],
    ['The Weekend', 'BIBI'],
    ['Animal Farm', 'BIBI'],
    ['JOTTO', 'BIBI']
  ]);

})();
