#!/bin/bash
# The Creative Signal - macOS setup (per user, no admin password needed).
#   Double-click this file, or run:  bash "Install on Mac.command" [--quiet | --uninstall]
# Learner progress lives in the browser, not in these files, so updating or uninstalling never touches it.
set -e
NAME="Creative Signal"
DEST="$HOME/Applications/$NAME"
LAUNCHER="$HOME/Applications/$NAME.app"
HERE="$(cd "$(dirname "$0")" && pwd)"

if [ "$1" = "--uninstall" ]; then
  rm -rf "$DEST" "$LAUNCHER"
  echo "$NAME was removed. Progress saved in the browser is kept."
  exit 0
fi

[ -f "$HERE/setup-files/app/index.html" ] || { echo "Can't find setup-files/app next to this script. Use the full setup folder."; exit 1; }

mkdir -p "$HOME/Applications"
rm -rf "$DEST"
cp -R "$HERE/setup-files/app" "$DEST"
xattr -dr com.apple.quarantine "$DEST" 2>/dev/null || true

# A small launcher app in ~/Applications (shows in Launchpad and Spotlight) that opens the course in the default browser.
rm -rf "$LAUNCHER"
osacompile -o "$LAUNCHER" -e "do shell script \"open \" & quoted form of \"$DEST/index.html\""
if command -v sips >/dev/null; then
  sips -s format icns "$DEST/assets/brand/icons/icon-512.png" --out "$LAUNCHER/Contents/Resources/applet.icns" >/dev/null 2>&1 || true
  touch "$LAUNCHER"
fi

echo "$NAME is installed in $DEST"
echo "Open it from Launchpad, Spotlight or ~/Applications: '$NAME'. Use the same browser every time so your progress is there."
[ "$1" = "--quiet" ] || open "$LAUNCHER"
