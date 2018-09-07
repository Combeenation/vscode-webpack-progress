import * as fs from 'fs';
import { EventEmitter } from 'events';
import * as os from 'os';

export class ProgressWatcher extends EventEmitter {
  private timer: NodeJS.Timer;
  
  public initializeWacher() {
    const tempFile = `${os.tmpdir()}/webpack-progress`;
    let lastModify = new Date(200, 10, 10);
    this.timer = setInterval(() => {
      fs.stat(tempFile, (err, state) => {
        if (!err && state.mtime > lastModify) {
          const content = fs.readFileSync(tempFile).toString();
          const percentage = parseInt(content, 10);
          this.emit('progressChange', percentage);
          lastModify = state.mtime;
        }
      });
    }, 1000);
  }

  public dispose() {
    clearInterval(this.timer);
  }
}
