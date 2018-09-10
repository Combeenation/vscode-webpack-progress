## Webpack Progress

Display Webpack build progress in VS Code Status Bar.

![](https://github.com/Combeenation/vscode-webpack-progress/raw/master/images/progress.png)

## Installation

- Install all dependencies: `npm i`
- Build output files: `npm run compile`
- Create folder `%userprofile%\.vscode\extensions\vscode-webpack-progress`
- Copy everything to `%userprofile%\.vscode\extensions\vscode-webpack-progress` incl. `node-modules`, source files etc.

## webpack.config.js

- Create a webpack progress plugin either inside your config file or in a dedicated module:
  ```js 
  const fs = require('fs');
  const os = require('os');

  const _pluginName = 'WebpackProgress';
  const _outputFilePath = `${os.tmpdir()}/webpack-progress`;

  /**
  * Creates a simple file called "webpack-progress" in the users temp folder with 3 lines of content,
  * where each line either states "true" or "false" with the following meaning:
  * 
  *     - Line 1, "isRunning":   Compilation is currently running
  *     - Line 2, "hasErrors":   Compilation finished with errors
  *     - Line 3, "hasWarnings": Compilation finished with warnings
  */
  class WebpackProgressPlugin {
    write(isRunning, hasErrors, hasWarnings) {
      fs.writeFileSync(_outputFilePath, isRunning + os.EOL + hasErrors + os.EOL + hasWarnings);
    }
    
    apply(compiler) {
      compiler.hooks.compile.tap(
        _pluginName,
        () => this.write(true, false, false)
      );
      
      compiler.hooks.done.tap(
        _pluginName,
        stats => this.write(false, stats.hasErrors(), stats.hasWarnings())
      );
    }
  }

  module.exports = WebpackProgressPlugin;
  ```
- Import the module in the config file and use it:
  ```js 
  var WebpackProgressPlugin = require("path/to/webpack-progress-plugin");
  
  module.exports = {
    ...
    plugins: [ new WebpackProgressPlugin() ]
  };
  ```
