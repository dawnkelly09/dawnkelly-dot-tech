import { Link } from 'react-router-dom'
import { getAllPosts } from '../data/blog'

export default function Blog() {
  const posts = getAllPosts()

  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <div className="text-terminal-green-dim text-xs">$ ls ~/blog/</div>
        <h1 className="text-xl text-terminal-green text-glow font-bold">Blog</h1>
      </section>

      {posts.length === 0 ? (
        <>
          <div className="border border-terminal-gray p-6 text-center space-y-3">
            <p className="text-terminal-green-dim text-sm">
              $ find ~/blog -name "*.md" | wc -l
            </p>
            <p className="text-terminal-green text-lg font-bold">0</p>
            <p className="text-terminal-green text-sm">
              Writing is on the way. Check back soon.
            </p>
          </div>

          <div className="space-y-2 text-sm text-terminal-green-dim">
            <p>Upcoming topics:</p>
            <ul className="space-y-1">
              <li><span className="text-terminal-green-dim">├─</span> <span className="text-terminal-green">Agents are documentation users too</span></li>
              <li><span className="text-terminal-green-dim">├─</span> <span className="text-terminal-green">The resolve_md approach to LLM-ready docs</span></li>
              <li><span className="text-terminal-green-dim">└─</span> <span className="text-terminal-green">Documentation engineering as a discipline</span></li>
            </ul>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="block border border-terminal-gray p-4 hover:border-terminal-green-50 transition-colors group"
            >
              <h2 className="text-terminal-green font-bold text-base group-hover:underline">
                {post.title}
              </h2>
              <div className="text-terminal-green-dim text-xs mt-1 flex gap-4">
                <span>{post.date}</span>
                <span>{post.readTime} min read</span>
              </div>
              {post.description && (
                <p className="text-terminal-white text-sm mt-2">{post.description}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
