import { useEffect, useState } from 'react'
import baked from '../data/repos.json'

const norm = (r) => ({
  name: r.name,
  description: r.description,
  language: r.language,
  stars: r.stars ?? r.stargazers_count ?? 0,
  forks: r.forks ?? r.forks_count ?? 0,
  url: r.url ?? r.html_url,
  homepage: r.homepage || null,
  topics: r.topics || [],
  updated: (r.updated || r.updated_at || '').slice(0, 10),
  created: (r.created || r.created_at || '').slice(0, 10),
  fork: r.fork ?? false,
  archived: r.archived ?? false,
})

const rank = (a, b) => {
  if (a.fork !== b.fork) return a.fork ? 1 : -1
  if (b.stars !== a.stars) return b.stars - a.stars
  return (b.updated || '').localeCompare(a.updated || '')
}

// Live-fetch from GitHub on mount; fall back to the baked snapshot on any error
// (rate limits, offline). Always returns something to render.
export function useRepos() {
  const [repos, setRepos] = useState(() => baked.map(norm).sort(rank))
  const [live, setLive] = useState(false)

  useEffect(() => {
    let alive = true
    fetch('https://api.github.com/users/AjeetSingh21/repos?per_page=100&sort=updated', {
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        if (!alive || !Array.isArray(data) || !data.length) return
        setRepos(data.map(norm).sort(rank))
        setLive(true)
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  return { repos, live }
}
