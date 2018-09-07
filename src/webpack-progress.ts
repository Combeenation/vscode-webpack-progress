import * as vscode from 'vscode';

export class WebpackProgress {
  private statusBarItem: vscode.StatusBarItem;
  private lastPercentage: number;
  private resetTimout: any;
  private statusLabel: string = 'Webpack';

  public updateProgress(percentage) {
    if (!this.statusBarItem) {
       this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
       this.statusBarItem.text = this.statusLabel;
       this.statusBarItem.show();
    }
    if (typeof this.lastPercentage === 'undefined') {
      this.statusBarItem.text = this.statusLabel;
    } else {
      this.statusBarItem.text = (
        (typeof percentage === 'number')
        ? `${this.statusLabel} ${percentage}%`
        : this.statusLabel
      );
    }
    
    if ((percentage === 100) && (typeof this.lastPercentage !== 'undefined')) {
      this.resetProgress();
    }
    this.lastPercentage = percentage;
  }

  public dispose() {
    this.statusBarItem.dispose();
  }

  private resetProgress() {
    this.statusBarItem.text = `${this.statusLabel} ✓`;
    clearTimeout(this.resetTimout);
    this.resetTimout = setTimeout(() => this.statusBarItem.text = this.statusLabel, 5000);
  }
}
