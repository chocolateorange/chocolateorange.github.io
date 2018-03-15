module.exports = {
  generate: {
    dir: 'public',
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
