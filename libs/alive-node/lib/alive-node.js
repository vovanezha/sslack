const child_process = require('child_process');
const Watcher = require('./watcher');

class AliveNode {
    constructor({logger} = {logger: console}) {
        this.logger = logger;
        this.files = new Set();
        this.child = null;
        this.watcher = new Watcher();

        process.on('exit', () => {
            if (this.child) this.child.kill();
        })
    }

    start({target, index}) {
        this.logger.log(`👀 Watching for ${target}`);
        this.watcher.watch(target, filepath => {
            if (!this.child) {
                return;
            }

            this.child.kill();

            this.child = child_process.fork(index)
            this.logger.log(`👍 Node is working...`);
        });

        this.logger.log(`🙏 Running node...`);
        this.child = child_process.fork(index);
        this.logger.log(`👍 Node is working...`);
    }

}

module.exports = AliveNode
