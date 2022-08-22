

            var startingEnergyEnergy = 10000;
            var startingSize = 100;
            var startingNumberOfCubes = 50;
            var numberOfComputationalStepsPerGame = 10000;
            var numberofCeullarAutonoma = 3;
            var numberofComputationalStepsCompleted = 0;
            var physicsRules = [];
            var allActiveCAs = [];

            const hexToDecimal = hex => parseInt(hex, 16);
            const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
            var address1 = genRanHex(40);

            var xFreq = hexToDecimal(address1.substring(0,3))  % 200;
            var yFreq = hexToDecimal(address1.substring(3,6))  % 200;
            var zFreq = hexToDecimal(address1.substring(6,9)) % 200;
            var color = hexToDecimal(address1.substring(9,12));
            var splitFreq = hexToDecimal(address1.substring(12,15));
            var mutation = hexToDecimal(address1.substring(15,18));
            var music = hexToDecimal(address1.substring(18,21));

            document.getElementById("xFreq").value = xFreq;
            document.getElementById("yFreq").value = yFreq;
            document.getElementById("zFreq").value = zFreq;
            document.getElementById("color").value = color;
            document.getElementById("splitFreq").value = splitFreq;
            document.getElementById("mutation").value = mutation;

            var address2 = genRanHex(40);

            var xFreq2 = hexToDecimal(address2.substring(0,3)) % 200;
            var yFreq2 = hexToDecimal(address2.substring(3,6)) % 200;
            var zFreq2 = hexToDecimal(address2.substring(6,9)) % 200;
            var color2 = hexToDecimal(address2.substring(9,12));
            var splitFreq2 = hexToDecimal(address2.substring(12,15));
            var mutation2 = hexToDecimal(address2.substring(15,18));
            var music2 = hexToDecimal(address2.substring(18,21));

            document.getElementById("xFreq2").value = xFreq2 ;
            document.getElementById("yFreq2").value = yFreq2;
            document.getElementById("zFreq2").value = zFreq2;
            document.getElementById("color2").value = color2;
            document.getElementById("splitFreq2").value = splitFreq2;
            document.getElementById("mutation2").value = mutation2;





            // 1: right
            // 2: up
            // 3: forward
            // 4: color
            // 5:
            // mutation
            // color

            function mutateCoreVariables()
            {


            }

            function runGeneration()
            {
              // run X number of computational steps
              // mutate lambdas
              //

            }

            function metaLambda(ca)
            {

              var startTime = performance.now();

              var current_x=ca.position.x;
              var current_y=ca.position.y;
              var current_z=ca.position.z;

              console.log(numberofComputationalStepsCompleted );

              // console.log(ca.xFreq);
              // console.log(ca.seed);

              if(ca.xFreq > 100)
                if((numberofComputationalStepsCompleted % 100) < (ca.xFreq % 100))
                   current_x += 1;
              else if (ca.xFreq <= 100)
                if((numberofComputationalStepsCompleted % 100) < (ca.xFreq))
                  current_x  -= 1;

              if(ca.yFreq > 100)
                if((numberofComputationalStepsCompleted % 100) < (ca.yFreq % 100))
                   current_y += 1;
              else if (ca.yFreq <= 100)
                if((numberofComputationalStepsCompleted % 100) < (ca.yFreq))
                  current_y  -= 1;

              if(ca.zFreq > 100)
                if((numberofComputationalStepsCompleted % 100) < (ca.zFreq % 100))
                   current_z += 1;
              else if (ca.zFreq <= 100)
                if((numberofComputationalStepsCompleted % 100) < (ca.zFreq))
                  current_z  -= 1;


               var newBall = BABYLON.Mesh.CreateSphere("balloon1", 10, 2.0, scene);
               newBall.material = new BABYLON.StandardMaterial("matBallon", scene);
               newBall.material.emissiveColor = ca.material.emissiveColor;
               newBall.position = new BABYLON.Vector3(current_x, current_y, current_z);
               newBall.lastx = ca.position.x;
               newBall.lasty = ca.position.y;
               newBall.lastz = ca.position.z;
               newBall.seed = ca.seed;
               newBall.xFreq = ca.xFreq;
               newBall.yFreq = ca.yFreq;
               newBall.zFreq = ca.zFreq;

               ca.material.alpha = 0.5;

               var endTime = performance.now()
               lambdasExecutionCount[1]++;
               lambdasExecutionTime[1] += (endTime - startTime)

               return newBall;

            }






            var cubeList = [];
            var sortedCubeList = [];

            function metaLog (string) {

              logBlob += string;
              console.log(string);

            }

            // function metaLambda (seed, color, ca) {
            //
            //
            //  var mySeed = seed % 100 + numberofComputationalStepsCompleted % 10;
            //  /* const lambda1 = new CodeFlask('#codeArea', { language: 'js' }); */
            //
            //  if (mySeed > 90)
            //   return forwards (color,ca);
            //  else if (mySeed > 75)
            //    return chaoticforwards (color,ca);
            //  else if (mySeed > 60)
            //      return exochaoticforwards (color,ca);
            //  else if (mySeed > 45)
            //     return exochaoticdeviant (color,ca);
            //  else
            //     return chaoticdeviant (color,ca);
            // }
            const basicLambda = function(color,ca)
            {



            }

            /* const modifiableCombatFunction(ship)
            {
              var enemyCoords = enemyInSight();
              var energyCoords = energyDetected();

              if(enemyCoords)
                fireLaser(enemyCoords);
              else if(energyCoords)
                goTo(energyCoords);
              else if(self.destination)
                goTo(self.destination)
              else
                exochaoticforwards;
            } */

            const forwards = function (color,ca) {

              var startTime = performance.now();


              var current_x=ca.position.x;
              var current_y=ca.position.y;
              var current_z=ca.position.z;
              current_x++;
              current_y++;
              current_z++;

              // ca.material.alpha = 0.5;
               var newBall = BABYLON.Mesh.CreateSphere("balloon1", 10, 2.0, scene);
               newBall.material = new BABYLON.StandardMaterial("matBallon", scene);
               newBall.material.emissiveColor = color;
               newBall.position = new BABYLON.Vector3(current_x, current_y, current_z);
               newBall.lastx = ca.position.x;
               newBall.lasty = ca.position.y;
               newBall.lastz = ca.position.z;
               newBall.seed = ca.seed;
               ca.material.alpha = 0.5;

               var endTime = performance.now();
               lambdasExecutionCount[0]++;
               lambdasExecutionTime[0] += (endTime - startTime);
               // console.log("l0ext:"+ lambdasExecutionTime[0] +"count:"+lambdasExecutionCount[0]);
               return newBall;
              };


              const chaoticforwards = function (color,ca) {

                var startTime = performance.now();

                var current_x=ca.position.x;
                var current_y=ca.position.y;
                var current_z=ca.position.z;

                if (Math.random() < 0.55)
                  current_x++;
                if (Math.random() < 0.35)
                  current_y++;
                if (Math.random() < 0.45)
                  current_z++;

                 var newBall = BABYLON.Mesh.CreateSphere("balloon1", 10, 2.0, scene);
                 newBall.material = new BABYLON.StandardMaterial("matBallon", scene);
                 newBall.material.emissiveColor = color;
                 newBall.position = new BABYLON.Vector3(current_x, current_y, current_z);
                 newBall.lastx = ca.position.x;
                 newBall.lasty = ca.position.y;
                 newBall.lastz = ca.position.z;
                 newBall.seed = ca.seed;
                 ca.material.alpha = 0.5;

                 var endTime = performance.now()
                 lambdasExecutionCount[1]++;
                 lambdasExecutionTime[1] += (endTime - startTime)

                 return newBall;
              };

              const exochaoticforwards = function (color,ca) {

                var startTime = performance.now();

                var current_x=ca.position.x;
                var current_y=ca.position.y;
                var current_z=ca.position.z;

                if (Math.random() < 0.25)
                  current_x++;
                if (Math.random() < 0.45)
                  current_y++;
                if (Math.random() < 0.65)
                  current_z++;

                 var newBall = BABYLON.Mesh.CreateSphere("balloon1", 10, 2.0, scene);
                 newBall.material = new BABYLON.StandardMaterial("matBallon", scene);
                 newBall.material.emissiveColor = color;
                 newBall.position = new BABYLON.Vector3(current_x, current_y, current_z);
                 newBall.lastx = ca.position.x;
                 newBall.lasty = ca.position.y;
                 newBall.lastz = ca.position.z;
                 newBall.seed = ca.seed;
                 ca.material.alpha = 0.5;

                 var endTime = performance.now()
                 lambdasExecutionCount[2]++;
                 lambdasExecutionTime[2] += (endTime - startTime)

                 return newBall;
              };

              const exochaoticdeviant = function (color,ca) {

                var startTime = performance.now();

                var current_x=ca.position.x;
                var current_y=ca.position.y;
                var current_z=ca.position.z;

                if (Math.random() < 0.25)
                  current_x++;
                if (Math.random() < 0.50)
                  current_y--;
                if (Math.random() < 0.50)
                  current_z--;

                 var newBall = BABYLON.Mesh.CreateSphere("balloon1", 10, 2.0, scene);
                 newBall.material = new BABYLON.StandardMaterial("matBallon", scene);
                 newBall.material.emissiveColor = color;
                 newBall.position = new BABYLON.Vector3(current_x, current_y, current_z);
                 newBall.lastx = ca.position.x;
                 newBall.lasty = ca.position.y;
                 newBall.lastz = ca.position.z;
                 newBall.seed = ca.seed;
                 ca.material.alpha = 0.5;

                 var endTime = performance.now()
                 lambdasExecutionCount[3]++;
                 lambdasExecutionTime[3] += (endTime - startTime)

                 return newBall;
              };

              const chaoticdeviant = function (color,ca) {

                var startTime = performance.now();

                var current_x=ca.position.x;
                var current_y=ca.position.y;
                var current_z=ca.position.z;

                if (Math.random() < 0.75)
                  current_x--;
                if (Math.random() < 0.50)
                  current_y++;
                if (Math.random() < 0.20)
                  current_z--;

                 var newBall = BABYLON.Mesh.CreateSphere("balloon1", 10, 2.0, scene);
                 newBall.material = new BABYLON.StandardMaterial("matBallon", scene);
                 newBall.material.emissiveColor = color;
                 newBall.position = new BABYLON.Vector3(current_x, current_y, current_z);
                 newBall.lastx = ca.position.x;
                 newBall.lasty = ca.position.y;
                 newBall.lastz = ca.position.z;
                 newBall.seed = ca.seed;
                 ca.material.alpha = 0.5;

                 var endTime = performance.now()
                 lambdasExecutionCount[4]++;
                 lambdasExecutionTime[4] += (endTime - startTime)

                 return newBall;
              };


                var function_descriptions= ["Forwards", "Chaotic Forwards", "Exochaotic Forwards", "Exochaotic Devient", "Chaotic deviant"]
                var lambdas = [forwards, chaoticforwards, exochaoticforwards, exochaoticdeviant, chaoticdeviant];
                var lambdasExecutionCount = [0, 0, 0, 0, 0];
                var lambdasExecutionTime = [0, 0, 0, 0, 0];

                // var metaLambdas = [metalambda(10,ca,color),metalambda(30,ca,color),metalambda(50,ca,color), metalambda(70,ca,color) ]
                var lambdaWinCounter = [0, 0, 0, 0, 0];


                function runMetaStep(numberOfSteps)
                {

                  var startTime = performance.now();

                  for(var i=0;i<numberOfSteps;i++) {
                   runOneStep();
                   }

                   var endTime = performance.now();

                   var executiontime = endTime - startTime;
                   metaLog("totalExecutionTime:" + executiontime + " av per cs:" + executiontime/1000);


                  alert("the winner is...")
                  var highestEnergy = 0;
                  var highestEnergyIndex = 0;
                  var highestEnergySeed = 0;

                  lambdasExecutionCount.forEach(function (ca, index, arr) {
                    metaLog(function_descriptions[index] + ": " + lambdasExecutionTime[index] + "ms count:" + lambdasExecutionCount[index] + "av execution:" + (lambdasExecutionTime[index]/lambdasExecutionCount[index]));
                  });

                   allActiveCAs.forEach(function (ca, index, arr) {
                     if (ca.energy > highestEnergy)
                       {
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

                    // if(ship1 && ship2)
                    // {
                    //
                    //
                    //
                    //                           ship1.position.y += ship1xDir;
                    //                           ship1.position.x += ship1yDir;
                    //                           ship1.position.z += ship1zDir;
                    //
                    //
                    //                             ship2.position.y += ship2xDir;
                    //                             ship2.position.x += ship2yDir;
                    //                             ship2.position.z +- ship2zDir;
                    //
                    //                             if(ship1.position.x > startingSize)
                    //                              ship1.position.x = 0;
                    //                              if(ship1.position.y > startingSize)
                    //                               ship1.position.y = 0;
                    //                              if(ship1.position.z > startingSize)
                    //                                ship1.position.z = 0;
                    //                              if(ship1.position.x < 0)
                    //                               ship1.position.x = startingSize;
                    //                               if(ship1.position.y < 0)
                    //                                ship1.position.y = startingSize;
                    //                               if(ship1.position.z < 0)
                    //                                 ship1.position.z = startingSize;
                    //
                    //                                 if(ship2.position.x > startingSize)
                    //                                  ship2.position.x = 0;
                    //                                  if(ship2.position.y > startingSize)
                    //                                   ship2.position.y = 0;
                    //                                  if(ship2.position.z > startingSize)
                    //                                    ship2.position.z = 0;
                    //                                  if(ship2.position.x < 0)
                    //                                   ship2.position.x = startingSize;
                    //                                   if(ship2.position.y < 0)
                    //                                    ship2.position.y = startingSize;
                    //                                   if(ship2.position.z < 0)
                    //                                     ship2.position.z = startingSize;
                    //
                    //
                    //                             /* moveShip(ship1) */
                    //                             castRay();
                    //                             castRay2();
                    //
                    //
                    // }
                      allActiveCAs.forEach(function (currentValue, index, arr) {

                          // console.log(currentValue);
                          // console.log("activeCA");

                          // arr[index] = item * 10;

                         var lastCA =  currentValue;
                         currentValue = metaLambda(lastCA);
                         currentValue.energy = lastCA.energy - 1;
                         if  (currentValue.energy <  2)
                             arr.splice(index, 1);

                         if(currentValue.position.x > startingSize)
                          currentValue.position.x = 0;
                          if(currentValue.position.y > startingSize)
                           currentValue.position.y = 0;
                          if(currentValue.position.z > startingSize)
                            currentValue.position.z = 0;
                          if(currentValue.position.x < 0)
                           currentValue.position.x = startingSize;
                           if(currentValue.position.y < 0)
                            currentValue.position.y = startingSize;
                           if(currentValue.position.z < 0)
                             currentValue.position.z = startingSize;

                            var caindex = currentValue.position.x + currentValue.position.y + currentValue.position.z;

                            if(sortedCubeList[caindex])
                            {
                              // console.log("cube at same index ");
                              // console.log(sortedCubeList[caindex].position.x);
                              if(currentValue.position.x == sortedCubeList[caindex].position.x && currentValue.position.y == sortedCubeList[caindex].position.y && currentValue.position.z == sortedCubeList[caindex].position.z)
                              {
                                console.log("match life cube");
                                currentValue.energy += 1111;
                                // team1points += 100;
                                ca1lbutton.textBlock.text = team1points + " points";

                              }

                            }
                            // console.log("activeCA..");

                         // console.log("activeCA"+lastCA.energy+currentValue.energy);
                         // ca1lbutton.textBlock.text = currentValue.energy + " energy";
                         arr[index] = currentValue;


                      })


                        numberofComputationalStepsCompleted++;
                        // doesn't work
                        // if (numberofComputationalStepsCompleted % 15 == 0)
                        //   scene.render();

                        var stepsToDisplay = numberOfComputationalStepsPerGame - numberofComputationalStepsCompleted;
                        // if(stepsToDisplay != 0)
                        //   compstepbutton.textBlock.text = stepsToDisplay+ " remaining";
                        // else
                        //  compstepbutton.textBlock.text = "Export game";

                }
