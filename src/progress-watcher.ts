import * as fs from 'fs';
import { EventEmitter } from 'events';
import * as os from 'os';

export enum ProgressState {
  Running = 0,
  Success,
  Warning,
  Error,
}

export class ProgressWatcher extends EventEmitter {
  public initializeWatcher() {
    const tempFile = `${os.tmpdir()}/webpack-progress`;
    
    fs.watch(tempFile, () => this._handleProgressChange(tempFile));
  }
  
  private _handleProgressChange(progressFileName) {
    const lines = fs.readFileSync(progressFileName).toString().toLowerCase().split(os.EOL);
    const isRunning   = (lines[0] === 'true');
    const hasErrors   = (lines[1] === 'true');
    const hasWarnings = (lines[2] === 'true');
    
    const progressState = (
      isRunning
        ? ProgressState.Running
        : hasErrors
          ? ProgressState.Error
          : hasWarnings
            ? ProgressState.Warning
            : ProgressState.Success
    );
    
    this.emit('progressChange', progressState);
  }
}
