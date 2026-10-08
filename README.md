# Hero XP V14 — Olympus Academy

## Update GitHub Pages
1. Open your current V13 site and download a complete JSON backup. Store it securely.
2. Extract the V14 ZIP. Upload all included website files to your **existing** GitHub repository root, replacing matching files and adding `v14.js`.
3. Keep the same GitHub Pages URL and browser. Do not change the Pages settings.
4. If Supabase is configured, preserve your existing public Supabase URL and publishable anon key in `cloud-config.js` (the bundled example is blank). Never commit a service-role/secret key.
5. Commit the changes, wait for deployment, and refresh the same URL.
6. Verify student XP, Hero Dollars, attendance, missions, achievements, profiles, store inventory, bosses, and cloud snapshot before awarding points. Export a new backup.

## New tools
- Smart Reward Presets: editable combinations of XP and Hero Dollars, group confirmation and reward history.
- Daily Dashboard: quick overview of attendance, CHAMPS, class quest and boss.
- Base Camp Challenges: separate team points and resettable challenges.
- Attendance Rewards: +5 XP once per student per day using the **V14** action, only for marked-present students.
- Fair Participation: weekly turn counts and a picker prioritizing those with fewer turns.
- Backup Reminders: weekly reminder and manual full-backup download.
- Floating Quick Bar: XP, participation, Hero Dollars, timer, CHAMPS, undo, clear.

## Compatibility and precautions
- Keeps the `heroXPv8` student data key, `heroXPv10Game` game key, and `heroXPv11Extras` extras key. New settings are stored in `extra.v14` and included in the V11 backup/cloud payload.
- The V12 on-time reward and V14 attendance reward are separate; do not award both if you intend one reward.
- Backups are not automatically downloaded. The reminder prompts you to create one.
- GitHub Pages is public: a client-side interface does not secure teacher controls or student information. Check district policy and use a server-authenticated app if necessary.
- Cloud sync is optional and requires correctly configured Supabase. Avoid replacing newer cloud data with an older local snapshot.
- Test features with a backup before classroom use.
