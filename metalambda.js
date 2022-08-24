var startingEnergyEnergy = 10000;
var startingSize = 100;
var startingNumberOfCubes = 50;
var numberOfComputationalStepsPerGame = 10000;
var numberofCellularAutomata = 3;
var numberofComputationalStepsCompleted = 0;
var physicsRules = [];
var allActiveCAs = [];
var logBlob = "";

const hexToDecimal = hex => parseInt(hex, 16);
const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
var address1 = genRanHex(40);

document.getElementById("address").value = "0x" + address1;


var xFreq = hexToDecimal(address1.substring(0, 3)) % 200;
var yFreq = hexToDecimal(address1.substring(3, 6)) % 200;
var zFreq = hexToDecimal(address1.substring(6, 9)) % 200;
var colora = address1.substring(9, 11);
var colorb = address1.substring(11, 13);
var colorc = address1.substring(13, 15);
var splitFreq = hexToDecimal(address1.substring(15, 17));
var mutation = hexToDecimal(address1.substring(17, 19));
var music = hexToDecimal(address1.substring(19, 21));
var positionX = hexToDecimal(address1.substring(21, 23)) % 100;
var positionY = hexToDecimal(address1.substring(23, 25)) % 100;
var positionZ = hexToDecimal(address1.substring(25, 27)) % 100;

document.getElementById("xFreq").value = xFreq;
document.getElementById("yFreq").value = yFreq;
document.getElementById("zFreq").value = zFreq;
document.getElementById("color").value = colora +  colorb  + colorc;
document.getElementById("color").style.backgroundColor = "#" + colora + colorb + colorc;

document.getElementById("splitFreq").value = splitFreq;
document.getElementById("mutation").value = mutation;



var address2 = genRanHex(40);

var xFreq2 = hexToDecimal(address2.substring(0, 3)) % 200;
var yFreq2 = hexToDecimal(address2.substring(3, 6)) % 200;
var zFreq2 = hexToDecimal(address2.substring(6, 9)) % 200;
var colora2 = address2.substring(9, 11);
var colorb2 = address2.substring(11, 13);
var colorc2 = address2.substring(13, 15);
var splitFreq2 = hexToDecimal(address2.substring(12, 15));
var mutation2 = hexToDecimal(address2.substring(15, 18));
var music2 = hexToDecimal(address2.substring(18, 21));



document.getElementById("xFreq2").value = xFreq2;
document.getElementById("yFreq2").value = yFreq2;
document.getElementById("zFreq2").value = zFreq2;
document.getElementById("color2").value = colora2 + colorb2 + colorc2;
document.getElementById("color2").style.backgroundColor = "#" + colora2 + colorb2 + colorc2;

document.getElementById("splitFreq2").value = splitFreq2;
document.getElementById("mutation2").value = mutation2;




function metaLambda(ca) {

    var startTime = performance.now();

    var current_x = ca.position.x;
    var current_y = ca.position.y;
    var current_z = ca.position.z;
    // console.log(ca.xFreq);
    // console.log(ca.seed);

    if (ca.xFreq > 100) {
        if ((numberofComputationalStepsCompleted % 100) < (ca.xFreq % 100))
            current_x += 1;
    } else if (ca.xFreq <= 100)
        if ((numberofComputationalStepsCompleted % 100) < (ca.xFreq))
            current_x -= 1;

    if (ca.yFreq > 100) {
        if ((numberofComputationalStepsCompleted % 100) < (ca.yFreq % 100))
            current_y += 1;
    } else if (ca.yFreq <= 100)
        if ((numberofComputationalStepsCompleted % 100) < (ca.yFreq))
            current_y -= 1;

    if (ca.zFreq > 100) {
        if ((numberofComputationalStepsCompleted % 100) < (ca.zFreq % 100))
            current_z += 1;
    } else if (ca.zFreq <= 100)
        if ((numberofComputationalStepsCompleted % 100) < (ca.zFreq))
            current_z -= 1;


    if (numberofComputationalStepsCompleted != 0 && numberofComputationalStepsCompleted % ca.splitFreq == 0) {
        console.log(ca.splitFreq + " " + numberofComputationalStepsCompleted);

        if (allActiveCAs.length < 12) {
            var splitCA = mutate(ca, ca.mutation);
            allActiveCAs.push(splitCA);

        }

    }
    // console.log('color:'+ca.color);

    var newBall = BABYLON.Mesh.CreateSphere("balloon1", 10, 2.0, scene);
    newBall.material = new BABYLON.StandardMaterial("matBallon", scene);
    newBall.material.emissiveColor = new BABYLON.Color3.FromHexString(ca.color);
    newBall.position = new BABYLON.Vector3(current_x, current_y, current_z);
    newBall.lastx = ca.position.x;
    newBall.lasty = ca.position.y;
    newBall.lastz = ca.position.z;
    newBall.seed = ca.seed;
    newBall.xFreq = ca.xFreq;
    newBall.yFreq = ca.yFreq;
    newBall.zFreq = ca.zFreq;
    newBall.color = ca.color;
    newBall.splitFreq = ca.splitFreq;
    newBall.mutation = ca.mutation;

    ca.material.alpha = 0.5;

    var endTime = performance.now()
    // lambdasExecutionCount[1]++;
    // lambdasExecutionTime[1] += (endTime - startTime)

    return newBall;

}



var cubeList = [];
var sortedCubeList = [];

function metaLog(string) {

    logBlob += string;
    console.log(string);

}

function mutate(ca, mutationStrength) {

    var splitCA = BABYLON.Mesh.CreateSphere("balloon1", 10, 2.0, scene);
    console.log("mutate:" + mutationStrength)
    if (mutationStrength > 2000) {
        splitCA.xFreq = ca.xFreq + (mutationStrength % 50);
        splitCA.yFreq = ca.yFreq + (mutationStrength % 50);
        splitCA.zFreq = ca.zFreq + (mutationStrength % 50);
        splitCA.mutation = mutationStrength + (mutationStrength % 500);
    } else if (mutationStrength > 1000) {
        splitCA.xFreq = ca.xFreq + (mutationStrength % 25);
        splitCA.yFreq = ca.yFreq + (mutationStrength % 25);
        splitCA.zFreq = ca.zFreq + (mutationStrength % 25);
        splitCA.mutation = mutationStrength + (mutationStrength % 250);

    } else if (mutationStrength > 500) {
        splitCA.xFreq = ca.xFreq + (mutationStrength % 10);
        splitCA.yFreq = ca.yFreq + (mutationStrength % 10);
        splitCA.zFreq = ca.zFreq + (mutationStrength % 10);
        splitCA.mutation = mutationStrength + (mutationStrength % 100);
    } else {
        splitCA.xFreq = ca.xFreq - (mutationStrength % 10);
        splitCA.yFreq = ca.yFreq - (mutationStrength % 10);
        splitCA.zFreq = ca.zFreq - (mutationStrength % 10);
        splitCA.mutation = mutationStrength + 1;
    }

    splitCA.material = new BABYLON.StandardMaterial("matBallon", scene);
    splitCA.material.emissiveColor = ca.material.emissiveColor;
    splitCA.position = new BABYLON.Vector3(ca.position.x, ca.position.y, ca.position.z);
    splitCA.lastx = ca.position.x;
    splitCA.lasty = ca.position.y;
    splitCA.lastz = ca.position.z;
    splitCA.seed = ca.seed;
    splitCA.color = incrementColor(ca.color, mutationStrength);
    splitCA.splitFreq = ca.splitFreq;

    return splitCA;

}

var incrementColor = function(color, step) {
    var colorToInt = parseInt(color.substr(1), 16), // Convert HEX color to integer
        nstep = parseInt(step); // Convert step to integer
    if (!isNaN(colorToInt) && !isNaN(nstep)) { // Make sure that color has been converted to integer
        colorToInt += nstep; // Increment integer with step
        var ncolor = colorToInt.toString(16); // Convert back integer to HEX
        ncolor = '#' + (new Array(7 - ncolor.length).join(0)) + ncolor; // Left pad "0" to make HEX look like a color
        if (/^#[0-9a-f]{6}$/i.test(ncolor)) { // Make sure that HEX is a valid color
            return ncolor;
        }
    }
    return color;
};




// var function_descriptions= ["Forwards", "Chaotic Forwards", "Exochaotic Forwards", "Exochaotic Devient", "Chaotic deviant"]
// var lambdas = [forwards, chaoticforwards, exochaoticforwards, exochaoticdeviant, chaoticdeviant];
var lambdasExecutionCount = [0, 0, 0, 0, 0];
var lambdasExecutionTime = [0, 0, 0, 0, 0];

// var metaLambdas = [metalambda(10,ca,color),metalambda(30,ca,color),metalambda(50,ca,color), metalambda(70,ca,color) ]
var lambdaWinCounter = [0, 0, 0, 0, 0];


function runMetaStep(numberOfSteps) {

    var startTime = performance.now();

    for (var i = 0; i < numberOfSteps; i++) {
        runOneStep();
    }

    var endTime = performance.now();

    var executiontime = endTime - startTime;
    metaLog("totalExecutionTime:" + executiontime + " av per cs:" + executiontime / 1000);


    alert("the winner is...")
    var highestEnergy = 0;
    var highestEnergyIndex = 0;
    var highestEnergySeed = 0;

    lambdasExecutionCount.forEach(function(ca, index, arr) {
        metaLog(function_descriptions[index] + ": " + lambdasExecutionTime[index] + "ms count:" + lambdasExecutionCount[index] + "av execution:" + (lambdasExecutionTime[index] / lambdasExecutionCount[index]));
    });

    allActiveCAs.forEach(function(ca, index, arr) {
        if (ca.energy > highestEnergy) {
            highestEnergy = ca.energy;
            highestEnergyIndex = index;
            highestEnergySeed = ca.seed;
        }

    });

    metaLog("winner seed:" + highestEnergySeed + " with energy of " + highestEnergy);
    lambdaWinCounter[highestEnergyIndex]++;
    alert("seed " + highestEnergySeed + " has a win count of " + lambdaWinCounter[highestEnergyIndex] + " wins");

    let values = [
        [
            "Winning Seed", highestEnergySeed, "Winning Energy", highestEnergy
        ],
        // Additional rows ...
    ];
    const body = {
        values: values,
    };
    /* gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      range: range,
      valueInputOption: valueInputOption,
      resource: body,
    }).then((response) => {
      const result = response.result;
      console.log(`${result.updates.updatedCells} cells appended.`);
    }); */


}


function runOneStep() {


  if (numberofComputationalStepsCompleted > 0 && numberofComputationalStepsCompleted % 100 == 0) {

      console.log(numberofComputationalStepsCompleted + ":" + allActiveCAs.length);
      var mydiv = document.getElementById("stats");
      var newcontent = document.createElement('div');
      newcontent.innerHTML = "step " + numberofComputationalStepsCompleted +". ";

      while (newcontent.firstChild) {
          mydiv.appendChild(newcontent.firstChild);
      }

  }


    allActiveCAs.forEach(function(currentValue, index, arr) {


        var lastCA = currentValue;
        currentValue = metaLambda(lastCA);
        currentValue.energy = lastCA.energy - 1;
        if (currentValue.energy < 2)
            arr.splice(index, 1);

        if (currentValue.position.x > startingSize)
            currentValue.position.x = 0;
        if (currentValue.position.y > startingSize)
            currentValue.position.y = 0;
        if (currentValue.position.z > startingSize)
            currentValue.position.z = 0;
        if (currentValue.position.x < 0)
            currentValue.position.x = startingSize;
        if (currentValue.position.y < 0)
            currentValue.position.y = startingSize;
        if (currentValue.position.z < 0)
            currentValue.position.z = startingSize;

        var caindex = currentValue.position.x + currentValue.position.y + currentValue.position.z;

        if (sortedCubeList[caindex]) {
            // console.log("cube at same index ");
            // console.log(sortedCubeList[caindex].position.x);
            if (currentValue.position.x == sortedCubeList[caindex].position.x && currentValue.position.y == sortedCubeList[caindex].position.y && currentValue.position.z == sortedCubeList[caindex].position.z) {
                console.log("match life cube");
                currentValue.energy += 1111;
                // team1points += 100;
                // ca1lbutton.textBlock.text = team1points + " points";

            }

        }

        arr[index] = currentValue;


    })


    numberofComputationalStepsCompleted++;

    var stepsToDisplay = numberOfComputationalStepsPerGame - numberofComputationalStepsCompleted;
    // if(stepsToDisplay != 0)
    //   compstepbutton.textBlock.text = stepsToDisplay+ " remaining";
    // else
    //  compstepbutton.textBlock.text = "Export game";

}
