import * as vscode from 'vscode';

export class WebpackProgress {
  private _statusBarItem: vscode.StatusBarItem;
  private _lastPercentage: number;
  private _resetTimout: any;
  private _statusLabel: string = 'Webpack';

  public updateProgress(percentage) {
    if (!this._statusBarItem) {
       this._statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
       this._statusBarItem.text = this._statusLabel;
       this._statusBarItem.show();
    }
    if (typeof this._lastPercentage === 'undefined') {
      this._statusBarItem.text = this._statusLabel;
    } else {
      this._statusBarItem.text = (
        (typeof percentage === 'number')
        ? `${this._statusLabel} ${percentage}%`
        : this._statusLabel
      );
    }
    
    if ((percentage === 100) && (typeof this._lastPercentage !== 'undefined')) {
      this._resetProgress();
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
