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
})();
