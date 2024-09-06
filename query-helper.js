export function hasQueryInUrl(url, domain = window.location.origin) {
  const newUrl = new URL(url, domain)

  return !!newUrl.search
}

export function getQuery({ url = window.location.href, name }) {
  const searchParams = (new URL(url)).searchParams;

  return searchParams.get(name)
}

export function setQuery({ url = window.location.href, params = {}, historyReplace = true }) {
  const newUrl = new URL(url);
  const searchParams = newUrl.searchParams;

  for (const key in params) {
    const value = params[key]

    searchParams.set(key, value)
  }

  const resultUrl = newUrl.toString()

  if (historyReplace) {
    window.history.replaceState(null, null, resultUrl);
  }

  return resultUrl
}

export function deleteQuery({ url = window.location.href, name, historyReplace = true }) {
  const newUrl = new URL(url)
  newUrl.searchParams.delete(name)

  const resultUrl = newUrl.toString()

  if (historyReplace) {
    window.history.replaceState(null, null, resultUrl);
  }

  return resultUrl
}
