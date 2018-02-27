module.exports = {
  presets: [
    [
      'env',
      {
        modules: false,
        targets: { node: 8 },
      },
    ],
  ],
  plugins: ['syntax-dynamic-import', 'transform-object-rest-spread'],
}
