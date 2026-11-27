# Claude Code for HRD 사전 설문

한 화면에 한 문항씩 답하는 12문항 사전 설문 페이지입니다.

- `1206/index.html` — 12/6 강의용 설문 (응답은 시트 '12/6 설문' 탭)
- `1122/index.html` — 11/22 강의용 설문 (응답은 시트 '응답' 탭)
- `index.html` — 최신 설문(1206)으로 넘기는 이동 페이지
- `apps_script.gs` — 응답을 구글 시트 설문별 탭에 한 줄씩 쌓는 Apps Script (페이지가 보내는 sheet 값으로 탭 선택)

응답은 페이지의 `ENDPOINT`에 넣은 Apps Script 웹 앱 주소로 보냅니다.
