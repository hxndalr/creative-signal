/* Build the portable app. No dependencies - needs Node 18+.
     node tools/build.mjs          -> dist/ (what GitHub Pages serves)
     node tools/build.mjs --zip    -> dist/ + release/Creative-Signal-offline-v<version>.zip
   Only app files are copied: desktop.ini, start.cmd, docs/, tools/ and anything git-ignored stay behind. */
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const SITE = 'https://hxndalr.github.io/creative-signal/';
const INCLUDE = ['index.html', 'manifest.webmanifest', 'sw.js', 'LEARNER-GUIDE.html', 'assets', 'content', 'css', 'js'];
const SKIP = /(^|[\\/])(desktop\.ini|Thumbs\.db|\.DS_Store)$|\.ico$/i;

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist);
for (const item of INCLUDE) {
  if (!existsSync(join(root, item))) throw new Error('Missing ' + item);
  cpSync(join(root, item), join(dist, item), { recursive: true, filter: src => !SKIP.test(src) });
}

function walk(dir) {
  return readdirSync(dir).flatMap(n => statSync(join(dir, n)).isDirectory() ? walk(join(dir, n)) : [join(dir, n)]);
}
const files = walk(dist).filter(f => !f.endsWith(sep + 'sw.js')).sort();

// Version = package version + content hash, so any edit reaches learners as an update.
const hash = createHash('sha256');
for (const f of [...files, join(dist, 'sw.js')]) hash.update(relative(dist, f)).update(readFileSync(f));
const version = pkg.version + '-' + hash.digest('hex').slice(0, 8);

const indexPath = join(dist, 'index.html');
writeFileSync(indexPath, readFileSync(indexPath, 'utf8').replace(/\?v=[\w.-]+/g, '?v=' + version));

const precache = files.map(f => relative(dist, f).split(sep).join('/'));
const swPath = join(dist, 'sw.js');
const sw = readFileSync(swPath, 'utf8')
  .replace(/const VERSION = '[^']*';/, 'const VERSION = ' + JSON.stringify(version) + ';')
  .replace(/const PRECACHE = \[\];/, 'const PRECACHE = ' + JSON.stringify(precache) + ';');
if (!sw.includes(version) || sw.includes('const PRECACHE = [];')) throw new Error('sw.js placeholders not found');
writeFileSync(swPath, sw);
writeFileSync(join(dist, '.nojekyll'), '');
console.log('Built dist/ - version ' + version + ', ' + precache.length + ' files precached');

if (process.argv.includes('--zip')) {
  const release = join(root, 'release');
  const stage = join(release, 'stage');
  const folder = 'Creative-Signal';
  rmSync(stage, { recursive: true, force: true });
  mkdirSync(join(stage, folder), { recursive: true });
  cpSync(dist, join(stage, folder), { recursive: true, filter: src => !src.endsWith('.nojekyll') });
  writeFileSync(join(stage, folder, 'START HERE.txt'),
    'The Creative Signal: RS Hundal\'s AI Studio (offline copy, version ' + version + ')\r\n\r\n' +
    '1. Unzip first, and keep this whole folder together (do not move index.html out of it).\r\n' +
    '2. Double-click index.html. It opens in your web browser (Chrome, Edge, Safari or Firefox).\r\n' +
    '3. Click "Enter the studio" and create your profile with your name and a 4-6 digit PIN.\r\n\r\n' +
    'Full instructions, including backups and updates: open LEARNER-GUIDE.html.\r\n');
  const zip = join(release, 'Creative-Signal-offline-v' + pkg.version + '.zip');
  rmSync(zip, { force: true });
  if (process.platform === 'linux') execFileSync('zip', ['-rq', zip, folder], { cwd: stage });
  else {
    // bsdtar (built into Windows 10+ and macOS) writes .zip; on Windows call it by path so Git Bash's GNU tar isn't picked up
    const tar = process.platform === 'win32' ? join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'tar.exe') : 'tar';
    execFileSync(tar, ['-a', '-c', '-f', relative(stage, zip), folder], { cwd: stage });
  }
  rmSync(stage, { recursive: true, force: true });
  console.log('Packed ' + relative(root, zip) + ' (' + Math.round(statSync(zip).size / 1024) + ' KB)');

  /* Setup package: installers for Windows/macOS/Linux around the same app files.
     release/Creative-Signal-Setup/ is the folder to copy to a drive; its zip is also published at
     <site>/downloads/Creative-Signal-Setup.zip for INSTALL-WITH-CLAUDE.md. */
  const setupName = 'Creative-Signal-Setup';
  const setup = join(release, setupName);
  const src = join(root, 'tools', 'setup');
  rmSync(setup, { recursive: true, force: true });
  mkdirSync(join(setup, 'setup-files'), { recursive: true });
  cpSync(dist, join(setup, 'setup-files', 'app'), { recursive: true, filter: s => !s.endsWith('.nojekyll') });
  cpSync(join(root, 'assets', 'brand', 'app-icon.ico'), join(setup, 'setup-files', 'app-icon.ico'));
  const text = (file, eol) => readFileSync(join(src, file), 'utf8').replace(/\r?\n/g, eol);
  writeFileSync(join(setup, 'setup-files', 'install-windows.ps1'), text('install-windows.ps1', '\r\n'));
  writeFileSync(join(setup, 'Install on Windows.cmd'), text('Install on Windows.cmd', '\r\n'));
  writeFileSync(join(setup, 'Install on Mac.command'), text('Install on Mac.command', '\n'), { mode: 0o755 });
  writeFileSync(join(setup, 'Install on Linux.sh'), text('Install on Linux.sh', '\n'), { mode: 0o755 });
  cpSync(join(root, 'LEARNER-GUIDE.html'), join(setup, 'LEARNER-GUIDE.html'));
  writeFileSync(join(setup, 'Open the online version.url'), '[InternetShortcut]\r\nURL=' + SITE + '\r\n');
  writeFileSync(join(setup, 'START HERE.txt'), [
    "The Creative Signal: RS Hundal's AI Studio - setup (version " + version + ')',
    '',
    'INSTALL ON THIS COMPUTER (no admin rights needed):',
    '  Windows : double-click "Install on Windows.cmd"',
    '  Mac     : double-click "Install on Mac.command"  (if macOS blocks it: right-click > Open)',
    '  Linux   : run   sh "Install on Linux.sh"',
    'The app is copied to this computer and gets a "Creative Signal" shortcut. Run the installer again to update;',
    'progress is kept. Each installer also takes --uninstall (Windows: Apps & Features).',
    '',
    'PHONES AND TABLETS: open ' + SITE + ' and install it from the browser (see LEARNER-GUIDE.html).',
    'JUST TRY IT: open setup-files/app/index.html in a browser.',
    ''
  ].join('\r\n'));
  const setupZip = join(release, setupName + '.zip');
  rmSync(setupZip, { force: true });
  if (process.platform === 'linux') execFileSync('zip', ['-rq', setupZip, setupName], { cwd: release });
  else {
    const tar = process.platform === 'win32' ? join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'tar.exe') : 'tar';
    execFileSync(tar, ['-a', '-c', '-f', setupName + '.zip', setupName], { cwd: release });
  }
  // Published with the site (after the precache list was written, so it isn't cached on every device).
  mkdirSync(join(dist, 'downloads'), { recursive: true });
  cpSync(setupZip, join(dist, 'downloads', setupName + '.zip'));
  cpSync(join(root, 'INSTALL-WITH-CLAUDE.md'), join(dist, 'INSTALL-WITH-CLAUDE.md'));
  console.log('Packed release/' + setupName + '/ and ' + setupName + '.zip (' + Math.round(statSync(setupZip).size / 1024) + ' KB), copied to dist/downloads/');
}
