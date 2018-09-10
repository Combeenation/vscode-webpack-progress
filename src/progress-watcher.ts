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
  private _timer: NodeJS.Timer;
  
  public initializeWacher() {
    const tempFile = `${os.tmpdir()}/webpack-progress`;
    let lastModify = new Date(200, 10, 10);
    this._timer = setInterval(() => {
      fs.stat(tempFile, (err, state) => {
        if (!err && state.mtime > lastModify) {
          const lines = fs.readFileSync(tempFile).toString().toLowerCase().split(os.EOL);
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
          lastModify = state.mtime;
        }
      });
    }, 1000);
  }

  public dispose() {
    clearInterval(this._timer);
  }
}
