const fcanvas = document.getElementById('layer1')

fcanvas.width = window.innerWidth
fcanvas.height = window.innerHeight

const { width, height } = fcanvas

const _ = fcanvas.getContext('2d')

function drawSquareAndQuarterCircle(size) {
  _.beginPath()
  _.rect(0, 0, size, size)
  // _.arc(0, 0, size, 0, Math.PI / 2)
  // _.write("hello")
  _.stroke()
}

let size = 1
let previousSize = size

_.lineWidth = 2
_.strokeStyle = 'black'

_.translate(width / 2, height / 2)
// _.rotate(-Math.PI / 2)

for (let i = 0; i < 20; i++) {
  drawSquareAndQuarterCircle(size)

  const tempSize = previousSize
  previousSize = size
  size += tempSize

  _.translate(-tempSize, 0)
  _.rotate(-Math.PI / 2)
}
