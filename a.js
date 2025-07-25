
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const glob = require('glob'); // PurgeCSS依赖的文件匹配工具
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // 配合PurgeCSS需要提取CSS为文件
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    // 1. HtmlWebpackPlugin 配置
    new HtmlWebpackPlugin({
      template: './src/index.html', // 以src/index.html为模板
      filename: 'index.html', // 输出到dist/index.html
      inject: 'body', // CSS/JS注入到body底部
      title: 'My App', // 页面标题（需模板配合）
      minify: {
        collapseWhitespace: true, // 压缩空格
        removeComments: true, // 移除注释
        removeRedundantAttributes: true // 移除冗余属性（如input的type="text"）
      },
      // 自定义模板变量（在HTML中通过<%= htmlWebpackPlugin.options.version %>使用）
      version: '1.0.0'
    }),

    // 2. CompressionPlugin 配置
    new CompressionPlugin({
      algorithm: 'gzip', // 压缩算法（支持gzip/brotliCompress）
      test: /\.(css|js|html|svg)$/, // 对这些文件类型进行压缩
      threshold: 8192, // 文件大小超过8KB才压缩
      minRatio: 0.8, // 压缩率小于0.8才保留压缩文件
      filename: '[path][base].gz' // 压缩文件命名（默认与源文件同目录）
    }),

    // 3. PurgeCSSPlugin 配置
    new PurgeCSSPlugin({
      // 扫描src目录下所有文件，识别已使用的CSS类名
      paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, { nodir: true }),
      // 安全列表：强制保留的CSS（不会被删除）
      safelist: {
        standard: ['html', 'body'], // 保留基础标签样式
        patterns: [/^btn-/, /^bg-/], // 保留以btn-、bg-开头的类名（适合动态类名）
        greedy: [/^theme-/] // 匹配包含theme-的所有类名
      }
    }),

    // 辅助插件：提取CSS为独立文件（配合PurgeCSS必需）
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css'
    })
  ],
  mode: 'production'
};
