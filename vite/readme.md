以下是为你精心整理的 **Vite 学习路线大全**，从入门到高级配置、优化和生态使用，适合你系统掌握 Vite 在现代前端开发中的应用。

---

## 🚀 一、Vite 是什么？

Vite 是一个**下一代前端构建工具**，由 Evan You（Vue 作者）开发，主要特点：

- ⚡️ 快速冷启动（原生 ESM + no-bundle）
- 🛠️ 即时热更新（HMR 超快）
- 📦 构建使用 Rollup，结果轻量高效
- ✅ 支持 Vue、React、Svelte、TypeScript、Pug 等

---

## 📚 二、学习路线总览

| 阶段     | 目标                         | 内容重点                                   |
| -------- | ---------------------------- | ------------------------------------------ |
| 入门阶段 | 会使用 Vite 创建项目         | 初始化、目录结构、配置文件、热更新         |
| 基础阶段 | 掌握 Vite 的核心特性         | 插件机制、别名、环境变量、静态资源         |
| 进阶阶段 | 熟练使用并做性能优化         | 构建优化、生产部署、自定义插件、预构建分析 |
| 高级阶段 | 与框架深度集成、构建系统定制 | Vue/React/Svelte 框架集成、Rollup 配置扩展 |

---

## 🏁 三、入门阶段

### 1️⃣ 安装 Vite 创建项目

```bash
npm create vite@latest my-app
cd my-app
npm install
npm run dev
```

你可以选择模板如：`vanilla`, `vue`, `react`, `svelte` 等。

---

### 2️⃣ 了解目录结构

```
📦 my-app
├── index.html          ← HTML 入口
├── vite.config.js      ← Vite 配置文件
├── src/
│   ├── main.js         ← 项目入口
│   └── App.vue / App.jsx
```

---

### 3️⃣ 常用命令

```bash
npm run dev    # 本地开发
npm run build  # 生产构建
npm run preview # 预览生产构建
```

---

## 🧱 四、基础阶段

### 1. 环境变量支持 `.env`

```env
# .env.development
VITE_API_URL=http://localhost:3000
```

```js
console.log(import.meta.env.VITE_API_URL);
```

---

### 2. 路径别名配置

```js
// vite.config.js
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
```

---

### 3. 使用插件（如 Vue/React）

```bash
npm install @vitejs/plugin-vue --save-dev
```

```js
// vite.config.js
import vue from "@vitejs/plugin-vue";
export default {
  plugins: [vue()],
};
```

React 项目：

```bash
npm install @vitejs/plugin-react
```

---

## 🚀 五、进阶阶段

### 1. 构建优化

```js
build: {
  target: 'es2015',
  outDir: 'dist',
  minify: 'esbuild', // 比 terser 快
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['vue', 'axios']
      }
    }
  }
}
```

---

### 2. 静态资源处理

- 直接 import 图片、SVG、字体

```js
import logo from "./assets/logo.png";
```

- 使用 `public/` 目录存放不经过打包的文件

---

### 3. HMR 热更新调试

只要你使用的是 Vue/React + Vite，修改 `.vue` 或 `.jsx` 文件会自动热更新。

---

### 4. 使用 SSR（服务端渲染）

Vite 支持 SSR 模式，但需要自行配置：

```bash
npm create vite@latest my-ssr-app --template react-ssr
```

---

## 🔌 六、高级阶段

### 1. 自定义 Vite 插件

```js
export default function myPlugin() {
  return {
    name: "my-plugin",
    transform(code, id) {
      if (id.endsWith(".js")) {
        return code.replace("__REPLACE_ME__", "Hello");
      }
    },
  };
}
```

---

### 2. 与 Vue3 + Pinia + Vue Router 配合

```bash
npm install vue-router@4 pinia
```

整合式配置详见：Vue 官方文档 + Vite 官方文档

---

### 3. 与 React + TypeScript 配合

```bash
npm create vite@latest my-react-app -- --template react-ts
```

---

## 📊 七、生态扩展推荐

| 名称                      | 用途                   |
| ------------------------- | ---------------------- |
| `vite-plugin-pages`       | 文件自动路由           |
| `vite-plugin-pwa`         | PWA 离线缓存支持       |
| `vite-plugin-compression` | 构建时 gzip 压缩       |
| `vite-plugin-inspect`     | 插件调试分析工具       |
| `vite-plugin-svg-icons`   | 自动生成 SVG Icon 组件 |

---

## ✅ 八、实战建议

1. 从简单的 Vite + Vue 项目开始练手
2. 尝试用 Vite 重构你现有的 webpack 项目
3. 逐步引入插件（eslint、stylelint、alias、env）
4. 研究 vite.config.js 的每一项配置的作用
5. 阅读 Vite 官方文档（非常清晰！）

---

## 📌 九、小结

| 阶段 | 关键技能                                 |
| ---- | ---------------------------------------- |
| 入门 | 会创建项目、了解基本结构、运行开发命令   |
| 基础 | 配置 alias、env、静态资源、插件          |
| 进阶 | 打包优化、SSR、分析构建、写插件          |
| 高级 | 与框架深度集成、自定义插件、部署、PWA 等 |

---

如果你告诉我你打算用 Vite 做 **Vue、React、TS 项目还是后台管理系统**，我可以给你定制一份完整的 Vite 项目结构模板。要吗？
