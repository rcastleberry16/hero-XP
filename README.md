# Hero XP Command Center V13 — Deployment and migration

## Important: protect student information
GitHub Pages is a **public static website**. It cannot securely restrict teacher controls, and student names and initial XP are embedded in index.html. **V13 does not claim to implement secure teacher authentication.** The Access panel explains this limitation. For real security, migrate to a private authenticated web app with server-side authorization and district-approved storage. Existing Supabase authentication protects only the cloud API when Row Level Security is correctly configured.

## Deploy to existing GitHub Pages repository
1. In the existing website, export a backup of your V12 data and keep it in a private, secure location.
2. Extract this ZIP. Upload/replace **index.html, v11.js, v12.js, v13.js, cloud-config.js** in your existing repository root. Preserve your actual Supabase project URL and publishable/anon key in cloud-config.js; never put a service-role key in client code.
3. Keep **supabase-setup.sql** for reference. Do not paste SQL into GitHub Pages settings.
4. Commit and wait for Pages deployment. Hard-refresh the **same site URL in the same browser**.
5. Verify existing student balances, roster, missions, trophy room, store, and boss state before awarding anything new.
6. Export another backup. Test cloud push/pull with backups before trusting it across devices.

## New V13 tools
- **Hero Evolutions:** select exactly one student, open Hero Evolutions, assign title and HTTPS artwork URL for each tier. Tier changes automatically at levels 10/20/30/50/75/100. Image URLs are references, not uploaded files.
- **Multi-Stage Boss:** Hydra → Minotaur → Medusa → Typhon, with teacher-triggered damage, stage advancement, and reset.
- **Behavior & Work Tracker:** individual dated observations (private teacher use only; see security warning).
- **Progress Analytics:** weekly recorded rewards and current levels, based on available V11 history. No invented pre-V11 transactions.
- **Weekly Hero Reports:** printable individual summaries using recorded weekly actions.
- **Access & Privacy:** security guidance and a presentation-mode shortcut. It is **not** an authentication system.

## Persistence and migration
V13 uses the existing V8 student storage, V10 game storage, and V11 extras storage. All new V13 information is nested in `extra.v13`, included in V11-compatible backup/cloud snapshots. No XP or Hero Dollar totals are reset by the V13 script. The system still uses local browser storage unless Supabase is configured and the teacher signs in.

## Verification
JavaScript syntax is checked before packaging. Real browser behavior, cloud authorization, and end-to-end migrations must be tested with a backup on your deployed site.


## V13 Refined — Quick Action Toolbar
The large single row of buttons has been reorganized into five tabs: **XP**, **Hero Dollars**, **Class Tools**, **Adventures**, and **Manage**. Undo, Present, Sound, and Fullscreen remain visible at the top. Select All and Clear remain available at the bottom. The active tab does not affect XP or saved data.

### Update an existing V13 website
1. Export a backup from your current classroom site.
2. Replace only `index.html` in your GitHub repository with the new one, leaving the existing `v11.js`, `v12.js`, `v13.js`, `cloud-config.js`, and database configuration in place.
3. Commit and wait for GitHub Pages to deploy. Refresh the same URL in the same browser.
4. Check balances, multi-selection, XP, Hero Dollar awards, each tab, and the Present button.

For a first installation, upload all files from the ZIP. Browser local data is tied to the website origin; changing the GitHub Pages URL or browser will not automatically transfer balances.
