function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { meta: {}, content: raw }

  const meta = {}
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let val = line.slice(idx + 1).trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    meta[key] = val
  }

  return { meta, content: match[2] }
}

const modules = import.meta.glob('/content/blog/*.md', { eager: true, query: '?raw', import: 'default' })

const posts = Object.entries(modules)
  .map(([path, raw]) => {
    const { meta, content } = parseFrontmatter(raw)
    const filename = path.split('/').pop().replace('.md', '')
    const slug = meta.slug || filename
    const wordCount = content.trim().split(/\s+/).length
    const readTime = Math.max(1, Math.round(wordCount / 250))

    return {
      slug,
      title: meta.title || filename,
      date: meta.date || '',
      description: meta.description || '',
      component: meta.component || null,
      readTime,
      content,
    }
  })
  .sort((a, b) => (b.date > a.date ? 1 : -1))

export function getAllPosts() {
  return posts
}

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug) || null
}
