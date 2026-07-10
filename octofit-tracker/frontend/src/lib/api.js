const codespaceName = import.meta.env.VITE_CODESPACE_NAME

const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export const apiBaseUrl = `${apiHost}/api`

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
    throw new Error(`Request failed: ${response.status}`)
  }

  const payload = await response.json()
  return {
    items: normalizeItems(payload),
    raw: payload,
  }
}
