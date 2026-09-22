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
    ['Hard to Say', 'Karencici'],
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


  // 2026-09-22: broad expansion across every mood, not only SHARK.
  add('행복', 'KPOP', [
    ['SMILEY', 'YENA feat. BIBI'],
    ['POP!', 'NAYEON'],
    ['Blue Hour', 'TXT'],
    ['_WORLD', 'SEVENTEEN'],
    ['Hello', 'JOY'],
    ['Rollin\'', 'Brave Girls']
  ]);
  add('행복', 'POP', [
    ['Beautiful Day', 'U2'],
    ['Best Day of My Life', 'American Authors'],
    ['I Ain\'t Worried', 'OneRepublic'],
    ['Island in the Sun', 'Weezer'],
    ['Lovely Day', 'Bill Withers'],
    ['Walking on a Dream', 'Empire of the Sun']
  ]);
  add('행복', 'INDIE', [
    ['Sunflower', 'Rex Orange County'],
    ['Loving Is Easy', 'Rex Orange County feat. Benny Sings'],
    ['Are You Bored Yet?', 'Wallows feat. Clairo'],
    ['Everytime', 'boy pablo'],
    ['Dance, Baby!', 'boy pablo'],
    ['Kilby Girl', 'The Backseat Lovers']
  ]);

  add('사랑', 'KPOP', [
    ['Love Maze', 'BTS'],
    ['Dream', 'Suzy & BAEKHYUN'],
    ['Perhaps Love', 'HowL & J'],
    ['Everytime', 'CHEN & Punch'],
    ['Love Belt', 'JONGHYUN feat. Younha'],
    ['Love Me Like That', 'Sam Kim']
  ]);
  add('사랑', 'POP', [
    ['Like I\'m Gonna Lose You', 'Meghan Trainor feat. John Legend'],
    ['Kiss Me More', 'Doja Cat feat. SZA'],
    ['L-O-V-E', 'Nat King Cole'],
    ['Can\'t Take My Eyes Off You', 'Frankie Valli'],
    ['Lovin\' You', 'Minnie Riperton'],
    ['I Choose You', 'Sara Bareilles']
  ]);
  add('사랑', 'INDIE', [
    ['We Fell in Love in October', 'girl in red'],
    ['Sea of Love', 'Cat Power'],
    ['First Day of My Life', 'Bright Eyes'],
    ['Fade Into You', 'Mazzy Star'],
    ['Home', 'Edward Sharpe & The Magnetic Zeros'],
    ['Nothing', 'Bruno Major']
  ]);

  add('슬픔', 'KPOP', [
    ['Still Love You', 'LEE HONG GI & Yoo Hwe Seung'],
    ['Ending Scene', 'IU'],
    ['Only Then', 'Roy Kim'],
    ['Wild Flower', 'Park Hyo Shin'],
    ['Goodbye', '2NE1'],
    ['I Miss You', 'SOYOU']
  ]);
  add('슬픔', 'POP', [
    ['All I Ask', 'Adele'],
    ['ceilings', 'Lizzy McAlpine'],
    ['Lose You to Love Me', 'Selena Gomez'],
    ['What Was I Made For?', 'Billie Eilish'],
    ['the 1', 'Taylor Swift'],
    ['Happier', 'Ed Sheeran']
  ]);
  add('슬픔', 'INDIE', [
    ['About Today', 'The National'],
    ['I Need My Girl', 'The National'],
    ['Rivers and Roads', 'The Head and the Heart'],
    ['The Bug Collector', 'Haley Heynderickx'],
    ['Between the Bars', 'Elliott Smith'],
    ['Lua', 'Bright Eyes']
  ]);

  add('화남', 'KPOP', [
    ['Monster', 'EXO'],
    ['Obsession', 'EXO'],
    ['Shoot Me', 'DAY6'],
    ['Scream', 'Dreamcatcher'],
    ['BOCA', 'Dreamcatcher'],
    ['Hard Carry', 'GOT7']
  ]);
  add('화남', 'POP', [
    ['abcdefu', 'GAYLE'],
    ['good 4 u', 'Olivia Rodrigo'],
    ['Since U Been Gone', 'Kelly Clarkson'],
    ['So What', 'P!nk'],
    ['I Hate U', 'SZA'],
    ['You Oughta Know', 'Alanis Morissette']
  ]);
  add('화남', 'INDIE', [
    ['Pedestrian at Best', 'Courtney Barnett'],
    ['Seventeen', 'Sharon Van Etten'],
    ['Kyoto', 'Phoebe Bridgers'],
    ['Gimme All Your Love', 'Alabama Shakes'],
    ['Black Sheep', 'Metric'],
    ['Tick Tick Boom', 'The Hives']
  ]);

  add('피곤', 'KPOP', [
    ['Jazz Bar', 'Dreamcatcher'],
    ['247', 'SEVENTEEN'],
    ['Bittersweet', 'WONWOO & MINGYU feat. LEE HI'],
    ['Amusement Park', 'BAEKHYUN'],
    ['Try Again', 'd.ear & Jaehyun'],
    ['365&7', 'pH-1 feat. JAMIE']
  ]);
  add('피곤', 'POP', [
    ['Better', 'Khalid'],
    ['Talk', 'Khalid'],
    ['Damage', 'H.E.R.'],
    ['Focus', 'H.E.R.'],
    ['Coffee', 'Miguel'],
    ['Like I Want You', 'Giveon']
  ]);
  add('피곤', 'INDIE', [
    ['State Lines', 'Novo Amor'],
    ['Keep Me', 'Novo Amor'],
    ['Roslyn', 'Bon Iver & St. Vincent'],
    ['Coffee', 'beabadoobee'],
    ['Featherstone', 'The Paper Kites'],
    ['San Luis', 'Gregory Alan Isakov']
  ]);

  add('위로', 'KPOP', [
    ['Yawn', 'SEVENTEEN'],
    ['To You', 'SEVENTEEN'],
    ['Child', 'MARK'],
    ['Dear DREAM', 'NCT DREAM'],
    ['Turbulence', 'ATEEZ'],
    ['Good Night', 'NELL']
  ]);
  add('위로', 'POP', [
    ['Matilda', 'Harry Styles'],
    ['I Lived', 'OneRepublic'],
    ['You Will Be Found', 'Ben Platt'],
    ['Shake It Out', 'Florence + The Machine'],
    ['Rainbow', 'Kacey Musgraves'],
    ['Keep Your Head Up', 'Ben Howard']
  ]);
  add('위로', 'INDIE', [
    ['Big Black Car', 'Gregory Alan Isakov'],
    ['Ends of the Earth', 'Lord Huron'],
    ['Old Pine', 'Ben Howard'],
    ['Only Love', 'Ben Howard'],
    ['Orange Sky', 'Alexi Murdoch'],
    ['Santa Monica Dream', 'Angus & Julia Stone']
  ]);

  add('신남', 'KPOP', [
    ['Run BTS', 'BTS'],
    ['MAGO', 'GFRIEND'],
    ['After School', 'Weeekly'],
    ['I CAN\'T STOP ME', 'TWICE'],
    ['DASH', 'NMIXX'],
    ['Armageddon', 'aespa']
  ]);
  add('신남', 'POP', [
    ['Rush', 'Troye Sivan'],
    ['Houdini', 'Dua Lipa'],
    ['Training Season', 'Dua Lipa'],
    ['About Damn Time', 'Lizzo'],
    ['Don\'t Go Yet', 'Camila Cabello'],
    ['Break My Soul', 'Beyoncé']
  ]);
  add('신남', 'INDIE', [
    ['Anna Sun', 'WALK THE MOON'],
    ['Electric Love', 'BØRNS'],
    ['Safe and Sound', 'Capital Cities'],
    ['Dreaming', 'Smallpools'],
    ['Greek Tragedy', 'The Wombats'],
    ['Sweet Disposition', 'The Temper Trap']
  ]);

})();
