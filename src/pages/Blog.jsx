import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { blogPosts } from '../blog.js'

export default function Blog() {
  const posts = blogPosts

  return (
    <>
      <div className="page-head">
        <h1 className="page-title">Blog</h1>
        <p className="page-subtitle">
          Notes on research, engineering, and things I learn along the way.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="empty-note">No posts yet. Coming soon.</p>
      ) : (
        <ul className="blog-list">
          {posts.map((post) => {
            const external = Boolean(post.url)
            const Wrapper = external ? 'a' : Link
            const wrapperProps = external
              ? { href: post.url, target: '_blank', rel: 'noreferrer' }
              : { to: `/blog/${post.slug}` }
            return (
              <li key={post.slug} className="blog-card reveal in-view">
                <Wrapper className="blog-card-link" {...wrapperProps}>
                  <span className="blog-date">{post.date}</span>
                  <h2 className="blog-card-title">
                    {post.title}
                    {external && <Icon name="external" size={15} />}
                  </h2>
                  {post.summary && (
                    <p className="blog-summary">{post.summary}</p>
                  )}
                </Wrapper>
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}
