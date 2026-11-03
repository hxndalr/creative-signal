/* Local-only storage. Everything is kept in this browser's localStorage on this computer.
   Nothing is sent anywhere. */
(function () {
  const KEY = 'rsh-levelup.v1';
  const APP = 'rs-hundal-level-up';
  const VERSION = 1;

  function uid(prefix) {
    return (prefix || 'id') + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
  }

  function blankProfile(name) {
    const now = new Date().toISOString();
    return {
      id: uid('stu'), name: name, createdAt: now, updatedAt: now,
      lessons: {}, activities: {}, exercises: {}, quizzes: {}, skills: {}, levelsDone: {},
      briefs: [], milestones: {}, reflections: [], library: [], portfolio: [],
      capstone: { milestones: {}, rubric: {}, notes: '' },
      checklist: {}, portfolioMilestones: {}, unlockAll: false, lastRoute: ''
    };
  }

  /* Fill any missing keys so older/imported profiles keep working. */
  function normalise(p) {
    const base = blankProfile(p.name || 'Student');
    for (const k of Object.keys(base)) if (p[k] === undefined) p[k] = base[k];
    if (!p.capstone.milestones) p.capstone.milestones = {};
    if (!p.capstone.rubric) p.capstone.rubric = {};
    return p;
  }

  let available = true;
  let state = { profiles: {}, admin: null };
  const SESSION = 'rsh-levelup.session';
  /* Admin unlock lives ONLY in memory: a reload, closing the tab, 15 idle minutes,
     a student signing in or an explicit Log Out all end it. */
  const ADMIN_IDLE_MS = 15 * 60 * 1000;
  let adminUntil = 0;

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s && typeof s.profiles === 'object') state = s;
      }
      delete state.activeId; // sessions now live in sessionStorage
      for (const id of Object.keys(state.profiles)) normalise(state.profiles[id]);
    } catch (e) {
      available = false;
    }
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      return true;
    } catch (e) {
      available = false;
      return false;
    }
  }

  function sess(key, value) {
    try {
      if (value === undefined) return sessionStorage.getItem(key);
      if (value === null) sessionStorage.removeItem(key); else sessionStorage.setItem(key, value);
    } catch (e) { /* session storage blocked: user signs in again after reload */ }
    return null;
  }

  /* PINs are stored as salted SHA-256 hashes. This keeps classmates out of each other's profiles;
     it is not strong security against someone with access to the browser's data tools. */
  async function hashPin(pin, salt) {
    const text = salt + ':' + pin;
    if (window.crypto && crypto.subtle) {
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
    let h1 = 0x811c9dc5, h2 = 0x01000193; // fallback where WebCrypto is unavailable
    for (let r = 0; r < 2000; r++) for (let i = 0; i < text.length; i++) {
      h1 = Math.imul(h1 ^ text.charCodeAt(i), 16777619) >>> 0;
      h2 = Math.imul(h2 ^ h1, 2246822519) >>> 0;
    }
    return 'f-' + h1.toString(16) + h2.toString(16);
  }
  async function makePin(pin) {
    const salt = Math.random().toString(36).slice(2) + Date.now().toString(36);
    return { salt, hash: await hashPin(pin, salt) };
  }
  function pinError(pin) {
    return /^\d{4,6}$/.test(String(pin || '')) ? '' : 'A PIN must be 4 to 6 digits (numbers only).';
  }

  function validProfile(p) {
    return p && typeof p === 'object' && typeof p.id === 'string' && typeof p.name === 'string' && p.name.trim() &&
      ['lessons', 'exercises', 'quizzes', 'skills'].every(k => p[k] === undefined || (typeof p[k] === 'object' && !Array.isArray(p[k]))) &&
      ['briefs', 'library', 'portfolio', 'reflections'].every(k => p[k] === undefined || Array.isArray(p[k]));
  }

  const Store = {
    load, save,
    get available() { return available; },
    uid,
    list() {
      return Object.values(state.profiles).sort((a, b) => a.name.localeCompare(b.name));
    },
    get(id) { return state.profiles[id] || null; },
    active() { const id = sess(SESSION); return id ? state.profiles[id] || null : null; },
    setActive(id) { adminUntil = 0; sess(SESSION, id); },
    signOut() { sess(SESSION, null); },
    pinError,
    hasPin(id) { const p = state.profiles[id]; return !!(p && p.pin && p.pin.hash); },
    async checkPin(id, pin) {
      const p = state.profiles[id];
      if (!p || !p.pin) return false;
      return (await hashPin(pin, p.pin.salt)) === p.pin.hash;
    },
    async setPin(id, pin) {
      const err = pinError(pin);
      if (err) throw new Error(err);
      state.profiles[id].pin = await makePin(pin);
      save();
    },
    async create(name, pin) {
      const clean = String(name || '').trim().slice(0, 60);
      if (!clean) throw new Error('Please enter a name.');
      if (this.list().some(p => p.name.toLowerCase() === clean.toLowerCase())) {
        throw new Error('A profile called "' + clean + '" already exists on this computer. Sign in to it instead, or use a different name.');
      }
      const err = pinError(pin);
      if (err) throw new Error(err);
      const p = blankProfile(clean);
      p.pin = await makePin(pin);
      state.profiles[p.id] = p;
      save();
      adminUntil = 0;
      sess(SESSION, p.id);
      return p;
    },
    remove(id) {
      delete state.profiles[id];
      if (sess(SESSION) === id) sess(SESSION, null);
      save();
    },
    /* Admin (instructor) PIN */
    hasAdmin() { return !!(state.admin && state.admin.hash); },
    isAdmin() { return this.hasAdmin() && Date.now() < adminUntil; },
    touchAdmin() { if (this.isAdmin()) adminUntil = Date.now() + ADMIN_IDLE_MS; },
    adminIdleMs: ADMIN_IDLE_MS,
    async setAdminPin(pin) {
      const err = pinError(pin);
      if (err) throw new Error(err);
      state.admin = await makePin(pin);
      save();
      sess(SESSION, null);
      adminUntil = Date.now() + ADMIN_IDLE_MS;
    },
    async adminSignIn(pin) {
      if (!this.hasAdmin()) return false;
      const ok = (await hashPin(pin, state.admin.salt)) === state.admin.hash;
      if (ok) { sess(SESSION, null); adminUntil = Date.now() + ADMIN_IDLE_MS; }
      return ok;
    },
    adminSignOut() { adminUntil = 0; },
    /* Mutate the active profile and persist. */
    update(fn) {
      const p = this.active();
      if (!p) return false;
      fn(p);
      p.updatedAt = new Date().toISOString();
      return save();
    },

    exportData(ids) {
      const profiles = (ids || Object.keys(state.profiles)).map(id => state.profiles[id]).filter(Boolean);
      return JSON.stringify({ app: APP, version: VERSION, exportedAt: new Date().toISOString(), profiles }, null, 2);
    },

    /* Parse + validate a backup. Throws an Error with a readable message on any problem. */
    parseBackup(text) {
      let data;
      try { data = JSON.parse(text); } catch (e) {
        throw new Error('This file is not valid JSON, so it cannot be a Level Up backup. Choose the .json file you exported from this app.');
      }
      if (!data || data.app !== APP) {
        throw new Error('This JSON file was not exported from The Creative Signal (RS Hundal\'s AI Studio) (the "app" marker is missing or different).');
      }
      if (typeof data.version !== 'number' || data.version > VERSION) {
        throw new Error('This backup comes from a newer or unknown version of the app (version ' + data.version + '). Update the app first.');
      }
      if (!Array.isArray(data.profiles) || data.profiles.length === 0) {
        throw new Error('The backup file does not contain any student profiles.');
      }
      const bad = data.profiles.filter(p => !validProfile(p));
      if (bad.length) throw new Error('The backup is damaged: ' + bad.length + ' profile(s) are missing required information (id, name or progress data).');
      return data.profiles;
    },

    /* mode: 'replace' overwrites profiles with the same id; 'copy' imports clashing ones as new copies. */
    importProfiles(profiles, mode) {
      const result = { added: 0, replaced: 0, copied: 0 };
      for (const src of profiles) {
        const p = normalise(JSON.parse(JSON.stringify(src)));
        if (state.profiles[p.id]) {
          if (mode === 'copy') {
            p.id = uid('stu');
            p.name = p.name + ' (imported)';
            result.copied++;
          } else {
            result.replaced++;
          }
        } else {
          result.added++;
        }
        state.profiles[p.id] = p;
      }
      save();
      return result;
    },
    clashes(profiles) {
      return profiles.filter(p => state.profiles[p.id]).map(p => p.name);
    }
  };

  window.Store = Store;
})();
