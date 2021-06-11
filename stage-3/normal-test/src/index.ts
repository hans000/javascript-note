// import MPlayer from '@hans000/media-player';

// const canvas = document.querySelector('#canvas') as HTMLCanvasElement
// const play = document.querySelector('#play') as HTMLButtonElement
// const pause = document.querySelector('#pause') as HTMLButtonElement
// const btnData = document.querySelector('#data') as HTMLButtonElement
// const ctx = canvas.getContext('2d')

// const player = new MPlayer(['./1.mp3'], {
//     auto: true,
//     fftSize: 512,
// })
// play.onclick = () => {
//     player.play()
// }
// pause.onclick = () => {
//     player.pause()
// }
// const COUNT = 120
// const HEIGHT = 500, WIDTH = 500
// const radio = window.devicePixelRatio
// canvas.width = canvas.width * radio
// canvas.height = canvas.height * radio
// const tileHeight = 100
// const perAngle = Math.PI * 2 / COUNT
// const R = 100
// const tileWidth = 4
// const minHeight = 4

// const dx = canvas.width / 2
// const dy = canvas.height / 2
// player.onload = () => {
//     draw()
// }
// let flag = true
// function draw() {
//     ctx.clearRect(0, 0, WIDTH * radio, HEIGHT * radio)
//     const data = player.getData()
//     if (data) {
//         data.forEach((e, i) => {
//             if (i >= COUNT) {
//                 return
//             }
//             ctx.save()
//             const angle = perAngle * i
//             ctx.fillStyle = '#f9f9b8'
//             ctx.translate(dx, dy)
//             ctx.rotate(angle)
//             ctx.fillRect(R, 0 - tileWidth / 2, e + minHeight, tileWidth)
//             ctx.restore()
//         })
//         flag = false
//     }
//     requestAnimationFrame(draw)
// }


function foo() {
    if (__DEV__) {
        console.log(12345);
    }
    console.log(67890);
}