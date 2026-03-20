param(
  [switch]$IncludeBackendTests,
  [switch]$IncludeFrontendBuild
)

$ErrorActionPreference = 'Continue'

function Invoke-Step {
  param(
    [string]$Name,
    [string]$Command,
    [string]$Workdir
  )

  Push-Location $Workdir
  $sw = [System.Diagnostics.Stopwatch]::StartNew()
  $output = & cmd /c $Command 2>&1
  $exitCode = $LASTEXITCODE
  $sw.Stop()
  Pop-Location

  return [PSCustomObject]@{
    Name = $Name
    Command = $Command
    Workdir = $Workdir
    ExitCode = $exitCode
    DurationSec = [math]::Round($sw.Elapsed.TotalSeconds, 2)
    Output = ($output -join "`n")
  }
}

$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$backRoot = Resolve-Path (Join-Path $scriptRoot '..')
$frontRoot = Resolve-Path (Join-Path $backRoot '..\front')
$reportDir = Join-Path $backRoot 'logs\refactor-baseline'
$timestamp = Get-Date -Format 'yyyyMMdd_HHmmss'
$reportPath = Join-Path $reportDir "step1_baseline_$timestamp.md"

New-Item -ItemType Directory -Force -Path $reportDir | Out-Null

$results = @()
$results += Invoke-Step -Name 'backend_build' -Command 'npm run build' -Workdir $backRoot

if ($IncludeBackendTests) {
  $results += Invoke-Step -Name 'backend_test' -Command 'npm test' -Workdir $backRoot
}

$eslintConfig = Get-ChildItem -Path $frontRoot -File -Name '.eslintrc*' -ErrorAction SilentlyContinue
if ($eslintConfig) {
  $results += Invoke-Step -Name 'frontend_lint' -Command 'npm run lint' -Workdir $frontRoot
} else {
  $results += [PSCustomObject]@{
    Name = 'frontend_lint'
    Command = 'npm run lint'
    Workdir = $frontRoot
    ExitCode = -1
    DurationSec = 0
    Output = 'Skipped: no .eslintrc* file detected (Next lint setup prompt expected).'
  }
}

if ($IncludeFrontendBuild) {
  $results += Invoke-Step -Name 'frontend_build_no_lint' -Command 'npm run build -- --no-lint' -Workdir $frontRoot
}

$lines = @()
$lines += '# Step 1 Baseline Report'
$lines += ''
$lines += "- Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
$lines += "- Backend path: $backRoot"
$lines += "- Frontend path: $frontRoot"
$lines += ''

foreach ($r in $results) {
  $status = if ($r.ExitCode -eq 0) { 'PASS' } elseif ($r.ExitCode -eq -1) { 'SKIPPED' } else { 'FAIL' }
  $lines += "## $($r.Name) [$status]"
  $lines += ('- Command: `' + $r.Command + '`')
  $lines += "- Exit code: $($r.ExitCode)"
  $lines += "- Duration (sec): $($r.DurationSec)"
  $lines += ''
  $lines += '```text'
  $lines += $r.Output
  $lines += '```'
  $lines += ''
}

Set-Content -Path $reportPath -Value ($lines -join "`n") -Encoding UTF8
Write-Output "Baseline report generated at: $reportPath"
