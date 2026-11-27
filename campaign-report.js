// Exports the last 30 days of campaign performance to a Google Sheet.
// Reads from the Google Ads account; writes only to the Sheet tab below.
var SHEET_URL = 'PASTE_YOUR_SHEET_URL_HERE';
var TAB_NAME = 'Campaign Report';

function main() {
  var query =
    'SELECT campaign.name, campaign.status, metrics.impressions, ' +
    'metrics.clicks, metrics.cost_micros, metrics.conversions ' +
    'FROM campaign ' +
    'WHERE segments.date DURING LAST_30_DAYS AND campaign.status != "REMOVED" ' +
    'ORDER BY metrics.cost_micros DESC';

  var rows = [['Campaign', 'Status', 'Impressions', 'Clicks', 'Cost', 'Conversions']];
  var result = AdsApp.search(query);
  while (result.hasNext()) {
    var r = result.next();
    rows.push([
      r.campaign.name,
      r.campaign.status,
      Number(r.metrics.impressions),
      Number(r.metrics.clicks),
      Number(r.metrics.costMicros) / 1000000,
      Number(r.metrics.conversions)
    ]);
  }

  var ss = SpreadsheetApp.openByUrl(SHEET_URL);
  var sheet = ss.getSheetByName(TAB_NAME) || ss.insertSheet(TAB_NAME);
  sheet.clearContents();
  sheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
  Logger.log('Exported ' + (rows.length - 1) + ' campaigns.');
}
