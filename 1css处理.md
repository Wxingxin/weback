```ts
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/[hash][ext]",
  },
  module: {
    rules: [
      // 处理普通CSS
      {
        test: /\.css$/i,
        use: [
          "style-loader", // 将CSS注入到页面style标签
          "css-loader", // 解析CSS中的@import和url()
          "postcss-loader", // 自动添加浏览器前缀
        ],
      },

      // 处理SCSS/SASS
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader", // 编译Sass为CSS
        ],
      },

      // 处理Less
      {
        test: /\.less$/i,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "less-loader", // 编译Less为CSS
        ],
      },

      // 处理CSS中的图片
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb的图片转为base64
          },
        },
      },

      // 处理CSS中的字体
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    // 自动生成HTML并注入CSS/JS
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    // 每次构建前清理dist目录
    new CleanWebpackPlugin(),
  ],
  mode: "development",
  devtool: "source-map",
  devServer: {
    static: "./dist",
    hot: true,
    open: true,
  },
};
```

```ts
module.exports = {
  plugins: [
    require("autoprefixer")({
      overrideBrowserslist: ["last 2 versions", "> 1%"],
    }),
  ],
};
```
