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

  const GRIZZLY = '그리즐리(Grizzly)';
  const CLOUD = '구름';

  // Grizzly
  add('행복', 'INDIE', [
    ['보통의 하루 (はる)', GRIZZLY],
    ['유성', GRIZZLY],
    ['Gorgeous', GRIZZLY]
  ]);

  add('사랑', 'INDIE', [
    ['우리 다투게 돼도 이것만 기억해 줄래 눈을 맞추고 서로가 서로의 손잡아 주며 낮은 목소리와 예쁜 말투로 상처 주지 않게 노력을 하고 ●', GRIZZLY],
    ['있잖아 (あのね､)', GRIZZLY],
    ['잠깐 볼까, 우리 (feat. 로시 (Rothy))', GRIZZLY],
    ['태양과 바다 (Feat. 정지소)', GRIZZLY],
    ['널 만날 수 있길', GRIZZLY]
  ]);

  add('슬픔', 'INDIE', [
    ['Bench', GRIZZLY],
    ['길었던 여름보다', GRIZZLY],
    ['날 사랑했다는 말을 다 믿었지', GRIZZLY]
  ]);

  add('피곤', 'INDIE', [
    ['불면증', GRIZZLY],
    ['Beige coat', GRIZZLY],
    ['I gotta go', GRIZZLY],
    ['내 알고리즘은 망했나 봐', GRIZZLY]
  ]);

  add('위로', 'INDIE', [
    ['보통의 하루 (はる)', GRIZZLY],
    ['널 만날 수 있길', GRIZZLY],
    ['유성', GRIZZLY]
  ]);

  add('신남', 'INDIE', [
    ['RUN', GRIZZLY],
    ['Gorgeous', GRIZZLY],
    ['I gotta go', GRIZZLY]
  ]);

  add('SHARK', 'INDIE', [
    ['Bench', GRIZZLY],
    ['불면증', GRIZZLY],
    ['Beige coat', GRIZZLY],
    ['유성', GRIZZLY],
    ['태양과 바다 (Feat. 정지소)', GRIZZLY],
    ['길었던 여름보다', GRIZZLY],
    ['보통의 하루 (はる)', GRIZZLY],
    ['내 알고리즘은 망했나 봐', GRIZZLY],
    ['있잖아 (あのね､)', GRIZZLY],
    ['잠깐 볼까, 우리 (feat. 로시 (Rothy))', GRIZZLY]
  ]);

  // Cloud
  add('행복', 'INDIE', [
    ['나는 여름을 좋아하는 사람이었군요', CLOUD],
    ['더 나은 사람', CLOUD],
    ['사랑한다는 말은 부끄러운 게 아냐', CLOUD]
  ]);

  add('사랑', 'INDIE', [
    ['더 나은 사람', CLOUD],
    ['지금껏 그랬듯 앞으로도 계속', CLOUD],
    ['사랑한다는 말은 부끄러운 게 아냐', CLOUD],
    ['좋아하게 됐나봐, 너를', CLOUD]
  ]);

  add('슬픔', 'INDIE', [
    ['내가 모르게', CLOUD],
    ['마피아', CLOUD],
    ['겨울의 유실물', CLOUD]
  ]);

  add('피곤', 'INDIE', [
    ['하늘, 손, 풍선', CLOUD],
    ['꽃', CLOUD],
    ['내가 모르게', CLOUD]
  ]);

  add('위로', 'INDIE', [
    ['더 나은 사람', CLOUD],
    ['하늘, 손, 풍선', CLOUD],
    ['사랑한다는 말은 부끄러운 게 아냐', CLOUD],
    ['나는 여름을 좋아하는 사람이었군요', CLOUD]
  ]);

  add('SHARK', 'INDIE', [
    ['더 나은 사람', CLOUD],
    ['지금껏 그랬듯 앞으로도 계속', CLOUD],
    ['내가 모르게', CLOUD],
    ['마피아', CLOUD],
    ['꽃', CLOUD],
    ['하늘, 손, 풍선', CLOUD],
    ['좋아하게 됐나봐, 너를', CLOUD],
    ['겨울의 유실물', CLOUD],
    ['사랑한다는 말은 부끄러운 게 아냐', CLOUD],
    ['나는 여름을 좋아하는 사람이었군요', CLOUD]
  ]);
})();
