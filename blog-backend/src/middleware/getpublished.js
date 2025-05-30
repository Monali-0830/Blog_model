// middleware/getPublished.js
const Blog = require('../models/blog');

module.exports = async (req, res) => {
  try {
    const published = await Blog.find({ status: 'publish' });
    if (!published.length) {
      return res.status(404).send('No published blogs found');
    }
    res.json(published);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
