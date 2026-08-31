(() => {
  const makeSong = (title, artist) => ({ title, artist, videoId: '' });

  function add(mood, genre, songs) {
    if (typeof musicData === 'undefined' || !musicData[mood] || !Array.isArray(musicData[mood][genre])) return;
    const target = musicData[mood][genre];
    const existing = new Set(target.map(song => `${String(song.title || '').trim().toLowerCase()}|||${String(song.artist || '').trim().toLowerCase()}`));

    songs.forEach(([title, artist]) => {
      const key = `${title.trim().toLowerCase()}|||${artist.trim().toLowerCase()}`;
      if (!existing.has(key)) {
        target.unshift(makeSong(title, artist));
        existing.add(key);
      }
    });
  }

  // 2025-2026 K-POP additions
  add('행복', 'KPOP', [
    ['BANG BANG', 'IVE'],
    ['LEMONADE', 'aespa'],
    ['CHOOM', 'BABYMONSTER'],
    ['2 L0VE', 'STAYC'],
    ['Joy, Sorrow, A Beautiful Heart', 'AKMU'],
    ['ATTITUDE', 'IVE'],
    ['REBEL HEART', 'IVE']
  ]);

  add('사랑', 'KPOP', [
    ['Landing in Love', 'HANRORO'],
    ['My whole world', 'Car, the garden'],
    ['Good Goodbye', 'Hwasa'],
    ['2 L0VE', 'STAYC'],
    ['REBEL HEART', 'IVE']
  ]);

  add('화남', 'KPOP', [
    ['BAD', 'ATEEZ'],
    ['JUMP', 'BLACKPINK'],
    ['ICONIC BY MISTAKE', 'LE SSERAFIM, ILLIT & KATSEYE'],
    ['CHOOM', 'BABYMONSTER'],
    ['LEMONADE', 'aespa']
  ]);

  add('신남', 'KPOP', [
    ['SWIM', 'BTS'],
    ['NORMAL', 'BTS'],
    ['BANG BANG', 'IVE'],
    ['JUMP', 'BLACKPINK'],
    ['CHOOM', 'BABYMONSTER'],
    ['BAD', 'ATEEZ'],
    ['LEMONADE', 'aespa'],
    ['ATTITUDE', 'IVE'],
    ['Golden', 'HUNTR/X']
  ]);

  add('위로', 'KPOP', [
    ['Joy, Sorrow, A Beautiful Heart', 'AKMU'],
    ['When I stop thinking', 'Choi Yu Ree'],
    ['My whole world', 'Car, the garden']
  ]);

  // 2025-2026 POP additions
  add('행복', 'POP', [
    ['Ordinary', 'Alex Warren'],
    ['Manchild', 'Sabrina Carpenter'],
    ['Daisies', 'Justin Bieber'],
    ['I Just Might', 'Bruno Mars'],
    ['Aperture', 'Harry Styles']
  ]);

  add('사랑', 'POP', [
    ['Ordinary', 'Alex Warren'],
    ['Opalite', 'Taylor Swift'],
    ['I Just Might', 'Bruno Mars'],
    ['The Fate of Ophelia', 'Taylor Swift']
  ]);

  add('슬픔', 'POP', [
    ['Back To Friends', 'sombr'],
    ['Drop Dead', 'Olivia Rodrigo'],
    ['Tears', 'Sabrina Carpenter'],
    ['Wake Me Up', 'The Weeknd & Justice']
  ]);

  add('신남', 'POP', [
    ['Manchild', 'Sabrina Carpenter'],
    ['Abracadabra', 'Lady Gaga'],
    ['Wake Me Up', 'The Weeknd & Justice'],
    ['I Just Might', 'Bruno Mars'],
    ['Aperture', 'Harry Styles'],
    ['Daisies', 'Justin Bieber']
  ]);

  // SHARK: ocean / night / drive-focused curation
  add('SHARK', 'INDIE', [
    // wave to earth — includes 2026 material
    ["talking 'bout u", 'wave to earth'],
    ['heaven and hell', 'wave to earth'],
    ['sing it all again', 'wave to earth'],
    ['babo', 'wave to earth'],
    ['homesick', 'wave to earth'],
    ['light', 'wave to earth'],
    ['beck.', 'wave to earth'],

    // The Marías — 2025/2026 + core night-drive tracks
    ['Back To Me', 'The Marías'],
    ['Nobody New', 'The Marías'],
    ['All I Did Was Dream of You', 'beabadoobee feat. The Marías'],
    ['Hush', 'The Marías'],
    ['Heavy', 'The Marías'],
    ['Sienna', 'The Marías'],
    ['Ruthless', 'The Marías'],

    // DPR IAN
    ['The Show', 'DPR IAN'],
    ['Mood', 'DPR IAN'],
    ["Don't Go Insane", 'DPR IAN'],
    ['Ballroom Extravaganza', 'DPR IAN'],
    ['Avalon', 'DPR IAN'],
    ['Scaredy Cat', 'DPR IAN'],
    ['Merry Go', 'DPR IAN'],
    ['Dope Lovers', 'DPR IAN'],

    // DEAN
    ['DIE 4 YOU', 'DEAN'],
    ["Howlin' 404", 'DEAN'],
    ['What 2 Do', 'DEAN'],
    ['Bonnie & Clyde', 'DEAN'],
    ['dayfly', 'DEAN feat. Sulli & Rad Museum'],

    // Yerin Baek
    ["Maybe It's Not Our Fault", 'Yerin Baek'],
    ['Bye bye my blue', 'Yerin Baek'],
    ['0310', 'Yerin Baek'],
    ['Rest', 'Yerin Baek'],
    ['Across the universe', 'Yerin Baek'],

    // Cigarettes After Sex — includes 2026 Twizzler
    ['Twizzler', 'Cigarettes After Sex'],
    ['K.', 'Cigarettes After Sex'],
    ['Sweet', 'Cigarettes After Sex'],
    ['Touch', 'Cigarettes After Sex'],
    ['John Wayne', 'Cigarettes After Sex'],
    ['Each Time You Fall in Love', 'Cigarettes After Sex'],

    // Beach House
    ['Silver Soul', 'Beach House'],
    ['Take Care', 'Beach House'],
    ['PPP', 'Beach House'],
    ['Lazuli', 'Beach House'],
    ['Zebra', 'Beach House'],

    // additional ocean / midnight drive picks
    ['Sailor Song', 'Gigi Perez'],
    ['Beaches', 'beabadoobee'],
    ['My House Is Not A Home', 'd4vd'],
    ['Sunkissed', 'khai dreams'],
    ['Moonlight', 'Kali Uchis'],
    ['Dark Red', 'Steve Lacy'],
    ['505', 'Arctic Monkeys'],
    ['Sweet Disposition', 'The Temper Trap'],
    ['Undercover Martyn', 'Two Door Cinema Club'],
    ['Chamber of Reflection', 'Mac DeMarco']
  ]);

  add('SHARK', 'POP', [
    ['Back To Friends', 'sombr'],
    ['Ordinary', 'Alex Warren'],
    ['Wake Me Up', 'The Weeknd & Justice'],
    ['Daisies', 'Justin Bieber'],
    ['Aperture', 'Harry Styles'],
    ['Moonlight', 'Kali Uchis'],
    ['End of Beginning', 'Djo'],
    ['Birds of a Feather', 'Billie Eilish'],
    ['CHIHIRO', 'Billie Eilish'],
    ['Blue', 'Billie Eilish']
  ]);

  add('SHARK', 'KPOP', [
    ['SWIM', 'BTS'],
    ['BANG BANG', 'IVE'],
    ['Landing in Love', 'HANRORO'],
    ['My whole world', 'Car, the garden'],
    ['Good Goodbye', 'Hwasa'],
    ['Virtual Angel', 'ARTMS'],
    ['Ghosting', 'TXT'],
    ['Night Drive', 'Red Velvet']
  ]);
})();
