const isDev = process.env.NODE_ENV !== 'production';

const presets = ['@babel/preset-env'];

if (isDev) {
  presets.push('@vue/babel-preset-jsx');
}

const config = {
  exclude: 'node_modules/**',
  presets,
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],
  ],
};

module.exports = config;
