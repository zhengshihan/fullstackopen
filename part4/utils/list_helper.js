const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, cur) => {
    return acc + cur.likes;
  }, 0);
};
const favoriteBlog = (blogs) => {
  const result = blogs.reduce((acc, cur) => {
    return acc.likes > cur.likes ? acc : cur;
  }, blogs[0]);
  return { title: result.title, author: result.author, likes: result.likes };
};
const mostBlogs = (blogs) => {
  // Create an object to store the count of blogs per author
  const authorBlogCounts = {};

  // Count the number of blogs per author
  for (const blog of blogs) {
    const author = blog.author;
    if (!authorBlogCounts[author]) {
      authorBlogCounts[author] = 1; // Initialize to 1 instead of 0
    } else {
      authorBlogCounts[author]++; // Increment count if author already exists
    }
  }

  // Find the author with the maximum number of blogs
  let maxAuthor = { author: null, blogs: 0 };

  for (const [author, count] of Object.entries(authorBlogCounts)) {
    if (count > maxAuthor.blogs) {
      maxAuthor = { author, blogs: count };
    }
  }

  return maxAuthor;
};
const maxAuthor = (blogs) => {
  // Create an object to store the count of blogs per author
  const authorBlogCounts = {};

  // Count the number of blogs per author
  for (const blog of blogs) {
    const author = blog.author;
    if (!authorBlogCounts[author]) {
      authorBlogCounts[author] = blog.likes;
    } else {
      authorBlogCounts[author] += blog.likes; // Increment count if author already exists
    }
  }

  // Find the author with the maximum number of blogs
  let maxAuthor = { author: null, likes: 0 };

  for (const [author, count] of Object.entries(authorBlogCounts)) {
    if (count > maxAuthor.likes) {
      maxAuthor = { author, likes: count };
    }
  }

  return maxAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  maxAuthor,
};
