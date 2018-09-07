import { ProgressState } from './progress-watcher';
import * as vscode from 'vscode';

export class WebpackProgress {
  private _statusBarItem: vscode.StatusBarItem;
  private _statusTextBase = '';
  
  private _lastUpdateTime: number;
  private _timerId: NodeJS.Timer;
  
  public updateProgress(percentage: number, state: ProgressState) {
    if (!this._statusBarItem) {
       this._statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
       this._statusBarItem.show();
    }
    
    let statusText = 'Webpack';
    if (percentage < 100) {
      statusText += ` ${percentage}% ⌛️`;
    } else {
      switch (state) {
        case ProgressState.Success: statusText += ' ✔️'; break;
        case ProgressState.Warning: statusText += ' ⚠️️'; break;
        case ProgressState.Error:   statusText += ' ❌'; break;
      }
    }
    
    this._statusBarItem.text = this._statusTextBase = statusText;
    this._lastUpdateTime = Date.now();
    this._updateTimer();
  }

  public dispose() {
    this._statusBarItem.dispose();
    if (this._timerId) {
      clearTimeout(this._timerId);
    }
  }
  
  private _updateTimer() {
    const secondsPassed = (Date.now() - this._lastUpdateTime) / 1000;
    let timePassedStr = '';
    
    if (secondsPassed < 10) {
      timePassedStr = '< 10s';
    } else if (secondsPassed < 20) {
      timePassedStr = '< 20s';
    } else if (secondsPassed < 30) {
      timePassedStr = '< 30s';
    }
    
    this._statusBarItem.text = this._statusTextBase + ` ${ timePassedStr }`;
    
    if (this._timerId) {
      clearTimeout(this._timerId);
    }
    if (secondsPassed <= 30) {
      this._timerId = setTimeout(this._updateTimer.bind(this), 10000);
    }
  }
}
