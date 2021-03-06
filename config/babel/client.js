export default {
  presets: [
    [
      '@babel/env',
      {
        modules: false,
        targets: {
          browsers: 'last 2 versions',
        },
      },
    ],
  ],
  plugins: ['syntax-dynamic-import', 'transform-object-rest-spread'],
}
