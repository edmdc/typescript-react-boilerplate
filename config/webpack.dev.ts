import path from "path";
import webpack from "webpack";
import common from "./webpack.common";
import merge from "webpack-merge";
import HtmlWebpackPlugin from "html-webpack-plugin";

const devConfig: webpack.Configuration = merge(common, {
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./index.html")
    })
  ],
  module: {
    rules: [
       {
         test: /\.scss$/,
         use: [
           "style-loader", //3. Inject styles into DOM
           {
              loader: "css-loader",
              options: {
                modules: true,
                importLoaders: 1,
                sourceMap: true
              }
           }, //2. Turns css into commonjs
           {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: require('node-sass')
            }
          } //1. Turns sass into css
         ]
       }
    ]
  }
});

export default devConfig;
