import path from "path";
import { fileURLToPath } from "url";
// plugins
import HtmlWebpackPlugin from "html-webpack-plugin";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(dirname, "public"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|pages)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader",
            options: { import: true },
          },
        ],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
  devServer: {
    historyApiFallback: true,
  },
};
