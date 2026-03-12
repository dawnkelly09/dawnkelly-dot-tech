import { useParams, Link } from 'react-router-dom'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPostBySlug } from '../data/blog'

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <div className="space-y-4">
        <div className="text-terminal-green-dim text-xs">$ cat ~/blog/{slug}.md</div>
        <p className="text-red-400">Error: file not found</p>
        <Link to="/blog" className="text-terminal-yellow text-sm hover:underline">
          ← Back to blog
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Link to="/blog" className="text-terminal-yellow text-sm hover:underline">
        ← Back to blog
      </Link>

      <header className="space-y-2">
        <div className="text-terminal-green-dim text-xs">$ cat ~/blog/{post.slug}.md</div>
        <h1 className="text-xl text-terminal-green text-glow font-bold">{post.title}</h1>
        <div className="text-terminal-green-dim text-xs flex gap-4">
          <span>{post.date}</span>
          <span>{post.readTime} min read</span>
        </div>
      </header>

      <article className="prose-terminal space-y-4 text-sm leading-relaxed text-terminal-white">
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => <h1 className="text-lg text-terminal-green font-bold mt-8 mb-3">{children}</h1>,
            h2: ({ children }) => <h2 className="text-base text-terminal-green font-bold mt-6 mb-2">{children}</h2>,
            h3: ({ children }) => <h3 className="text-sm text-terminal-green font-bold mt-4 mb-2">{children}</h3>,
            p: ({ children }) => <p className="text-terminal-white leading-relaxed mb-3">{children}</p>,
            a: ({ href, children }) => <a href={href} className="text-terminal-yellow hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>,
            code: ({ inline, children }) =>
              inline !== false && !String(children).includes('\n')
                ? <code className="bg-terminal-gray px-1.5 py-0.5 text-terminal-green text-xs">{children}</code>
                : <pre className="bg-terminal-dark border border-terminal-gray p-4 overflow-x-auto text-xs my-3"><code className="text-terminal-green">{children}</code></pre>,
            pre: ({ children }) => <>{children}</>,
            ul: ({ children }) => <ul className="space-y-1 ml-4">{children}</ul>,
            ol: ({ children }) => <ol className="space-y-1 ml-4 list-decimal">{children}</ol>,
            li: ({ children }) => <li className="text-terminal-white"><span className="text-terminal-green-dim">├─</span> {children}</li>,
            blockquote: ({ children }) => <blockquote className="border-l-2 border-terminal-green-50 pl-4 text-terminal-green-dim italic">{children}</blockquote>,
            hr: () => <hr className="border-terminal-gray my-6" />,
          }}
        >
          {post.content}
        </Markdown>
      </article>
    </div>
  )
}
