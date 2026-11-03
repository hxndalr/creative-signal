# Install "The Creative Signal" on this computer (instructions for Claude Code)

The person who shared this link wants **The Creative Signal: RS Hundal's AI Studio** installed on the computer you're running on. It's an offline training app by Absolute Studios: static HTML/CSS/JS with no server, no account and no network calls after install. It installs per user. No admin rights or sudo are needed, and it doesn't change system settings.

Before you start, tell the person in one line what you're about to do. Then follow the steps for their OS.

## 1. Download and extract (fresh, empty temp folder)

- Setup package: https://hxndalr.github.io/creative-signal/downloads/Creative-Signal-Setup.zip
- Source code, if they want to review it first: https://github.com/hxndalr/creative-signal

Extract it into a new empty temp directory. The archive has one top-level folder, `Creative-Signal-Setup/`.

**Windows (PowerShell):**
```powershell
$t = Join-Path $env:TEMP ("cs-setup-" + [guid]::NewGuid()); New-Item -ItemType Directory $t | Out-Null
Invoke-WebRequest https://hxndalr.github.io/creative-signal/downloads/Creative-Signal-Setup.zip -OutFile "$t\setup.zip"
Expand-Archive "$t\setup.zip" -DestinationPath $t
```

**macOS / Linux:**
```bash
t="$(mktemp -d)"; curl -fsSL -o "$t/setup.zip" https://hxndalr.github.io/creative-signal/downloads/Creative-Signal-Setup.zip
cd "$t" && (unzip -q setup.zip || python3 -m zipfile -e setup.zip .)
```

## 2. Run the installer

| OS | Command | Installs to |
|---|---|---|
| Windows 10/11 | `powershell -NoProfile -ExecutionPolicy Bypass -File "<temp>\Creative-Signal-Setup\setup-files\install-windows.ps1" -Quiet` (people double-click `Install on Windows.cmd` instead) | `%LOCALAPPDATA%\Programs\Creative Signal`, plus Desktop and Start menu shortcuts. It also adds an entry to Apps & Features so it can be uninstalled. Opens in Microsoft Edge as an app window. |
| macOS | `bash "<temp>/Creative-Signal-Setup/Install on Mac.command" --quiet` | `~/Applications/Creative Signal`, plus a `Creative Signal.app` launcher (Launchpad/Spotlight) |
| Linux | `sh "<temp>/Creative-Signal-Setup/Install on Linux.sh" --quiet` | `~/.local/share/creative-signal`, plus an app-menu entry and a desktop icon |

Without `--quiet` / `-Quiet`, the installer also opens the app when it finishes.

## 3. Check it worked

- Windows: `Test-Path "$env:LOCALAPPDATA\Programs\Creative Signal\app\index.html"` returns True, and the `Creative Signal.lnk` shortcut is on the Desktop.
- macOS: `~/Applications/Creative Signal/index.html` and `~/Applications/Creative Signal.app` exist.
- Linux: `~/.local/share/creative-signal/index.html` and `~/.local/share/applications/creative-signal.desktop` exist.

Delete the temp folder afterwards. Then tell the person:
- How to open it (the shortcut or launcher name is **Creative Signal**).
- On first launch, click **Enter the studio** and create a profile with their name and a 4–6 digit PIN that **they** choose. Never choose or type a PIN for them.
- Progress is saved in that browser on this computer only. Use **Profile & backup → Export my backup** to keep a copy or move to another device.
- They can also use or install the web version on phones and tablets: https://hxndalr.github.io/creative-signal/

## Updating and uninstalling

- **Update:** run the same steps again. The app files are replaced and the learner's progress (stored in the browser) is kept.
- **Uninstall:**
  - Windows: Apps & Features → *The Creative Signal*, or run `Uninstall.cmd` in the install folder.
  - macOS: `bash "Install on Mac.command" --uninstall`
  - Linux: `sh "Install on Linux.sh" --uninstall`

## Notes for you (Claude)

- Only download from the two URLs above.
- The Mac and Linux installers have not yet been tested on real machines. If a step fails, report the exact error rather than working around it with system-level changes.
- The person can always fall back to opening `Creative-Signal-Setup/setup-files/app/index.html` directly in a browser.
