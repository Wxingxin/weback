在 Webpack 中使用 ESLint 可以帮助你在打包过程中自动检查并规范 JavaScript/TypeScript/React 等代码风格，提升代码质量与一致性。

以下是一份 **Webpack 中使用 ESLint 的全套指南（含插件配置、常见规则与自动修复）**：

---

## ✅ 一、目的：为什么要在 Webpack 中使用 ESLint？

- 开发时自动检测语法错误、风格问题
- 提高代码一致性，避免低级错误
- 配合 IDE 提示 + Webpack 编译时提示 + 自动修复，体验更丝滑

---

## ✅ 二、安装 ESLint 及依赖

### 1️⃣ 安装 ESLint 及 Webpack 插件

```bash
npm install --save-dev eslint eslint-webpack-plugin
```

### 2️⃣ 安装适合项目的 ESLint 规则集（按需）

| 使用技术        | 推荐安装内容                                        |
| --------------- | --------------------------------------------------- |
| 原生 JS         | `eslint:recommended`（内置）                        |
| React           | `eslint-plugin-react` + `eslint-plugin-jsx-a11y`    |
| TypeScript      | `@typescript-eslint/eslint-plugin` + parser         |
| Vue             | `eslint-plugin-vue`                                 |
| Prettier 格式化 | `eslint-config-prettier` + `eslint-plugin-prettier` |

---

## ✅ 三、创建 `.eslintrc` 配置文件

```js
// .eslintrc.json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["eslint:recommended"],
  "parserOptions": {
    "ecmaVersion": 2021,
    "sourceType": "module"
  },
  "rules": {
    "no-unused-vars": "warn",
    "semi": ["error", "always"]
  }
}
```

---

## ✅ 四、在 Webpack 中使用 ESLint 插件

```js
// webpack.config.js
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  // ...其他配置
  plugins: [
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
      fix: true, // 是否自动修复
      emitWarning: true, // 不阻止构建
      failOnError: false, // 避免构建失败
    }),
  ],
};
```

---

## ✅ 五、常用配置选项（eslint-webpack-plugin）

| 选项          | 含义                                    |
| ------------- | --------------------------------------- |
| `extensions`  | 指定检查哪些文件扩展名                  |
| `fix`         | 自动修复问题（如缺少分号）              |
| `emitWarning` | 把错误作为 warning 输出，不中断构建流程 |
| `failOnError` | 是否构建失败（建议开发阶段关闭）        |
| `cache`       | 启用缓存，加速构建                      |

---

## ✅ 六、使用 Prettier 协作格式化（可选）

```bash
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

`.eslintrc.json` 中配置：

```js
{
  "extends": ["eslint:recommended", "plugin:prettier/recommended"]
}
```

---

## ✅ 七、ESLint 与 TypeScript 配合（进阶）

```bash
npm install --save-dev typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

配置 `.eslintrc.json`：

```js
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"]
}
```

---

## ✅ 八、常见 ESLint 规则举例

| 规则名           | 说明                                 |
| ---------------- | ------------------------------------ |
| `no-console`     | 禁止使用 `console.log`               |
| `no-unused-vars` | 禁止未使用变量                       |
| `semi`           | 分号规则（如：\["error", "always"]） |
| `quotes`         | 单双引号（如："single"）             |
| `eqeqeq`         | 强制使用 `===` 替代 `==`             |

---

## ✅ 九、结合 VSCode 配置自动修复（推荐）

`.vscode/settings.json`：

```js
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "typescript",
    "javascriptreact",
    "typescriptreact"
  ]
}
```

---

## ✅ 十、命令行手动检查 & 修复

```bash
npx eslint src --ext .js,.jsx,.ts,.tsx
npx eslint src --fix
```

---

## ✅ 十一、项目目录示例

```
📦 my-app
├── src/
│   └── index.js
├── .eslintrc.json
├── webpack.config.js
├── package.json
└── .vscode/
    └── settings.json
```

---

## ✅ 十二、小结口诀

```
Webpack 插件配 ESLint，自动检查超省心；
fix 自动修，emitWarning 保安心；
项目结构要清晰，VSCode 配置也贴心。
```

---

如果你告诉我你的项目是 **React / Vue / TypeScript** 中的哪一个，我可以为你生成一份最适合你项目的 `.eslintrc` 和 `webpack.config.js` 的组合示例，是否需要？
