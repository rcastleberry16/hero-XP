# Hero XP Command Center V21 — Evolving Cards Every Five Levels

## What changed
- Every student's card changes its theme at levels **1, 6, 11, 16, ... 96** (20 distinct designs across levels 1–100).
- Each tier has a different color palette, Greek-themed title, emblem, border, and progress-bar styling.
- Card designs update automatically whenever XP changes and a student enters the next five-level band.
- Existing custom hero titles, equipment, and collectibles remain visible.
- Absent students stay greyed out and ineligible for rewards.
- This update is visual only: it does not modify XP, Hero Dollars, achievements, missions, or other stored data.

## Update your existing GitHub Pages website
1. Download a complete backup from your current V20 website.
2. Extract the V21 ZIP.
3. In your existing GitHub repository, replace `index.html` and upload the new `v21.js` file alongside the existing `v11.js` through `v20.js`.
4. Keep your **existing configured `cloud-config.js`** if using Supabase. Do not overwrite it with a blank example.
5. Commit the files and wait for GitHub Pages to deploy.
6. Refresh the **same website URL in the same browser**.
7. Verify current XP and Hero Dollar balances. Check a student near Level 16 or 21 to confirm their card updates after a level-up.
8. Download another backup.

## Notes
- Level thresholds continue using the previously corrected 1–100 XP table.
- The new theme is determined from the calculated level; no new storage keys are used.
- GitHub Pages alone is not secure teacher authentication and can expose student data. Follow district privacy policy.
- Syntax and ZIP integrity checks do not replace browser/cloud testing.
