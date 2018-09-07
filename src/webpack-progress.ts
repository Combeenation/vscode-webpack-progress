import { ProgressState } from './progress-watcher';
import * as vscode from 'vscode';

export class WebpackProgress {
  private _statusBarItem: vscode.StatusBarItem;
  private _statusTextBase = '';

  
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
    }
    this._lastPercentage = percentage;
  }

  public dispose() {
    this._statusBarItem.dispose();
  }

  private _resetProgress() {
    this._statusBarItem.text = `${this._statusLabel} ✓`;
    clearTimeout(this._resetTimout);
    this._resetTimout = setTimeout(() => this._statusBarItem.text = this._statusLabel, 5000);
  }
}
