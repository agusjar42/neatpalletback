# Step 1 Runbook - Baseline, Backup and Rollback

## Objective
Create a safe pre-refactor baseline before applying Empresa-centric changes.

## Pre-checks
- Confirm backend and frontend repos are on the target branch.
- Confirm no pending DB migration is running.
- Confirm application version or tag to rollback to.

## Backup (required)

### Database dump (MySQL)
```bash
mysqldump --single-transaction --routines --triggers -h <DB_HOST> -u <DB_USER> -p neatpallet > neatpallet_pre_refactor_YYYYMMDD.sql
```

### Environment backup
- Save `.env` from backend and frontend in secure storage.
- Save current deployed artifact references (image tag or commit SHA).

## Baseline execution
Run from backend repo root:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\refactor-step1-baseline.ps1 -IncludeBackendTests
```

Optional (slow):

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\refactor-step1-baseline.ps1 -IncludeBackendTests -IncludeFrontendBuild
```

Run frontend route smoke file-existence check:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\refactor-step1-smoke.ps1
```

## Evidence
- Baseline reports are written to `back/logs/refactor-baseline/`.
- Attach report file to the PR as migration safety evidence.

## Rollback strategy
1. Stop new deployment.
2. Restore previous backend and frontend artifact version.
3. Restore DB dump created in this step.
4. Re-run smoke checks and verify login and core CRUD routes.
