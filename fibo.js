// source: https://github.com/dherault/fibonacci_spiral

const fcanvas = document.getElementById('layer1')

fcanvas.width = 800;
fcanvas.height = 600;

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

_.lineWidth = 1
_.strokeStyle = 'black'

_.translate(width / 2, height / 2)
// _.rotate(-Math.PI / 2)

for (let i = 0; i < 15; i++) {
  drawSquareAndQuarterCircle(size)

  const tempSize = previousSize
  previousSize = size
  size += tempSize

  // if(i==4)
  //   _.fillText("middle way", _.width,_.height);
  //
  //
  // if(i==10) {
  //   console.log(size);
  //   _.fillText("middle way", _.width,_.height);
  //   }

  _.translate(-tempSize, 0)
  _.rotate(-Math.PI / 2)
}
