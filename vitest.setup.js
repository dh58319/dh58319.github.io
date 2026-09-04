import '@testing-library/jest-dom/vitest'

// jsdom implements neither of these, and both are read during render:
// ThemeToggle asks for the colour-scheme preference, and useMediaQuery drives
// the navigation's collapsed state.
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })
}

// This jsdom build exposes no Web Storage, and Node's own `localStorage` global
// throws unless the process was started with --localstorage-file. Provide a
// plain in-memory implementation so components that persist preferences behave
// the way they do in a browser.
if (!window.localStorage) {
  const store = new Map()
  const localStorage = {
    getItem: (key) => (store.has(String(key)) ? store.get(String(key)) : null),
    setItem: (key, value) => store.set(String(key), String(value)),
    removeItem: (key) => store.delete(String(key)),
    clear: () => store.clear(),
    key: (i) => [...store.keys()][i] ?? null,
    get length() {
      return store.size
    },
  }
  // Both targets need defineProperty: Node exposes `localStorage` as a
  // getter-only accessor, so a plain assignment throws.
  for (const target of new Set([window, globalThis])) {
    Object.defineProperty(target, 'localStorage', {
      value: localStorage,
      configurable: true,
      writable: true,
    })
  }
}
