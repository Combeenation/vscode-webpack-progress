import * as vscode from 'vscode';
import { WebpackProgress } from './webpack-progress';
import { ProgressWatcher } from './progress-watcher';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "webpack-progress" is now active!');
  
  const progress = new WebpackProgress();
  const watcher = new ProgressWatcher();
  
  watcher.initializeWacher();
  watcher.on('progressChange', (percentage) => {
    progress.updateProgress(percentage);
  });
  
  context.subscriptions.push(progress);
  context.subscriptions.push(progress);
}

// export function deactivate() {
// }
