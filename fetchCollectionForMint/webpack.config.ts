import { join, resolve } from 'path';
import { Configuration } from 'webpack';

const config: Configuration = {
  entry: { ['lambdaEntrypoint']: './src/lambdaEntrypoint.ts' },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: resolve(__dirname, 'build'),
  },
  mode: process.env.NODE_ENV === 'dev' ? 'development' : 'production',
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader' }],
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  target: 'node',
};

export default config;
