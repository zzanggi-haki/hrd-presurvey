// 11/22 클래스 후기 설문 응답 → 구글 시트 "11/22 클래스 후기 응답"에 쌓는 Apps Script
// 구글 Apps Script 프로젝트 "11/22 클래스 후기 설문 수신"에 들어 있는 코드의 사본 (웹 앱, 모든 사용자, 2026-11-23 배포)
// 설문 페이지가 { rows: {"01. 이름": "...", ...}, submittedAt: "ISO 시각" } 을 POST 한다.
// 열 이름(1행)은 처음 받은 응답 기준으로 만들고, 새 문항이 생기면 오른쪽에 열을 덧붙인다.

const SPREADSHEET_ID = "1_aBYCoJ7AGeBXk-4ROZXLKapfmdNz6ZMOF8xd0NaSEQ";  // 시트: 11/22 클래스 후기 응답
const SHEET_NAME = "후기_1122";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    const rows = data.rows || {};
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const name = data.sheet || SHEET_NAME;
    const sheet = ss.getSheetByName(name) || ss.insertSheet(name);

    let headers = sheet.getLastRow() > 0
      ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
      : [];
    if (headers.length === 0) {
      headers = ["제출 시각"].concat(Object.keys(rows).sort());
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
      sheet.setFrozenRows(1);
    } else {
      const missing = Object.keys(rows).filter(k => headers.indexOf(k) === -1).sort();
      if (missing.length) {
        sheet.getRange(1, headers.length + 1, 1, missing.length).setValues([missing]).setFontWeight("bold");
        headers = headers.concat(missing);
      }
    }

    const when = data.submittedAt ? new Date(data.submittedAt) : new Date();
    const line = headers.map(h => h === "제출 시각" ? when : (rows[h] !== undefined ? rows[h] : ""));
    sheet.appendRow(line);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// 배포 전 편집기에서 실행해 보는 용도: '응답' 탭에 테스트 한 줄이 생기면 정상
function testPost() {
  doPost({ postData: { contents: JSON.stringify({
    rows: { "01. 이름": "테스트", "02. 강의 분야": "리더십·조직문화" },
    submittedAt: new Date().toISOString()
  }) } });
}
