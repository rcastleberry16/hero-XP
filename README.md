# Hero XP V15 — Attendance Safety Update

## Changes
- Removed the floating bottom toolbar so popup Close buttons are unobstructed.
- Students marked **absent** today have greyed-out cards and cannot be selected for regular XP, participation, Hero Dollars, custom awards, or Hero Moments.
- Select All and Random Hero exclude absent students. Saving attendance updates the cards.
- Existing XP, Hero Dollars, levels, missions, game progress, and cloud settings retain their previous storage keys.

## Update GitHub Pages
1. Download a full V14 backup first and keep it secure.
2. Extract this ZIP. Replace the existing website files and add **v15.js** at the repository root.
3. If your `cloud-config.js` already has your Supabase URL and publishable key, **keep your existing configured file** instead of overwriting it with the blank example. Never publish a secret/service-role key.
4. Commit and refresh the same website URL in the same browser.
5. Open **Class Tools → Attendance**, mark a student absent, and click **Save Attendance**. Confirm the card greys out and cannot receive a normal reward.
6. Mark that student present, save, and confirm the card becomes available again. Verify XP and Hero Dollar totals, then export another backup.

Only students explicitly marked absent are blocked; unmarked and tardy students remain selectable. Attendance-based bulk rewards have separate eligibility logic. The V12 and V14 attendance reward buttons can each award +5 XP, so avoid using both for the same day. Cloud sync still requires configured Supabase and secure authentication; GitHub Pages alone does not secure student data.
