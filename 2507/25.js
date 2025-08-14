const lights = ['红灯', '黄灯', '绿灯']

const sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function play(idx) {
    if (idx === lights.length) {
        idx = 0
    }
    console.log(lights[idx])
    await sleep(1000)
    play(idx + 1)
}

play(0)