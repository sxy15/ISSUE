// 并行任务
// addTask(1000, () => { console.log(1)})

class Task {
    constructor(max) {
        this.tasks = []
        this.maxCount = max || 2
        this.currentCount = 0
    }

    add(time, callback) {
        this.tasks.push({ time, callback })
        if (this.currentCount < this.maxCount) {
            this.currentCount++
            this.run()
        }
    }

    run() {
        const { time, callback } = this.tasks.shift()
        setTimeout(() => {
            callback()
            this.currentCount--
            if (this.tasks.length) {
                this.run()
            }
        }, time)
    }
}

const task = new Task(2)

task.add(1000, () => { console.log(1) })
task.add(2000, () => { console.log(2) })
task.add(3000, () => { console.log(3) })
task.add(4000, () => { console.log(4) })