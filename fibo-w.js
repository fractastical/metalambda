// source: https://github.com/dherault/fibonacci_spiral
//
var texts = ["","","","","","","i","i am","i breathe", "i am joel", "i knew my own name", "I wrote a book about aliens", "I learned to code in Pascal", "I designed games", "I wrote poems" ]
const fcanvas = document.getElementById('layer1')

var coords = [];

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
  coords.push(size);
  console.log(coords);
  try {
  _.fillText(texts[i], 10, 10);
  _.save();
 _.rotate(Math.PI/2);
// context.textAlign = "center";
if(texts[i]) 
  _.fillText("I love pizza", 15, -75);
_.restore();

} catch {

}
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
