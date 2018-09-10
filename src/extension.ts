import * as vscode from 'vscode';
import { WebpackProgress } from './webpack-progress';
import { ProgressWatcher, ProgressState } from './progress-watcher';

export function activate(context: vscode.ExtensionContext) {
  console.log('Extension "webpack-progress" activated');
  
  const progress = new WebpackProgress();
  const watcher = new ProgressWatcher();
  
  watcher.initializeWacher();
  watcher.on('progressChange', state => progress.updateProgress(state));
  
  context.subscriptions.push(progress);
}
