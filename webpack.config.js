const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const glob = require("glob"); // PurgeCSS依赖的文件匹配工具
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: [
    // 3. PurgeCSSPlugin 配置
    new PurgeCSSPlugin({
      // 扫描src目录下所有文件，识别已使用的CSS类名
      paths: glob.sync(`${path.join(__dirname, "src")}/**/*`, { nodir: true }),
      // 安全列表：强制保留的CSS（不会被删除）
      safelist: {
        standard: ["html", "body"], // 保留基础标签样式
        patterns: [/^btn-/, /^bg-/], // 保留以btn-、bg-开头的类名（适合动态类名）
        greedy: [/^theme-/], // 匹配包含theme-的所有类名
      },
    }),
  ],
  mode: "production",
};
