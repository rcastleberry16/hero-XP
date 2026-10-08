# Hero XP Command Center V12 — GitHub Pages Update

## Update your existing site
1. On V11, download a JSON backup using Teacher > Backup. Keep it secure.
2. Extract `hero_xp_v12_github.zip`.
3. In your existing GitHub repository, upload/replace `index.html`, `v11.js`, `cloud-config.js`, and add `v12.js` in the repository root. Keep `supabase-setup.sql` for reference.
4. Commit changes and wait for GitHub Pages to deploy. Refresh the same website address on the same browser.
5. Verify student XP and Hero Dollars, missions, trophies, boss battle, class quest, and store inventory. Make a new backup.

## New V12 features
- Student Roster Manager: add, edit, archive, restore, and delete archived students.
- Hero Profile Editor: names, XP, Hero Dollars, Base Camp, and title.
- Attendance: mark present/absent/tardy, optionally award +5 XP to marked-present students.
- Hero Store Manager: edit items, prices, and stock; purchasing stays in V10 Store.
- V12 activity log and undo of V12 actions during the current browser session.
- Search and sort students by name, XP, level, and Base Camp.
- Student Spotlight for classroom celebrations.

## Storage and cloud
V12 retains the V8 student storage key, V10 game storage key, and V11 extras storage key. V12 records live inside V11 extras, which V11 backups and optional Supabase snapshots include. Undo is session-only; backups are important. Cloud requires your existing Supabase setup, configured `cloud-config.js`, and teacher sign-in. GitHub Pages alone does not sync balances across devices. Avoid simultaneous edits on multiple devices.

## Student privacy
GitHub Pages is public, and the inherited site embeds student names and starting XP in HTML. Supabase cloud authentication does NOT protect those publicly embedded values or the client-side teacher interface. Check school/district policy; use aliases or authenticated hosting where required. Attendance is a classroom aid, not official attendance reporting.

## Notes
Renaming a student migrates their matching V11 mission and trophy keys. Archived students retain their profiles. Back up before deleting archived records. JavaScript syntax checks passed; test on your deployed site before using with students.
