import fs from 'node:fs';
import vm from 'node:vm';

const sourceFiles = [
  'public/music-data.js',
  'extra-music.js',
  'catalog-pack.js',
  'artist-pack.js',
  'mega-catalog.js'
];

const context = vm.createContext({ console });
for (const file of sourceFiles) {
  if (!fs.existsSync(file)) continue;
  const code = fs.readFileSync(file, 'utf8');
  vm.runInContext(code, context, { filename: file });
}
vm.runInContext('globalThis.__SHARK_EXPORT__ = musicData;', context);

const data = context.__SHARK_EXPORT__ || {};
const seen = new Map();
const norm = (v) => String(v || '').trim().toLowerCase();

for (const [mood, genres] of Object.entries(data)) {
  for (const genre of ['KPOP', 'POP', 'INDIE']) {
    for (const song of (genres?.[genre] || [])) {
      const title = String(song?.title || '').trim();
      const artist = String(song?.artist || '').trim();
      if (!title || !artist) continue;
      const key = `${norm(title)}|||${norm(artist)}`;
      if (!seen.has(key)) {
        seen.set(key, {
          key,
          title,
          artist,
          existingVideoId: String(song?.videoId || '').trim(),
          moods: [],
          genres: []
        });
      }
      const item = seen.get(key);
      if (!item.moods.includes(mood)) item.moods.push(mood);
      if (!item.genres.includes(genre)) item.genres.push(genre);
      if (!item.existingVideoId && song?.videoId) item.existingVideoId = String(song.videoId).trim();
    }
  }
}

const songs = [...seen.values()].sort((a, b) =>
  a.artist.localeCompare(b.artist, 'ko') || a.title.localeCompare(b.title, 'ko')
);

fs.mkdirSync('tools/.generated', { recursive: true });
fs.writeFileSync('tools/.generated/catalog.json', JSON.stringify(songs, null, 2), 'utf8');
console.log(`Exported ${songs.length} unique songs.`);
