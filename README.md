# SHARK

기분을 고르면 어울리는 음악을 추천해 주는 모바일 중심 PWA입니다.

## 현재 구성
- 정적 HTML/CSS/JavaScript
- GitHub Pages 배포
- PWA(Service Worker + Web App Manifest)
- YouTube Music 연결
- 저장한 곡 / 최근 들은 곡
- 기분·장르 기반 추천

## 주요 파일
- `index.html` — 홈
- `mood.html` — 기분 선택
- `result.html` — 추천 결과
- `playlist.html` — MY MUSIC
- `shark.css` — 공통 UI
- `shark-core.js` — 추천·저장·재생 로직
- `shark-winter-bg.webp` — 현재 홈 배경
- `sw.js`, `pwa.js`, `manifest.webmanifest` — PWA
- `public/music-data.js` 및 `*-pack.js` — 음악 데이터

## 배포
`main` 브랜치에 변경 사항이 들어오면 GitHub Actions가 저장소의 정적 파일을 GitHub Pages에 배포합니다.

## YouTube Music ID 갱신
`.github/workflows/resolve-ytmusic-ids.yml` 워크플로가 음악 데이터 변경 시 ID를 갱신합니다.
