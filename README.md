## Webpack Progress

Display Webpack build progress in VS Code Status Bar.

![](https://github.com/Combeenation/vscode-webpack-progress/raw/master/images/progress.png)

## Installation

- <kbd>Command</kbd> + <kbd>P</kbd>
- Type: `ext install webpack-progress`
- Press <kbd>Enter</kbd>

## webpack.config.js

You have to install [webpack-progress-plugin](https://github.com/Combeenation/webpack-progress-plugin)

```javascript
var WebpackProgressPlugin = require("webpack-progress-plugin");

module.exports = {
  ...
  plugins: [ new WebpackProgressPlugin() ]
};
```
