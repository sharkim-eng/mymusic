/* SHARK chart refresh — 2026-11-19.
   References: Circle Digital (2026 week 45) and Billboard Hot 100 (2026-11-14).
   No unverified watch IDs; SHARK falls back to YouTube Music search. */
(() => {
  if (typeof musicData === 'undefined') return;
  const add = (mood, genre, entries) => {
    const dest = musicData[mood]?.[genre];
    if (!Array.isArray(dest)) return;
    const seen = new Set(dest.map(s => (s.title + '|||' + s.artist).trim().toLowerCase()));
    for (const [title, artist] of entries) {
      const key = (title + '|||' + artist).trim().toLowerCase();
      if (!seen.has(key)) { dest.push({ title, artist }); seen.add(key); }
    }
  };
  const kpop = {
    '행복': [['NEON','A2O LITE'],['LOVE ATTACK','RESCENE'],['Catch Catch','YENA'],['Call My Name','TWS']],
    '사랑': [['With','RESCENE'],['Landing in Love','HANRORO'],['Deja Vu','RESCENE'],['If You Ask Me What Love Is','ROY KIM']],
    '슬픔': [['Did You Become the Adult You Dreamed Of?','MEOMURU'],['When I Stop Thinking','Choi Yu Ree'],['Drowning','WOODZ'],['Time Capsule','DAVICHI']],
    '화남': [['BAD','ATEEZ'],['CRASH','ALLDAY PROJECT'],['REDRED','CORTIS'],["You're Under Arrest",'ILLIT']],
    '피곤': [['When I Stop Thinking','Choi Yu Ree'],['Good Goodbye','HWASA'],['0+0','HANRORO'],['Blue Valentine','NMIXX']],
    '위로': [['With','RESCENE'],['Did You Become the Adult You Dreamed Of?','MEOMURU'],['Landing in Love','HANRORO'],['Let Me Love My Youth','HANRORO']],
    '신남': [['NEON','A2O LITE'],["You're Under Arrest",'ILLIT'],['RUDE!','Hearts2Hearts'],['LEMONADE','aespa'],['Pop Off Pop Off','KiiiKiii']],
    'SHARK': [['With','RESCENE'],['Inside Out','RESCENE'],['Deja Vu','RESCENE'],['Heavy Serenade','NMIXX'],['Blue Valentine','NMIXX']]
  };
  const pop = {
    '행복': [["Choosin' Texas",'Ella Langley'],['I Just Might','Bruno Mars'],['Midnight Sun','Zara Larsson']],
    '사랑': [['Risk It All','Bruno Mars'],['Hate That I Made You Love Me','Ariana Grande'],['Loving Life Again','Ella Langley']],
    '슬픔': [['Stupid Song','Olivia Rodrigo'],['Expectations','Olivia Rodrigo & Chappell Roan'],['Lies','Zach Bryan feat. Lana Del Rey']],
    '화남': [['Housewife','Tate McRae'],['Patient Zero','Taylor Swift'],['Nicole Kidman','ADELA']],
    '피곤': [['Boston','Stella Lefty'],['Babydoll','Dominic Fike'],['Mr. Know It All','Teddy Swims']],
    '위로': [['Loving Life Again','Ella Langley'],['Risk It All','Bruno Mars'],['Stupid Song','Olivia Rodrigo']],
    '신남': [['Dracula','Tame Impala & JENNIE'],['Housewife','Tate McRae'],['Nicole Kidman','ADELA'],['Midnight Sun','Zara Larsson']],
    'SHARK': [['Dracula','Tame Impala & JENNIE'],['Boston','Stella Lefty'],['Babydoll','Dominic Fike'],['Midnight Sun','Zara Larsson']]
  };
  Object.entries(kpop).forEach(([mood, entries]) => add(mood, 'KPOP', entries));
  Object.entries(pop).forEach(([mood, entries]) => add(mood, 'POP', entries));
  add('SHARK', 'INDIE', [['Landing in Love','HANRORO'],['Let Me Love My Youth','HANRORO']]);
  add('위로', 'INDIE', [['Let Me Love My Youth','HANRORO']]);
  add('슬픔', 'INDIE', [['Landing in Love','HANRORO']]);
})();
