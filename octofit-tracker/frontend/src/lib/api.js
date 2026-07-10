// VITE_CODESPACE_NAME must be defined in .env.local for Codespaces.
// See octofit-tracker/frontend/.env.local for instructions.
//
// When set, the API is reached at:
//   https://<VITE_CODESPACE_NAME>-8000.app.github.dev/api/
// When unset (or empty), the app falls back to http://localhost:8000/api/
const codespaceName = import.meta.env.VITE_CODESPACE_NAME || ''

const apiHost =
  codespaceName && codespaceName !== 'undefined'
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000'

export const apiBaseUrl = `${apiHost}/api`

// True when the app is running in a Codespace with the env var configured.
export const isCodespace = Boolean(
  codespaceName && codespaceName !== 'undefined'
)

/**
 * Normalise API responses that may be:
 *  - a plain array
 *  - { items: [...] }  (paginated)
 *  - { results: [...] } (DRF-style paginated)
 */
function normalizeItems(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  return []
}

export async function fetchCollection(path) {
  const response = await fetch(`${apiBaseUrl}/${path}/`)

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} — ${response.statusText}`)
  }

  const payload = await response.json()
  return {
    items: normalizeItems(payload),
    raw: payload,
  }
}
