# 基本处理 css

### install

```bash
npm i css-loader -D
```

### 2 fun

1. 方法 1

```ts
import "css-loader! ../css/index.css";
```

2. 方法 2

```ts
const path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./build"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["css-loader"],
      },
    ],
  },
};
```

### 使用 style-loader

```ts
const path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./build"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["css-loader", "style-loader"],
      },
    ],
  },
};
```

# less

```bash
npm i less-loader less style-loader css-loader -D
```

```ts
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
};
```

# 浏览器兼容性

1. 兼容

- 开发中，浏览器的兼容性问题，我们应该如何去解决和处理
- 我这里指的兼容性是针对不同的浏览器支持的特性比如 css 特性、js 语法，之间的兼容性
- 我们不一定要适配所有的浏览器，看项目要有适配什么

2. 怎么做

- 有`autoprefiexer` `babel`去找到要适配浏览器的范围，处理成为适配的代码
- 所以要有可以查询适配浏览器范围的

3. 认识 browserslist 工具

- 是什么：browserslist 是一个不同的前端工具之间，共享目标浏览器和 nodejs 版本的配置
- 有什么工具要使用：`Autoprefixer`，`Babel`，`postcss-preset-env`

```ts

```

### 2 种编写方式

1. 在 packagejson 中

- 3 个条，他们之前是并集的关系，满足一个即可

```json
{
  "browserslist": [">1%", "last 2 version", "not dead"]
}
```

2. 创建 `.browserslist`文件

```ts
>1,
last 2 version,
not dead
```

```ts

```

```ts

```
