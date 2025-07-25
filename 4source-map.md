source-map 是 Webpack 中用于映射打包后代码与源代码的调试工具，能在浏览器开发者工具中直接显示原始代码（而非压缩/混淆后的代码），极大简化调试过程。以下是其核心知识与配置方法：

### 一、source-map 核心概念

- **作用**：建立打包后代码（如 `bundle.js`）与源代码（如 `src/index.js`）的映射关系，让浏览器能在控制台显示原始代码的行数、内容。
- **原理**：生成 `.map` 后缀的映射文件，包含代码位置映射信息，浏览器加载时自动解析。

### 二、devtool 配置详解

Webpack 通过 `devtool` 选项控制 source-map 生成方式，不同值对应不同的**构建速度**和**调试体验**：

| 配置值                         | 环境 | 特点                                                                |
| ------------------------------ | ---- | ------------------------------------------------------------------- |
| `eval`                         | 开发 | 最快，用 `eval` 执行模块，不生成 map，仅显示模块名（调试体验差）    |
| `cheap-eval-source-map`        | 开发 | 较快，生成简化的 map，不包含列信息，映射到转译后代码（非原始源码）  |
| `eval-cheap-module-source-map` | 开发 | 推荐！保留原始源码（含 loader 处理前的代码），不包含列信息，速度快  |
| `inline-source-map`            | 开发 | map 嵌入到 JS 文件中（不生成单独 `.map` 文件），体积大              |
| `source-map`                   | 生产 | 生成完整 map 文件，映射精确（包含列信息），但构建慢                 |
| `hidden-source-map`            | 生产 | 生成完整 map，但不在 JS 中暴露 map 路径（用于错误监控，不暴露源码） |
| `nosources-source-map`         | 生产 | 显示错误位置，但不包含原始源码内容（保护代码隐私）                  |

### 三、不同环境的最佳实践

1. **开发环境（development）**

   - 优先选择：`eval-cheap-module-source-map`
   - 理由：
     - `eval` 保证构建速度快
     - `cheap` 忽略列信息（调试中列信息作用小，可提速）
     - `module` 映射到 loader 处理前的原始源码（如 SCSS 源码而非编译后的 CSS）

2. **生产环境（production）**
   - 推荐选择：`source-map` 或 `hidden-source-map`
   - 理由：
     - `source-map`：生成完整映射，便于线上问题定位（需注意源码泄露风险）
     - `hidden-source-map`：适合错误监控系统（如 Sentry），不在浏览器中暴露源码

### 四、关键注意事项

1. **性能影响**：

   - 越详细的 source-map（如 `source-map`）构建速度越慢，生产环境需权衡。
   - 开发环境禁用 `source-map` 或使用 `eval` 可大幅提升构建速度（但调试体验下降）。

2. **源码安全**：

   - 生产环境公开 `source-map` 会暴露原始代码（包括注释、逻辑），敏感项目建议用 `hidden-source-map` 或 `nosources-source-map`。

3. **与 devServer 配合**：
   - 开发环境启用 `devServer.hot: true` 时，`eval-cheap-module-source-map` 是最佳选择，支持热更新同时保证调试体验。

### 五、验证 source-map 是否生效

1. 构建项目后，查看 `dist` 目录是否生成 `.map` 文件（如 `bundle.js.map`）。
2. 在浏览器中打开页面，按 F12 打开开发者工具：
   - 切换到 `Sources` 面板，若能看到 `webpack://` 目录下的原始源码，则配置生效。

通过合理配置 source-map，可在开发时高效调试，在生产时兼顾错误定位与代码安全，是 Webpack 调试优化的核心手段。

```ts
module.exports = {
  // 开发环境：优先调试体验，兼顾速度
  mode: "development",
  devtool: "eval-cheap-module-source-map",

  // 生产环境：优先隐藏源码，兼顾错误定位
  // mode: 'production',
  // devtool: 'source-map', // 完整source-map，单独文件
  // devtool: 'hidden-source-map', // 不暴露源码，仅供错误监控使用

  // 其他关键配置
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
```
