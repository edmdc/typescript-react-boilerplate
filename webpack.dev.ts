import path from "path";
import webpack from "webpack";
import common from "./webpack.common";
import merge from "webpack-merge";
import HtmlWebpackPlugin from "html-webpack-plugin";

const devConfig: webpack.Configuration = merge(common, {
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  module: {
    rules: [
      // {
      //   test: /\.scss$/,
      //   use: [
      //     "style-loader", //3. Inject styles into DOM
      //     "css-loader", //2. Turns css into commonjs
      //     "sass-loader" //1. Turns sass into css
      //   ]
      // }
    ]
  }
});

export default devConfig;
