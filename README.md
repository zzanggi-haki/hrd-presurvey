# Claude Code for HRD 사전 설문

한 화면에 한 문항씩 답하는 20문항 사전 설문 페이지입니다.

- `index.html` — 설문 페이지 (시작 → 문항 20개 → 완료, 한 파일)
- `apps_script.gs` — 응답을 구글 시트 '응답' 탭에 한 줄씩 쌓는 Apps Script

응답은 페이지의 `ENDPOINT`에 넣은 Apps Script 웹 앱 주소로 보냅니다.
