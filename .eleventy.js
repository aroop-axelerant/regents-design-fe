export default function (eleventyConfig) {
  eleventyConfig.addFilter('year', () => new Date().getFullYear());

  eleventyConfig.addPassthroughCopy('public');
  eleventyConfig.addPassthroughCopy({ 'src/styles': 'styles' });
  eleventyConfig.addPassthroughCopy({ 'dist': 'dist' });

  eleventyConfig.addWatchTarget('src/styles/');
  eleventyConfig.addWatchTarget('src/scripts/');

  return {
    dir: {
      input: 'site',
      output: '_site',
      includes: '_includes',
      layouts: '_layouts',
      data: '_data',
    },
    templateFormats: ['njk', 'md', 'html'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
}
