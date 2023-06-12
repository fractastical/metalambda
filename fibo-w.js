// source: https://github.com/dherault/fibonacci_spiral
//
var texts = ["","","","","","","i","i am","i breathe", "i am joel", "i learned my own name", "I wrote a book about aliens", "I learned to code in QBasic", "I built worlds", "I wrote poems" ]
var subtexts = ["","","","","","","","","a lot", "dietz", "", "and dragons", "and Pascal and Java", "and designed games", "and prayed" ]
var subsubtexts = ["","","","","","","","","a lot", "dietz", "", "and dragons", "and Pascal and Java", "and designed games", "and prayed" ]

var otexts = ["","","","","","","i","i was","breathed", "i am joel", "i studied my biocomputer", "I wrote a book about holonics", "I invented my own progamming language", "I built a platform for creating words", "I turned my poems into song" ]
var osubtexts = ["","","","","","","","","a lot", "sven dietz", "and groked time", "and cryptoeconomics", "called metalambda", "and world making games", "and built a metamonastary" ]
var osubsubtexts = ["","","","","","","","","", "", "", "and superintelligence", "and integrated ai", "and games within those games", "and chains of beads" ]

var imgs = ["","","","","","","","","i breathe", "", "img/jd/joel-kozmos.jpeg", "", "", "", "" ]


// var time=0;
//var i = false;

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
    if(time == 1) {
         _.fillText(otexts[i], 10, 10);
         }
    else {
      _.fillText(texts[i], 10, 10);
      console.log("ciao");

    }

  _.save();
 _.rotate(Math.PI/2);
// context.textAlign = "center";
var offset = texts[i].length * 5;
var ooffset = otexts[i].length * 5;
var oooffset = osubtexts[i].length * 6;

  // if(otexts[i])
  //     _.fillText(subtexts[i], 15, -offset);
if(time == 1 && otexts[i])
      _.fillText(osubtexts[i], 15, -ooffset);
else if(texts[i])
   _.fillText(subtexts[i], 15, -offset);


 _.rotate(Math.PI/2);

 console.log(size);
if(i && osubsubtexts[i])
  _.fillText(osubsubtexts[i], (-180 + size / 22), -oooffset);

//_.fillText(osubsubtexts[i], -180, -150);

//TODO: doesn't tile properly
// if(imgs[i])
// {
//    const img = new Image();
//    img.onload = () => {
//      _.drawImage(img, 0, 0);
//    };
//    img.src = imgs[i];
// }


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
