import { Link, useParams } from 'react-router-dom'
import { blogPosts } from '../blog.js'

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="page-head">
        <h1 className="page-title">Post not found</h1>
        <p className="page-subtitle">
          <Link to="/blog" className="back-link">
            ← Back to blog
          </Link>
        </p>
      </div>
    )
  }

  return (
    <article className="blog-post">
      <Link to="/blog" className="back-link">
        ← Back to blog
      </Link>
      <header className="blog-post-head">
        <h1 className="page-title">{post.title}</h1>
        <p className="blog-date">{post.date}</p>
      </header>
      {post.url ? (
        <div className="blog-post-body">
          <p>{post.summary || 'This post is published elsewhere.'}</p>
          <p>
            <a href={post.url} target="_blank" rel="noreferrer">
              Read it on the original site
            </a>
          </p>
        </div>
      ) : (
        <div
          className="blog-post-body"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      )}
    </article>
  )
}
