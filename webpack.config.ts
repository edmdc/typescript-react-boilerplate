import path from "path";

import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as DevServerConfiguration } from "webpack-dev-server";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

type ConfigArgv = {
  color: boolean;
  config: string;
  mode: string;
}

interface Configuration extends WebpackConfiguration {
  devServer?: DevServerConfiguration;
}

const config = (env: unknown, argv: ConfigArgv): Configuration => {
  const productionMode = argv.mode === "production";

  return ({
  mode: productionMode ? "production" : "development",
  devtool: productionMode ? false : "eval-source-map",
  entry: {
    client: {
      import: "./src/index.tsx",
      dependOn: ["react-vendors", "styled-components"],
    },
    "react-vendors": ["react", "react-dom"],
    "styled-components": "styled-components",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: productionMode ? "js/[name].[contenthash].bundle.js" : "js/[name].js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 8080,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript"
            ],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "babel-plugin-styled-components"
            ]
          },
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
      },
    ],
  },
  plugins: [
    !productionMode
      ? new ForkTsCheckerWebpackPlugin({
        async: false,
        eslint: {
          files: "./src/**/*.{ts,tsx,js,jsx}",
        },
      })
        : () => null,
      new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, "dist", "index.html"),
      template: path.join(__dirname, "src", "index.html"),
      minify: productionMode && {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true
      }
    }),
  ],
})
};

export default config
