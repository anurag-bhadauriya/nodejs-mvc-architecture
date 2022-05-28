const cron = require('node-cron');

class Scheduler {

    constructor(cron) {
        this.cron = cron;
        this.tasks = {
            '*/10 * * * * *': [
                require('./tasks/remove-expired-refresh-tokens')
            ]
        };
    }

    scheduleTasks() {
        for (const [interval, tasks] of Object.entries(this.tasks)) {
            for (const task of tasks) {
                try {
                    this.cron.schedule(interval, async () => {
                        await new task().handle();
                    });
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }
}

module.exports = new Scheduler(cron);