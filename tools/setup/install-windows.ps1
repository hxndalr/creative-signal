# The Creative Signal - Windows setup (per user, no admin rights needed).
#   install-windows.ps1              install or update, then open the app
#   install-windows.ps1 -Quiet       install or update without opening anything (for scripted installs)
#   install-windows.ps1 -Uninstall   remove the app files, shortcuts and Apps & Features entry
# Learner progress lives in the browser, not in these files, so updating or uninstalling never touches it.
param([switch]$Quiet, [switch]$Uninstall)
$ErrorActionPreference = 'Stop'

$name      = 'Creative Signal'
$installTo = Join-Path $env:LOCALAPPDATA "Programs\$name"
$desktop   = [Environment]::GetFolderPath('Desktop')
$startMenu = Join-Path ([Environment]::GetFolderPath('Programs')) "$name.lnk"
$deskLink  = Join-Path $desktop "$name.lnk"
$regKey    = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\CreativeSignal'

function Say($msg) { Write-Host $msg }

if ($Uninstall) {
  foreach ($p in $deskLink, $startMenu) { if (Test-Path $p) { Remove-Item $p -Force } }
  if (Test-Path $regKey) { Remove-Item $regKey -Recurse -Force }
  if (Test-Path $installTo) {
    # This script may be running from inside the install folder, so remove it after we exit.
    Start-Process -WindowStyle Hidden cmd.exe -ArgumentList '/c', "timeout /t 2 >nul & rmdir /s /q `"$installTo`""
  }
  Say "$name was removed. Progress saved in the browser is kept; export a backup before clearing browser data."
  exit 0
}

$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$app  = Join-Path $here 'app'
if (-not (Test-Path (Join-Path $app 'index.html'))) { throw "Can't find the app next to this script ($app). Run the installer from the full setup folder." }

# Copy (or refresh) the app. Same folder every time, so the browser keeps seeing the same address and progress stays.
New-Item -ItemType Directory -Force $installTo | Out-Null
if (Test-Path "$installTo\app") { Remove-Item "$installTo\app" -Recurse -Force }
Copy-Item $app "$installTo\app" -Recurse
Copy-Item (Join-Path $here 'app-icon.ico') "$installTo\app-icon.ico" -Force
Copy-Item $MyInvocation.MyCommand.Path "$installTo\install-windows.ps1" -Force
Set-Content -Path "$installTo\Uninstall.cmd" -Encoding ASCII -Value "@powershell -NoProfile -ExecutionPolicy Bypass -File `"%~dp0install-windows.ps1`" -Uninstall`r`n@pause"

# Open in Microsoft Edge as its own app window (Edge ships with Windows 10/11). Always using the same browser keeps progress in one place.
$index = Join-Path $installTo 'app\index.html'
$url   = ([Uri]$index).AbsoluteUri
$edge  = @("${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe", "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe") | Where-Object { Test-Path $_ } | Select-Object -First 1

$shell = New-Object -ComObject WScript.Shell
foreach ($path in $deskLink, $startMenu) {
  $lnk = $shell.CreateShortcut($path)
  if ($edge) { $lnk.TargetPath = $edge; $lnk.Arguments = "--app=`"$url`"" } else { $lnk.TargetPath = $index }
  $lnk.WorkingDirectory = "$installTo\app"
  $lnk.IconLocation = "$installTo\app-icon.ico"
  $lnk.Description = "The Creative Signal: RS Hundal's AI Studio"
  $lnk.Save()
}

$version = ''
$sw = Get-Content "$installTo\app\sw.js" -Raw -ErrorAction SilentlyContinue
if ($sw -match 'const VERSION = "([^"]+)"') { $version = $Matches[1] }
New-Item -Path $regKey -Force | Out-Null
$props = @{
  DisplayName = "The Creative Signal: RS Hundal's AI Studio"; Publisher = 'Absolute Studios'; DisplayVersion = $version
  DisplayIcon = "$installTo\app-icon.ico"; InstallLocation = $installTo; NoModify = 1; NoRepair = 1
  UninstallString = "powershell.exe -NoProfile -ExecutionPolicy Bypass -File `"$installTo\install-windows.ps1`" -Uninstall"
}
foreach ($k in $props.Keys) { Set-ItemProperty -Path $regKey -Name $k -Value $props[$k] }

Say "$name $version is installed in $installTo"
Say "Open it from the Desktop or Start menu shortcut '$name'."
if (-not $Quiet) {
  if ($edge) { Start-Process $edge "--app=`"$url`"" } else { Start-Process $index }
}
