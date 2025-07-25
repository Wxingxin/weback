const path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    //绝对路径
    path: path.resolve(__dirname, "./build"),
  },
};