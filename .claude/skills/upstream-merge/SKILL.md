---
name: upstream-merge
description: Resolve or audit an upstream LibreChat merge on the NJ fork — preserve NJ overrides, absorb valid upstream changes, keep the conflict surface minimal.
disable-model-invocation: true
---

# Upstream Merge (NJ ← LibreChat)

NJ AI Assistant is a fork of [danny-avila/LibreChat](https://github.com/danny-avila/LibreChat). A weekly CI action (`.github/workflows/nj-sync-upstream.yml`) merges upstream `main` into an `upstream-merge/<date>` branch and opens a PR. This skill is the human-in-the-loop part: turning that branch into a clean merge that keeps NJ's customizations intact, then proving it green.

**Merge sessions outlive their context.** Keep a state file at `.claude/skills/upstream-merge/MERGE-STATE-<date>.md` from Phase 1 onward: the three refs, resolutions and retirements, gates run, open items, corrections to your own earlier claims, and **every item the user pins** ("remind me", "circle back", "put a pin in it", a deferred decision), written the moment it is said. The closing brief is generated from that file, never from memory. After compaction, re-read this file and the state file in full before continuing; only this file's head is re-attached automatically.

The work is three Steps and five Phases; none is optional. **Steps are orientation: establish them up front and re-derive Step 2 whenever the refs shift. Phases are the pipeline: each completes once, in order.** Copy this checklist into your response and check items off as you complete them:

```
Merge progress:
- [ ] Merge stage established from the PR and git; the two open questions asked
- [ ] State file started (MERGE-STATE-<date>.md)
- [ ] Step 0 — upstream remote fetched
- [ ] Step 1 — NJ divergence map built
- [ ] Step 2 — the three refs pinned (base / ours / theirs)
- [ ] Phase 1 — every conflict resolved and three-way verified
- [ ] Phase 2 — clean-merge analysis run on the FULL risk set
- [ ] Phase 3 — CI replicated locally: all gates, all suites
- [ ] Phase 4 — post-merge review list delivered
- [ ] Phase 5 — merge commit (+ fixups) committed, pushed, CI green
```

This skill is `disable-model-invocation: true`: only the user typing `/upstream-merge` starts it, so ask them to run the command rather than starting on a verbal go-ahead.

**Establish the merge stage from the PR and git; ask the user only what those cannot tell you.** The sync PR body carries the branch and the exact recovery command; `git rev-parse -q --verify MERGE_HEAD` says whether a merge is in progress. Git cannot show whether files with cleared markers were *reviewed*, or whether a concluded merge is believed done or known broken — ask those two things and nothing more elaborate. Three entry states converge on one pipeline:

- **Fresh** — the branch isn't checked out, or CI committed conflict markers and the mid-merge state hasn't been restored (Step 2). Start at Step 0.
- **Mid-merge** — `MERGE_HEAD` exists. Do Steps 0–2, then Phase 1 on what remains, giving the user's hand-resolved files the same three-way verification as your own. Cleared markers are not evidence of a checked merge.
- **Post-merge, work in progress** — the merge commit exists and fixes are still being chased. Every ref has shifted, so re-derive them with Step 2's concluded-merge recipe before diffing anything, then run or re-run Phases 2–5.

## Prime directive

**Preserve NJ overrides — functionality *and* style — unless one of these is true:**

1. **Upstream made the override obsolete** — the surrounding code changed so the customization no longer applies.
2. **Upstream now covers it** — upstream shipped a feature, capability, or internal that does what an NJ customization does by hand. Adopt upstream's version and *delete* the NJ code. Any upstream mechanism that lets us retire a customization qualifies, whether or not NJ was building toward it.

**Actively hunt for customizations to retire.** Every override handed back to an upstream mechanism is one less thing to reconcile on every future merge. This lever is almost entirely **non-UI** — features, internals, capabilities, config plumbing. NJ's UI customizations are deliberate and locked in; do not retire a UI override to reduce divergence unless the user explicitly asks.

**The retirement signal is what this merge brings in.** Look at the incoming delta (`git diff <base>..MERGE_HEAD`) for upstream code arriving *now* that supersedes an NJ workaround. Do not look at `upstream/main` past the commit being merged.

When unsure whether upstream truly covers a customization, keep the NJ override and flag it. Silently dropping an NJ customization is the failure mode this skill exists to prevent — closely followed by dropping a valid upstream change on the floor while resolving.

**`CLAUDE.md` is an upstream file, not NJ intent.** It documents upstream's conventions and repo shape (branching model, PR process, PR template) and routinely describes things NJ has deliberately changed or removed. Never cite it as evidence of what NJ wants, and never apply its process rules to this merge. A disagreement between `CLAUDE.md` and NJ's code is expected and is not an action item — not a review-list entry, not a "dangling reference," not a fix in either direction. It warrants a note only when upstream changed it *in this merge* in a way that reveals a new upstream convention worth assessing.

## NJ conventions (apply throughout)

- **Disable, don't delete.** Remove an upstream feature at its highest-impact inflection point (hide a component at its render site). Wrap the disabled code in **one** `/* NJ: <reason> ... */` block (`{/* */}` in JSX) so the inner lines stay byte-identical — never per-line `//` across a region. A block cannot wrap a `/** */` JSDoc; put the NJ note on the opening line instead.
- **Keep upstream code inert-but-present as a merge reference** — a dead second `return`, a commented block. Never delete or clean these up.
- **New NJ code goes in NJ-specific files** under an `nj/` path, imported into the upstream file.
- **Mark modifications with a one-line `// NJ: <why>`**, including interleaved one-line insertions inside upstream functions. If the reason needs a paragraph, the resolution is probably wrong.
- **Upstream code landing inside an NJ-disabled region is the user's decision, not a refactor.** Leave it inert and byte-identical, then surface it: what the feature is, whether it is reachable in NJ, what taking it live would cost. **Never restructure NJ's live code to hoist it out** — that trades a zero-diff resolution for permanent churn. Widening the block's reason line to cover the new code is the right-sized change.
- **Fix NJ's bugs now; leave upstream's to upstream.** Diff the defective line against `$M^2` first. Byte-identical to upstream means upstream owns it: record an upstream PR candidate and leave NJ matching, because a local patch buys divergence on a line upstream is still churning. A defect NJ's own customization caused is NJ's to fix: in the merge if the resolution introduced it, otherwise as a review item for the cleanup pass.
- **A line that differs from upstream is either at parity or tagged — never bare.** An unmarked divergence reads as upstream code and gets overwritten next merge; a stale `// NJ:` on a line back at parity tells the next reader to preserve nothing.
- **Prefer the override that will conflict.** Between editing an upstream definition in place and layering over it so NJ wins silently (a wrapper, a trailing class, an appended cva compound), edit in place. The conflict forces someone to re-decide the override against upstream's new code; a silent layer defeats every future upstream improvement with nothing in the merge to reveal it.
- **Accept upstream's import blocks; ignore unused-import lint.** Import *ordering* is a CI gate — see Phase 3.
- **An NJ override may need to relocate to follow an upstream refactor** — if upstream extracts a function NJ had modified inline, the NJ change moves into the new function.
- **Merge method is a merge commit** — never squash or rebase upstream into `newjersey`.

## Verification discipline (apply throughout)

- **Nothing is verified until a command has verified it.** Keep two registers and say which you are in: "this is my hypothesis" versus "confirmed against the diff / tests / logs." Anything stated as fact cites the command or code path that established it.
- **Lead with the check, not the verdict — least of all a dismissal.** "This is not X" closes the investigation before it starts.
- **When the user flags a risk or corrects a claim, verify it now** — don't defer it, and don't reintroduce it later in the session.
- **Config files are a hypothesis; the running app is the evidence.** Reading the yaml template and env template to conclude "NJ doesn't configure X" has produced wrong findings repeatedly, because an *empty* env var still counts as set and `/api/config` resolves values the yaml never states. When a claim depends on resolved config, say it is a static inference or confirm it in the app; a devtools class list settles in seconds what class-name reasoning gets wrong.
- **Flag suspected eroded NJ customizations; never silently normalize them.** NJ's overrides cluster around deliberate goals (focus rings, a11y affordances, brand colors) and past merges applied them unevenly. When a resolution touches an override, check whether NJ has a canonical mechanism for that goal and whether this site uses it. Report the inconsistency with evidence, **preserve the existing form during the merge**, and put normalization on the review list for the cleanup pass. Bound it: only where the resolution already touches the line, evidence required, and a *flag* rather than a diagnosis of intent — establish authorship with `git blame` first, since upstream itself carries competing conventions.

## Step 0 — Guarantee an upstream reference

```sh
git remote get-url upstream >/dev/null 2>&1 || \
  git remote add upstream https://github.com/danny-avila/LibreChat.git
git fetch upstream main
```

- **Read the sync PR first.** Its body carries the recovery command with the upstream SHA spelled out (`git reset --hard HEAD^1 && git merge <sha>`). Run that rather than reconstructing the SHA.
- **`gh` resolves to `danny-avila/LibreChat` once the `upstream` remote exists.** Always pass `-R newjersey/nj-ai-assistant`.
- `git show upstream/main:<path>` and `git log upstream/main -- <path>` give upstream's current file and history.
- **Mid-merge, resolve against `MERGE_HEAD`, never `upstream/main`.** `MERGE_HEAD` is the exact upstream commit being merged; `upstream/main` has usually advanced past it.

## Step 1 — Map NJ's divergence from upstream

Inventory everything NJ changed relative to the upstream commit the fork last incorporated:

```sh
UPSTREAM_BASE=$(git merge-base newjersey upstream/main)
git diff --stat "$UPSTREAM_BASE" newjersey        # where the divergence is
git diff "$UPSTREAM_BASE" newjersey -- <path>     # full NJ patch for one file
git grep -n "NJ:" newjersey -- <path>             # marked overrides — a starting index
```

Diff against `newjersey`, **not** the `upstream-merge/<date>` branch.

**`NJ:` markers are an index, not a census.** Legitimate NJ changes carry no marker (JSON and config, import blocks, self-evident edits). The full diff is the source of truth; unmarked divergence is not suspicious.

**Diff size does not predict conflict risk; line-level churn does.** A large NJ divergence in a cold region is safe; a small NJ edit in a hot region is dangerous. Judge by whether upstream edits *the exact lines NJ touched*, not how often it touches the file. Re-derive the churn axis each merge:

```sh
# lines upstream changed, per file NJ also touched (use upstream/main when no merge is in progress)
git diff --numstat "$UPSTREAM_BASE" MERGE_HEAD -- $(git diff --name-only "$UPSTREAM_BASE" newjersey) | sort -k1,1nr | head -30
```

Prior from a past 250-commit window, to check against that output rather than trust:

- **Watch closely — `Conversations.tsx`.** Small NJ diff, and upstream repeatedly edits those exact lines.
- **Big but cold — `AgentConfig.tsx`, `AgentFooter.tsx`, `AgentPanel.tsx`, `NewChat.tsx`, `routes/Root.tsx`.** NJ's largest divergences, in regions upstream rarely touches.
- **Mechanical noise — `api/package.json`, `client/package.json`, `translation.json`.** Constant churn, but the conflicts are version bumps and key additions.
- **`style.css`** — hot on both axes, but CSS conflicts are low-stakes.

## Step 2 — Orient: find the three references

Name the sides before touching a file: **ours** (NJ, `newjersey`), **theirs** (upstream being merged), **base** (common ancestor).

**In-progress merge:**

| Side | Ref | Per-file |
|---|---|---|
| base | merge base | `git show :1:<path>` |
| ours (NJ) | `HEAD` | `git show :2:<path>` |
| theirs (upstream) | `MERGE_HEAD` | `git show :3:<path>` |

**Concluded merge: every reference shifts, so re-derive the set and pin the upstream merge by identity.** Once fixup commits or a PR merge stack on top, `HEAD` is no longer the merge, the merge base moves, and `git log --merges -1` returns the newer PR merge — whose tell is that *both* parents are NJ commits. Identify the upstream merge as the one whose `^2` is reachable from `upstream/main`:

```sh
for m in $(git log --merges --format=%H -30); do
  git merge-base --is-ancestor "$m^2" upstream/main 2>/dev/null && { M=$m; break; }
done
git rev-parse "$M^1" "$M^2"              # ^1 = ours (newjersey), ^2 = theirs (upstream)
BASE=$(git merge-base "$M^1" "$M^2")
```

Then `git show $M^1:<path>` / `$M^2:<path>`, `git diff $M^1 $M -- <path>` (vs NJ), `git diff $M^2 $M -- <path>` (vs upstream). `Not a valid object name HEAD^2` means you are on a follow-up commit, not the merge. A suspiciously small both-touched set in Phase 2 means you pinned the wrong merge.

**If CI committed conflict markers**, restore the mid-merge state; the upstream SHA is the merge's second parent:

```sh
git reset --hard HEAD^1 && git merge "$(git rev-parse HEAD^2)"
```

## Phase 1 — Resolve conflicts

**One file at a time: resolve it, report it, and ask before starting the next.** Never batch two files because they share a mechanism. The user is reviewing each resolution as it lands.

**Order by the import graph, not by difficulty.** One unresolved marker breaks every Jest suite that transitively imports the file, and barrel files spread the damage. Either resolve heavily-imported hubs first so per-file tests become usable as you go, or accept that tests are unavailable until Phase 1 completes — choose deliberately and say which. Mid-Phase-1 parse errors from *other* unresolved files are noise.

For each conflicted file:

1. **Read all three versions** (`:1:`/`:2:`/`:3:`). Enumerate NJ's exact divergence with `git diff :1:<path> :2:<path>` so you drop nothing.
2. **Classify upstream's change** vs base: bug fix, refactor, new feature, or churn. A "consolidate" or "refactor" commit usually *moves* existing code.
3. **Compose the resolution** so every NJ override survives (re-expressed against upstream's new structure if it refactored around it) and every substantive upstream change lands. For a heavy restructure, `git checkout --theirs -- <path>` as the skeleton, then re-apply NJ's overrides; `git diff MERGE_HEAD -- <path>` should then show *only* the NJ overrides.
4. **Verify with a three-way compare, not a read-through.** `git diff --ours -- <path>` and `git diff --theirs -- <path>` read the conflict stages and must run *before* `git add`; once staged, diff against `HEAD` and `MERGE_HEAD`. Every hunk where resolved == ours ≠ theirs is a dropped upstream change unless you can name the NJ override that justifies it. Then grep the resolved tree for tokens, classes, and symbols the incoming change removed or renamed — a kept reference to something upstream deleted reads fine and fails silently. Remove markers only after this passes.

If upstream clearly superseded an NJ override, surface it and propose adopting upstream; do not keep it silently.

**Provenance means `git blame`, not presence.** Where a symbol exists (`:1:`/`:2:`/`:3:`) says nothing about who wrote it; blame does, and that is what separates an NJ decision from inherited upstream code.

```sh
git show :1:<path> | grep -c '<symbol>'      # at the merge base?
git show :3:<path> | grep -c '<symbol>'      # upstream now?
git log --oneline -S'<symbol>' HEAD -- <path>
git log --oneline -S'<symbol>' upstream/main -- <path>
# -S lists adding and removing commits identically, so compare each to its parent:
for c in $(git log --format=%H -S'<symbol>' HEAD -- <path>); do
  echo "$c $(git show "$c^:<path>" | grep -c '<symbol>') -> $(git show "$c:<path>" | grep -c '<symbol>')"
done
git blame -L <line>,+1 --porcelain <ref> -- <path> | grep -E '^(author |summary )'
```

Decision rule: **upstream introduced it and later deleted it → delete it**; it is an orphan from a prior merge. **NJ introduced it, or NJ code consumes it → an NJ decision**; preserve and flag. Blame also dates both sides: if NJ hand-rolled a capability and upstream shipped its own *later*, prime-directive case 2 applies. **Blame that lands on a merge commit is not an answer** — the line matches neither parent; diff both parents and check direction with `git show <commit> -- <path>`.

**A deferred decision means holding NJ's current appearance, not adopting upstream's.** When the user parks a question, resolve to whatever preserves today's NJ behavior — the reversible choice. Taking upstream's version "for now" silently makes the decision. When an NJ override is a *value* inside a structure upstream refactored, re-express the value against the new structure.

**Test collisions.** Upstream regularly ships tests asserting behavior NJ removed or changed:
- If the test's *purpose* still applies under NJ, patch the specific assertion with an `// NJ: <why>` note.
- If its *entire purpose* is behavior NJ doesn't do, `it.skip` with an `// NJ: <why>` note.
- Never add NJ assertions to an upstream spec file. NJ tests live under `nj/` paths.

**Mechanical conflict classes:**

- **`package-lock.json` — never hand-merge; regenerate.** Resolve the `package.json`s first (keep NJ-only dependencies, take upstream's bumps), then `git checkout --theirs -- package-lock.json && npm install`. Confirm the install succeeds and the NJ-only packages are back in the lock; `npm run reinstall` is the clean-slate fallback. A peer-dependency conflict between an NJ dep and an upstream bump is a real incompatibility to surface, not an install to force.
- **`client/src/locales/en/translation.json`** — upstream's key additions merge mechanically; NJ copy overrides always survive. If an override's key vanished or stopped taking effect, find where the string went before accepting upstream's copy, then re-apply or deliberately retire it and put it on the review list.
- **Version-bump conflicts in `package.json`** — take upstream's bump unless `git blame` shows a deliberate NJ pin; then keep the pin and flag it.

---

## Closing phase (run in full, every merge)

Once conflict markers are gone, the merge is *not* done. Four phases remain.

### Phase 2 — Clean-merge analysis, FULL by default

A textually clean auto-merge can silently neutralize an NJ override when upstream changed the *same file* in a way git combined without conflicting. Run this every merge, comprehensively.

Compute the audit set — files **both** sides changed that were **not** conflicts:

```sh
# $M, $BASE from Step 2's identity recipe — never `--merges -1`
git diff --name-only "$BASE" $M^2 | sort > /tmp/up.txt      # upstream touched
git diff --name-only "$BASE" $M^1 | sort > /tmp/nj.txt      # NJ touched
comm -12 /tmp/up.txt /tmp/nj.txt > /tmp/both.txt            # both — the risk set
# subtract the conflicted files (already reviewed in Phase 1)
```

For the whole risk set:

- **Marker-survival heuristic (first pass, cheap):** compare `NJ:` marker count in `$M^1:<file>` vs `$M:<file>`. A drop flags a silent loss. Zero drops is reassuring but **not sufficient**.
- **Marker survival ≠ logic survival.** A marker survives while upstream's auto-merged code routes around the override — a new upstream code path that special-cases what an NJ predicate excludes, or a new dedup that assumes a shape NJ's feature never produces. Only reading the merged logic catches the first; only exercising the feature catches the second. Once a regression is suspected, **mongosh (the stored message shape) and the network payload are first-line diagnosis tools.**
- **A reported symptom that matches a known pattern is the lead hypothesis.** When the user reports a regression whose signature matches an audit finding, a test collision, or a trap from this skill, test that match first.
- **Prioritize by upstream churn** — rank NJ-marked risk files by lines upstream changed (`git diff --numstat "$BASE" $M^2 -- <file>`); high churn ∩ behavioral override is the deepest risk.
- **Triage styling vs behavioral; deep-read only the behavioral.** A surviving CSS-only override is almost never silently neutralized; its marker surviving is enough. Concentrate on overrides that gate, exclude, redirect, transform, or short-circuit. The recurring checks: a commented-out *declaration* isn't still referenced downstream; an early-`return` short-circuit is still the live path; a dead-assignment override runs *after* upstream's computation; a predicate is still honored at its use site; a single chokepoint still funnels all of upstream's new code.
- **A new upstream preference for a behavior NJ hardcodes is a dead toggle.** When upstream ships a user setting for something NJ forces or suppresses in code, the settings row renders as a control that does nothing. Flag each one: gate the row, or retire the hardcode in favor of the preference — the user decides.
- **Tests are a core audit tool.** The test run surfaces casualties the marker heuristic can't. Run the suites (Phase 3) *as part of* the audit and classify each failure as a finding.
- **For a heavily NJ-owned file, a dropped upstream change may be fine** — but *flag what upstream changed* so the user can judge, and confirm upstream's non-UI *logic* changes landed live even when its UI changes to NJ-replaced regions were dropped.

Report findings grouped as *dropped NJ override*, *defeated NJ policy*, *dropped upstream change*, *convention violation* — most severe first. Surface, then fix on the user's go-ahead.

### Phase 3 — Verification pass: replicate CI locally

**Read what CI runs before replicating it** — `.github/workflows/{static-checks,frontend-review,backend-review}.yml`; grep for `pull_request:` and copy the exact commands. CI's changed set is **PR base to head**: `git diff --name-only origin/newjersey HEAD`, two-dot, so upstream's incoming files are in it. It is not the merge base and not the conflicts alone. `npm run static-checks -- --against origin/newjersey` reproduces the changed-set gates with CI's filters in one command; confirm `scripts/static-checks.mts` still exists first.

Run cheap deterministic gates first, tests last:

- **Open with a full dependency rebuild.** Packages consume each other's built `dist`, so a typecheck against stale `dist` throws hundreds of phantom errors in files you never touched, and **the dev app serves stale `dist` too** — a style edit in `packages/client` is invisible in the browser until the package is rebuilt, so never judge a package change visually before rebuilding. `npm run reinstall` is the default; it is long-running and wipes `node_modules`, so run it with a long timeout or hand it to the user (`! npm run reinstall`) and resume when its success line (`Don't worry, your data is safe :)`) appears. Rebuild a package again after editing its source. Import ordering and prettier need no `dist` and can run first.
- **`sort-imports` on the whole changed set, explicit paths.** Bare `sort-imports` rewrites the entire repo. Find offenders with `sort-imports:check`; fix with `sort-imports -- <files>`.
- **Typecheck every workspace**: `tsc --noEmit -p <pkg>/tsconfig.json` for the four packages, `cd client && tsc --noEmit`. Package tsconfigs exclude specs, so spec type errors surface only when the test runs.
- **ESLint the whole changed set with CI's flags.** NJ runs `--max-warnings=-1`, so only errors fail — don't chase warnings. macOS `xargs` needs `tr '\n' '\0' | xargs -0`.
- **Tests: `npm run test:api` and `npm run test:client` every merge.** `test:packages:*` and `test:config` fail independently; reach for them when the merge touched those workspaces. Name what ran and what was skipped.
- **Flakes: local↔CI divergence is the fingerprint.** A suite that fails in the full run but passes in isolation, or a failure set that *changes* across runs of identical code with 1–2 GB per-suite heap, is resource pressure, not a defect — even when upstream changed the file in this delta. Don't patch upstream flakes; note them and rerun. Integration suites needing live keys skip without them; that is expected.
- **Report what actually ran**: each gate with its command and result, and every check skipped or not runnable.

### Phase 4 — Post-merge review list: the human's agenda

Maintain this list *as you resolve*, in the state file, and print it at the end. Give every item a stable ID (`B7`) as a bold label, not a numbered list — Markdown renumbers, and the user answers by ID. Two tiers, keyed on NJ reachability:

- **Review** — reachable in NJ: behavior or UI a user hits, plus clunky merges whose functionality needs exercising. Cover loading, empty, success, failure, and restored-session where they apply. Learning and assessing new upstream features is part of the merge.
  - **Say exactly what to test, where, and how, in one line.** Name the surface in the user's words, not upstream's — an item the user can't locate is one they can't check, and "the chat header's ⋯ menu" and "a conversation's ⋯ menu in the sidebar" are different menus.
  - **Three things earn a Review item even when the merge looks mechanically clean:** an upstream change layered on top of a surviving NJ override (a visible change to an NJ-owned surface); a new upstream UI entry point that lands live in NJ (a hide/keep decision for the user or Product, since NJ hides many of its peers — say where it renders and what hiding costs); and structural rewiring that auto-merged around an NJ override (only exercising it proves the NJ behavior inside still works).
- **Noted (not reachable in NJ)** — new upstream features that are disabled or unwired in NJ's deployment. Record for awareness; nothing to exercise. When reachability is unclear, park under Review with "assess reachability first." **State how reachability was established** — a schema default plus an absent config key is an inference, not a confirmation.

**A Product-facing what's-new list is a third deliverable.** Upstream features that land reachable in NJ's build, each named in plain words as what changed for a person using the app, and each marked *confirmed in-app* or *inferred from code*. Cross-check reachability against NJ's config and the gating code before filing an item; a commit title is not enough. Write it into the state file.

### Phase 5 — Commit & conclude

- Commit the resolved merge as a **merge commit** with the default message. The pre-commit hook re-runs the lint/format gate Phase 3 already ran by hand, and on a large merge it can be killed by the volume of staged files, so `--no-verify` is justified once those checks are green outside the commit — for the merge commit and the follow-up fix commits alike.
- Land **post-merge fixes as a follow-up commit** on top. After that, `HEAD` is no longer the merge; re-derive by identity (Step 2) for any further audit.
- **A post-merge fix collides with tests exactly like conflict resolution does** — a clean-merge casualty fixed later can flip an upstream test that asserted the behavior you just changed; patch or skip it with an `// NJ:` note. **Any edit after a green run invalidates that run**: re-run the affected suite and re-check import sorting before committing.
- **Commit and push only on the user's go-ahead** — they often do both themselves. Before handing off, say in one line what is uncommitted and confirm every diverging line is tagged or back at parity.
- Once pushed, let CI run its full suite, including the sharded jobs that surface flakes local runs don't. Rerun a lone flaky failure before investigating it.
- **Close with the brief from the state file:** every pinned item with its state, every deferred decision still open, corrections to claims made earlier in the session, and the upstream PR candidates. Nothing the user asked to be reminded of may be missing.

## Post-merge cleanup (separate from the merge)

The merge preserves; cleanup reduces drift. The user may follow a merge with a cleanup pass on the same branch — normalizing eroded overrides, consolidating scattered ones, reverting divergence that no longer buys anything visible. That is the user's work, started on their say-so, landing as fixup commits after the merge commit. The merge's job is to notice the opportunities (the erosion flags, the review list, the retirement candidates) and hand them over, not to take them. When cleanup does run: reverting beats tagging where the visible benefit is nil, the same test-collision and re-run rules as Phase 5 apply, and every change is still either at parity or tagged.

## Maintaining this skill

Fold a lesson in as the rule, the reason, and at most one example in a clause. No case histories: the state file holds the incident, the skill holds what generalizes.

## Related references

- `README-NJ.md` → "Minimize Upstream Conflicts", "Merging Upstream Changes", "Contributing Upstream".
- `.github/workflows/nj-sync-upstream.yml` — the weekly sync action and its conflict-recovery instructions.
- `.github/workflows/{static-checks,frontend-review,backend-review}.yml` — the PR gates to replicate locally.
- Prefer contributing general-purpose fixes upstream first; code that lands upstream can't conflict with us later.
