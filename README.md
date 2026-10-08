# Hero XP Command Center V22 — Student Fines

## What's new
In the **Hero Dollars** tab, use one of three fine buttons:
- Talking: up to **−$2 Hero Dollars** per selected student.
- Work Not Complete: up to **−$3 Hero Dollars** per selected student.
- Disrespect: up to **−$5 Hero Dollars** per selected student.

**XP, levels, card evolutions, and achievements never decrease from fines.** Balances stop at $0. A confirmation lists every eligible student's current and resulting balance before applying the fine. Students marked **absent** today are excluded. Successful deductions appear in V11 Reward History with negative Hero Dollar values. Selected students are cleared after applying fines. Undo uses the existing session undo mechanism for student balances; verify the reward history separately after an undo, as its audit entry remains.

## Updating your existing GitHub Pages site
1. Open your current V21 site and download a full backup. Keep it secure.
2. Download and extract `hero_xp_v22_github.zip`.
3. Open your existing GitHub repository. Replace `index.html` and add `v22.js` alongside the included `v11.js` through `v21.js`.
4. **If you use Supabase, keep your existing configured `cloud-config.js`** rather than overwriting it with the example included in the ZIP. Never publish a secret/service-role key.
5. Commit with `Update Hero XP to V22` and wait for GitHub Pages to deploy.
6. Refresh the **same website URL using the same browser**. Confirm XP and Hero Dollar balances, then test a fine on a test account and verify the history.
7. Mark a test student absent and confirm they are excluded. Make a fresh backup.

## Data compatibility and privacy
The existing `heroXPv8` student data and `heroXPv11Extras` history are reused. No migration or reset of student XP, Hero Dollars, game progress, missions, equipment, collectibles, or cloud configuration is intended. Browser storage is local to the website origin. Cloud synchronization requires separately configured Supabase authentication. GitHub Pages itself does not protect teacher controls or student data; follow district policy.
