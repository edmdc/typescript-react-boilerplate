import Dotenv from "dotenv";
import path from "path";

import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

Dotenv.config();

const productionMode = process.env.NODE_ENV === "production";

const config: Configuration = {
  mode: productionMode ? "production" : "development",
  devtool: productionMode ? false : "eval-source-map",
  entry: {
    client: {
      import: "./src/index.tsx",
      dependOn: "react-vendors",
    },
    "react-vendors": ["react", "react-dom"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: productionMode ? "js/[name].[contentHash].bundle.js" : "js/[name].js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 8080,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-react",
            "@babel/preset-typescript"
          ]
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "imgs",
          },
        },
      },{
        test: /\.(scss|css)$/,
        use: [
          productionMode ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              sourceMap: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: require('node-sass')
            }
          }
        ]
      }
    ],
  },
  plugins: [
    productionMode
      ? new ForkTsCheckerWebpackPlugin({
        async: false,
        eslint: {
          files: "./src/**/*.{ts,tsx,js,jsx}",
        },
      })
      : () => null,
     new HtmlWebpackPlugin({
          filename: path.resolve(__dirname, "dist", "index.html"),
          template: path.join(__dirname, "public", "index.html"),
          minify: productionMode && {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true
          }
      })
  ],
};

export default config
