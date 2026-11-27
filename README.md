# Google Ads campaign report script

A Google Ads script that exports the last 30 days of campaign performance (impressions, clicks, cost, conversions) to a Google Sheet. It only reads from the Google Ads account. The only thing it writes to is one tab in the Sheet.

## Files

- `campaign-report.js`: the script

## Setup

1. Create a Google Sheet and copy its URL.
2. In Google Ads, go to Tools > Scripts and create a new script.
3. Paste in `campaign-report.js` and replace `PASTE_YOUR_SHEET_URL_HERE` with the Sheet URL.
4. Authorize the script, then run it in Preview before running it for real.

## Test cases

Run each case in Preview and check the result.

| # | Case | Expected result |
|---|------|-----------------|
| 1 | Account with active campaigns | Row count in the Sheet matches the campaign count in the Google Ads UI |
| 2 | Cost check | One campaign's cost matches the Google Ads UI for the same 30-day range |
| 3 | Account with no campaigns | Sheet has only the header row, and the log says "Exported 0 campaigns." |
| 4 | Run the script twice | No duplicate rows, because the tab is cleared on each run |

## Rollback note

The script makes no changes inside Google Ads. To undo it:

- Delete the "Campaign Report" tab, or restore the Sheet from its version history.
- Remove the schedule in Tools > Scripts if you set one.

## Notes

- Cost is converted from micros to the account currency.
- Removed campaigns are left out of the report.
