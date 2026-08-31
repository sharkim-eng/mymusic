# MYMUSIC

React + TypeScript + Vite로 만든 개인 음악 감상 웹앱입니다.

## 주요 기능
- 음악 재생 / 일시정지 / 이전 / 다음
- 재생 위치와 음량 조절
- 셔플 / 반복 / 한 곡 반복
- 곡과 아티스트 검색
- 좋아요 목록
- MP3 / M4A / WAV / OGG / FLAC 등 로컬 음악 추가
- 추가한 음악을 브라우저 IndexedDB에 저장
- 모바일 반응형 화면
- GitHub Pages 자동 배포 workflow

## 로컬 실행

```bash
npm install
npm run dev
```

## GitHub Pages

저장소의 `Settings → Pages → Build and deployment → Source`를 `GitHub Actions`로 선택하면 `main` 브랜치 변경 시 자동 배포됩니다.

> 개인 음악 파일은 GitHub 서버에 업로드되지 않고 해당 브라우저 내부에 저장됩니다.
