const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const log = console.log

const subFlow = createFlow([() => delay(1000).then(() => log("c"))]);

createFlow([
    () => log("a"),
    () => log("b"),
    subFlow,
    [() => delay(1000).then(() => log("d")), () => log("e")],
]).run(() => {
    console.log("done");
});
// 需要按照 a,b,延迟1秒,c,延迟1秒,d,e, done 的顺序打印

function createFlow(tasks = []) {
    const sources = tasks.flat()
    const run = async (callback) => {
        while (sources.length) {
            const task = sources.shift()
            await (task.run ? task.run() : task())
        }
        if (callback) {
            callback()
        }
    }

    return {
        run
    }
}