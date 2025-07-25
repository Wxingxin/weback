# 1 基础必备类 Plugins

### 1. 🔧 `HtmlWebpackPlugin`

**功能**：自动生成 HTML 文件并注入打包资源（JS、CSS）

```bash
npm install html-webpack-plugin --save-dev
```

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");

plugins: [
  new HtmlWebpackPlugin({
    template: "./src/index.html", // 模板路径
    filename: "index.html", // 输出文件名
    itle: "My App", // 自定义标题
    minify: { collapseWhitespace: true }, // 压缩HTML（可选）
  }),
];
```

---

### 2. 🧹 `CleanWebpackPlugin`

**功能**：每次构建前清空 `dist` 目录

```bash
npm install clean-webpack-plugin --save-dev
```

```js
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

plugins: [new CleanWebpackPlugin()];
```

---

### 3. 📦 `DefinePlugin`

**功能**：创建全局常量，常用于区分开发和生产环境

```js
const webpack = require("webpack");

plugins: [
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify("production"),
  }),
];
```

---

# 处理 css

### 1 `MiniCssExtractPlugin`

**功能**：将 CSS 抽离成单独文件（代替 style-loader）

```bash
npm install mini-css-extract-plugin --save-dev
```

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

plugins: [
  new MiniCssExtractPlugin({
    filename: "[name].[contenthash].css",
  }),
];
```

### 2 `CssMinimizerPlugin`

作用：压缩 CSS 代码（移除空格、合并规则、删除注释等）。
场景：生产环境减小 CSS 文件体积。

```bash
npm install css-minimizer-webpack-plugin --save-dev
```

```js
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()], // 仅在生产模式生效
  },
};
```

### 3. PurgeCSSPlugin

1. 核心功能：

- 移除未使用的 CSS 代码（实现 CSS Tree-shaking）。

2. 适用场景：

- 使用 Bootstrap、Tailwind 等大型 CSS 库时，剔除未用到的样式
- 减少生产环境 CSS 文件体积（通常可减少 50% 以上）

3. 注意事项：

- 需要配合 glob 扫描所有 HTML/JS 文件，识别已使用的类名
- 通过 safelist 保留动态生成的类名（如 bg-${color}）

```ts

```

```ts
const PurgeCSSPlugin = require("purgecss-webpack-plugin");

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
```

### 4. CompressionPlugin

1.  核心功能：

- 生成 CSS 的 Gzip 或 Brotli 压缩文件（如 style.css.gz）。

2.  优势：

- 配合服务器配置（Nginx/Apache），可大幅减少 CSS 传输体积。

3.  常见配置：

- test: /\.css$/：仅压缩 CSS 文件
- threshold: 8192：仅压缩大于 8KB 的文件（小文件压缩收益低）

```ts

```

```ts
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  plugins: [
    // 2. CompressionPlugin 配置
    new CompressionPlugin({
      algorithm: "gzip", // 压缩算法（支持gzip/brotliCompress）
      test: /\.(css|js|html|svg)$/, // 对这些文件类型进行压缩
      threshold: 8192, // 文件大小超过8KB才压缩
      minRatio: 0.8, // 压缩率小于0.8才保留压缩文件
      filename: "[path][base].gz", // 压缩文件命名（默认与源文件同目录）
    }),
  ],
  mode: "production",
};
```

### 5. HtmlWebpackPlugin（辅助 CSS 处理）

1. 核心功能：

- 自动将提取的 CSS 文件通过 <link> 标签注入 HTML。

2. 优势：

- 无需手动维护 CSS 引用路径，避免路径错误。

```ts

```

```ts
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  plugins: [
    // 1. HtmlWebpackPlugin 配置
    new HtmlWebpackPlugin({
      template: "./src/index.html", // 以src/index.html为模板
      filename: "index.html", // 输出到dist/index.html
      inject: "body", // CSS/JS注入到body底部
      title: "My App", // 页面标题（需模板配合）
      minify: {
        collapseWhitespace: true, // 压缩空格
        removeComments: true, // 移除注释
        removeRedundantAttributes: true, // 移除冗余属性（如input的type="text"）
      },
      // 自定义模板变量（在HTML中通过<%= htmlWebpackPlugin.options.version %>使用）
      version: "1.0.0",
    }),
  ],
  mode: "production",
};
```

# js

### 5. 🧱 `TerserWebpackPlugin`

**功能**：JS 压缩优化（默认用于生产）

```js
const TerserPlugin = require('terser-webpack-plugin');

optimization: {
  minimize: true,
  minimizer: [new TerserPlugin()]
}
```

# 其它资源（字体，文件，图片等）

## ✅ 三、分析类 Plugins

### 7. 📊 `BundleAnalyzerPlugin`

**功能**：分析打包后的 bundle 体积，可视化依赖关系

```bash
npm install webpack-bundle-analyzer --save-dev
```

```js
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

plugins: [new BundleAnalyzerPlugin()];
```

---

## ✅ 四、开发体验增强类 Plugins

### 8. 🔁 `HotModuleReplacementPlugin`（HMR 热更新）

**功能**：热更新，无刷新更新页面内容

```js
const { HotModuleReplacementPlugin } = require("webpack");

module.exports = {
  devServer: { hot: true }, // 启用热更新
  plugins: [new HotModuleReplacementPlugin()],
};
```

> ⚠️ 注意：Webpack 5 在 `devServer.hot: true` 时默认开启此插件。

---

### 9. 🧪 `ProgressPlugin`

**功能**：构建过程显示进度条（Webpack 内置）

```js
const webpack = require("webpack");

plugins: [new webpack.ProgressPlugin()];
```

---

## ✅ 五、静态资源处理类 Plugins

### 10. 📁 `CopyWebpackPlugin`

**功能**：将静态资源复制到 `dist` 目录

```bash
npm install copy-webpack-plugin --save-dev
```

```js
const CopyWebpackPlugin = require("copy-webpack-plugin");

plugins: [
  new CopyWebpackPlugin({
    patterns: [{ from: "public", to: "public" }],
  }),
];
```

---

### 11. 🧊 `ImageMinimizerPlugin`

**功能**：图片压缩优化

```bash
npm install image-minimizer-webpack-plugin imagemin --save-dev
```

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

plugins: [
  new ImageMinimizerPlugin({
    minimizer: {
      implementation: ImageMinimizerPlugin.imageminGenerate,
      options: {
        plugins: [["gifsicle"], ["jpegtran"], ["optipng"]],
      },
    },
  }),
];
```

---

## ✅ 六、环境变量和配置优化类

### 12. 📜 `DotenvWebpackPlugin`

**功能**：从 `.env` 文件中加载环境变量

```bash
npm install dotenv-webpack --save-dev
```

```js
const Dotenv = require("dotenv-webpack");

plugins: [new Dotenv()];
```

---

## ✅ 七、Vue/React 等框架支持插件

### 14. ⚛️ `ReactRefreshWebpackPlugin`（用于 React 快速刷新）

```bash
npm install @pmmmwh/react-refresh-webpack-plugin --save-dev
```

```js
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

plugins: [new ReactRefreshWebpackPlugin()];
```

---

## ✅ 八、进阶使用建议

### 🔹 插件组合推荐（开发环境）

```js
plugins: [
  new HtmlWebpackPlugin(),
  new webpack.DefinePlugin(...),
  new webpack.HotModuleReplacementPlugin(),
  new ReactRefreshWebpackPlugin()
]
```

### 🔹 插件组合推荐（生产环境）

```js
plugins: [
  new HtmlWebpackPlugin(),
  new MiniCssExtractPlugin(),
  new CleanWebpackPlugin(),
  new BundleAnalyzerPlugin(),
  new Dotenv(),
];
```

---

## 🎁 Bonus：你可以根据场景这样查找插件

| 场景                 | 推荐插件                   |
| -------------------- | -------------------------- |
| 自动生成 HTML        | HtmlWebpackPlugin          |
| 提取 CSS             | MiniCssExtractPlugin       |
| 构建前清理           | CleanWebpackPlugin         |
| 环境变量注入         | DefinePlugin / Dotenv      |
| 资源体积分析         | BundleAnalyzerPlugin       |
| 压缩优化             | CssMinimizerPlugin, Terser |
| 拷贝 public 静态资源 | CopyWebpackPlugin          |
