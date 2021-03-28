// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/




/**********
 * 
 * TODO: Able to validate, now I need to update the Shuttle Stauts properly and give everything the green light once it's correct
 * 
 * ********/
window.addEventListener("load", function() //event listener looking for the window to load properly
{
   console.log("window loaded");
   const form = document.getElementById("launchForm"); //grabbibng the reference to the HMTL form element
   const pilotNameInput = document.querySelector("input[name=pilotName]");
   //console.log(pilotNameInput.value);
   const coPilotNameInput = document.querySelector("input[name=copilotName]");
   //console.log(coPilotNameInput.value);
   const fuelLevelInput = document.querySelector("input[name=fuelLevel]");
   const cargoMassInput = document.querySelector("input[name=cargoMass]");
   
   function checkInputs(inputs) //check inputs values
   {
      //console.log(inputs);

      if(!isNaN(inputs[0]) || inputs[0]==='')
      {
         alert("Invalid Input: Please enter a valid Pilot Name.");
         return false;        
      }
      // else
      // {
      //    document.getElementById("pilotStatus").innerHTML = `Pilot ${inputs[i]} is ready for launch`;
      // }
      else if(!isNaN(inputs[1]) || inputs[1]==='')
      {
         alert("Invalid Input: Please input a valid Copilot Name.");
         return false;
      }
      // else
      // {
      //    document.getElementById("copilotStatus").innerHTML = `Co-pilot ${inputs[i]} is ready for launch`;
      // }
      else if(isNaN(inputs[2]) || inputs[2]==='')
      {
         alert("Invalid Input: Please enter a number of (L) for Fuel Level.");
         return false;
      }
      
      else if(isNaN(inputs[3]) || inputs[3]==='')
      {
         alert("Invalid Input: Please enter a number of (kg) for Cargo Mass.");
         return false;
      }
      
        
      return true;
   }

   function statusCheckUpdate(inputs)
   {
      if(inputs[0]==='')
      {
         document.getElementById("pilotStatus").innerHTML = `Pilot ${inputs[0]} is not ready for launch`;
      }
      else if(inputs[0])
      {
         document.getElementById("pilotStatus").innerHTML = `Pilot ${inputs[0]} is ready for launch`;
      }
      
      if(inputs[1]==='')
      {
         document.getElementById("copilotStatus").innerHTML = `Co-pilot ${inputs[1]} is not ready for launch`;
      }
      
      else if(inputs[1])
      {
         document.getElementById("copilotStatus").innerHTML = `Co-pilot ${inputs[1]} is ready for launch`;
      }
      
      
      
      if(inputs[2]<10000)
      {
         document.getElementById("launchStatus").style.color ="red";
         document.getElementById("launchStatus").innerHTML = `Shuttle Not Ready For Launch`;
         document.getElementById("faultyItems").style.visibility='visible';
         document.getElementById("fuelStatus").innerHTML = `Fuel level too low for launch`;
         //return false;
      }
      if (inputs[2]==='')
      {
         document.getElementById("fuelStatus").innerHTML = `Fuel level missing`;
      }
      
      if(inputs[3]>10000)
      {
         document.getElementById("launchStatus").style.color ="red";
         document.getElementById("launchStatus").innerHTML = `Shuttle Not Ready For Launch`;
         document.getElementById("faultyItems").style.visibility='visible';
         document.getElementById("cargoStatus").innerHTML = `Cargo mass too high for launch`;
         //return false;
      }
      
      if(inputs[3] === '')
      {
         document.getElementById("cargoStatus").innerHTML = `Cargo mass missing`;
      }
      
      if(inputs[2]>=10000 && inputs[3]<=10000 && inputs[2] !=='' && inputs[3] !=='')
      {
         // document.getElementById("launchStatus").style.color ="red";
         // document.getElementById("launchStatus").innerHTML = `Shuttle Not Ready For Launch`;
         // document.getElementById("faultyItems").style.visibility='visible';
         document.getElementById("fuelStatus").innerHTML = `Fuel level high enough for launch`;
         document.getElementById("cargoStatus").innerHTML = `Cargo mass low enough for launch`;
         document.getElementById("launchStatus").style.color ="green";
         document.getElementById("launchStatus").innerHTML = `Shuttle Ready For Launch`;
         document.getElementById("faultyItems").style.visibility='hidden';
         //return false;
      }  
   }
   

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response)
    {
        response.json().then( function(json) 
        {
            const missionTarget = document.getElementById("missionTarget");
            
            let div = document.createElement('div');  
            const randIndex = Math.floor(Math.random() * json.length)
            
            div.innerHTML = `
               <h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${json[randIndex].name}</li>
                  <li>Diameter: ${json[randIndex].diameter}</li>
                  <li>Star: ${json[randIndex].star}</li>
                  <li>Distance from Earth: ${json[randIndex].distance}</li>
                  <li>Number of Moons: ${json[randIndex].moons}</li>
               </ol>
               <img src="${json[randIndex].image}">
            </div>`;
            missionTarget.appendChild(div);
            
      
        });
   });

   form.addEventListener("submit", function(event) //event listener for submitting a form
   {
      
      event.preventDefault();//prevents form submission
      let inputs = [];
      const pilotNameValue = pilotNameInput.value.trim();
      //console.log(pilotNameValue);
      inputs.push(pilotNameValue);
      const coPilotNameValue = coPilotNameInput.value.trim();
      inputs.push(coPilotNameValue);
      const fuelLevelValue = fuelLevelInput.value.trim();
      inputs.push(fuelLevelValue);
      const cargoMassValue = cargoMassInput.value.trim();
      inputs.push(cargoMassValue);
      checkInputs(inputs);
      statusCheckUpdate(inputs);
      
      // if(checkInputs(inputs));
      // {
      //    statusCheckUpdate(inputs);
      // }

   });
});