// Blog posts. Each post can either have an internal `body` (array of paragraphs)
// or an external `url` that links out to another site.
//
// To add a post, copy an entry and edit the fields:
//   slug    – URL-friendly id (used in /blog/:slug)
//   title   – post title
//   date    – YYYY-MM-DD (used for sorting, newest first)
//   summary – short blurb shown in the blog list
//   body    – array of paragraphs (omit if using `url`)
//   url     – external link (use instead of `body` to link out)
export const blogPosts = [
  {
    slug: 'hello-world',
    title: 'Hello, World',
    date: '2024-06-18',
    summary:
      'Welcome to my blog. I plan to write about machine learning, robotics, and things I learn along the way.',
    body: [
      'Welcome to my blog! This is where I will share notes on my research in machine learning, Vision-Language-Action models, and embodied AI.',
      'Stay tuned for posts about papers I find interesting, lessons from building real systems, and the occasional photography note.',
    ],
    // url: 'https://example.com/external-post', // use instead of body to link out
  },
]
