const slugify = (str) =>
  str
    .toUpperCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '_')
    .replace(/^_+|_+$/g, '');

module.exports = {
  slugify,
};
