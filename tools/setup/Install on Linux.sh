#!/bin/sh
# The Creative Signal - Linux setup (per user, no sudo needed).
#   sh "Install on Linux.sh" [--quiet | --uninstall]
# Learner progress lives in the browser, not in these files, so updating or uninstalling never touches it.
set -e
DEST="${XDG_DATA_HOME:-$HOME/.local/share}/creative-signal"
APPS="${XDG_DATA_HOME:-$HOME/.local/share}/applications"
ENTRY="$APPS/creative-signal.desktop"
DESKTOP_DIR="$(xdg-user-dir DESKTOP 2>/dev/null || echo "$HOME/Desktop")"
HERE="$(cd "$(dirname "$0")" && pwd)"

if [ "$1" = "--uninstall" ]; then
  rm -rf "$DEST" "$ENTRY" "$DESKTOP_DIR/creative-signal.desktop"
  echo "Creative Signal was removed. Progress saved in the browser is kept."
  exit 0
fi

[ -f "$HERE/setup-files/app/index.html" ] || { echo "Can't find setup-files/app next to this script. Use the full setup folder."; exit 1; }

rm -rf "$DEST"
mkdir -p "$DEST" "$APPS"
cp -R "$HERE/setup-files/app/." "$DEST/"

cat > "$ENTRY" <<EOF
[Desktop Entry]
Type=Application
Name=Creative Signal
Comment=The Creative Signal: RS Hundal's AI Studio
Exec=xdg-open "$DEST/index.html"
Icon=$DEST/assets/brand/icons/icon-512.png
Categories=Education;
Terminal=false
EOF
chmod +x "$ENTRY"
if [ -d "$DESKTOP_DIR" ]; then
  cp "$ENTRY" "$DESKTOP_DIR/creative-signal.desktop"
  chmod +x "$DESKTOP_DIR/creative-signal.desktop"
  gio set "$DESKTOP_DIR/creative-signal.desktop" metadata::trusted true 2>/dev/null || true
fi
command -v update-desktop-database >/dev/null && update-desktop-database "$APPS" 2>/dev/null || true

echo "Creative Signal is installed in $DEST"
echo "Open it from your app menu or desktop: 'Creative Signal'. Use the same browser every time so your progress is there."
[ "$1" = "--quiet" ] || xdg-open "$DEST/index.html" >/dev/null 2>&1 &
