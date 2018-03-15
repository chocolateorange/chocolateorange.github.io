module.exports = {
  generate: {
    dir: 'public',
    fallback: true,
  },
  modules: [
    [
      'nuxt-blog', {
        dirname: `${__dirname}/client/posts`,
      },
    ],
  ],
  srcDir: 'client',
};
