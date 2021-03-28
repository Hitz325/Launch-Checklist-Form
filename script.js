/*********
 * 
 * Assignment #5: Launch Checklist Form
 * Create a Launch Checklist Form for astronauts to fill out in preparation for launch. The form should do the following:

    -Use preventDefault() to prevent a request from being sent out and the page reloading.
    -Validate the user-submitted data to ensure the following:
        +The user entered something for every field.
        +The user entered text for names and numbers for fuel and cargo levels.
    -With validation, update a list of what is currently ready or not ready for the shuttle launch.
    -Indicate what is good or bad about the shuttle and whether it is ready for launch by using the DOM to update the CSS.
    -Fetch some planetary JSON to update the mission destination with vital facts and figures about where the shuttle is headed
 * 
 * Author: Tom Hitschler
 * Last edited: 3/28/21
 * 
 *********/

window.addEventListener("load", function() //event listener looking for the window to load properly
{
   console.log("window loaded");
   const form = document.getElementById("launchForm"); //grabbibng the reference to the HMTL form element
   const pilotNameInput = document.querySelector("input[name=pilotName]"); //grabbing inputs from text fields
   //console.log(pilotNameInput.value);
   const coPilotNameInput = document.querySelector("input[name=copilotName]");
   //console.log(coPilotNameInput.value);
   const fuelLevelInput = document.querySelector("input[name=fuelLevel]");
   const cargoMassInput = document.querySelector("input[name=cargoMass]");
   
   function checkInputs(inputs) //function to check inputs values
   {
      //console.log(inputs);

      if(!isNaN(inputs[0]) || inputs[0]==='')
      {
         alert("Invalid Input: Please enter a valid Pilot Name.");
         return false;        
      }
      else if(!isNaN(inputs[1]) || inputs[1]==='')
      {
         alert("Invalid Input: Please input a valid Copilot Name.");
         return false;
      }
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

   function statusCheckUpdate(inputs) //function to update status check based on inputs
   {
      //update pilot stauts based on input
      if(inputs[0]==='')
      {
         document.getElementById("pilotStatus").innerHTML = `Pilot ${inputs[0]} is not ready for launch`;
      }
      else if(inputs[0])
      {
         document.getElementById("pilotStatus").innerHTML = `Pilot ${inputs[0]} is ready for launch`;
      }
      //update copilot status based on input
      if(inputs[1]==='')
      {
         document.getElementById("copilotStatus").innerHTML = `Co-pilot ${inputs[1]} is not ready for launch`;
      }
      else if(inputs[1])
      {
         document.getElementById("copilotStatus").innerHTML = `Co-pilot ${inputs[1]} is ready for launch`;
      }
      //update fuel level status based on input
      if(inputs[2]<10000)
      {
         document.getElementById("launchStatus").style.color ="red";
         document.getElementById("launchStatus").innerHTML = `Shuttle Not Ready For Launch`;
         document.getElementById("faultyItems").style.visibility='visible';
         document.getElementById("fuelStatus").innerHTML = `Fuel level too low for launch`;
      }
      if (inputs[2]==='')
      {
         document.getElementById("fuelStatus").innerHTML = `Fuel level missing`;
      }
      //update cargo mass stauts based on input
      if(inputs[3]>10000)
      {
         document.getElementById("launchStatus").style.color ="red";
         document.getElementById("launchStatus").innerHTML = `Shuttle Not Ready For Launch`;
         document.getElementById("faultyItems").style.visibility='visible';
         document.getElementById("cargoStatus").innerHTML = `Cargo mass too high for launch`;
      }
      if(inputs[3] === '')
      {
         document.getElementById("cargoStatus").innerHTML = `Cargo mass missing`;
      }
      //return "Shuttle Ready for Launch" in green text and hide faulty items if inputs are correct
      if(inputs[2]>=10000 && inputs[3]<=10000 && inputs[2] !=='' && inputs[3] !=='')
      {
         document.getElementById("fuelStatus").innerHTML = `Fuel level high enough for launch`;
         document.getElementById("cargoStatus").innerHTML = `Cargo mass low enough for launch`;
         document.getElementById("launchStatus").style.color ="green";
         document.getElementById("launchStatus").innerHTML = `Shuttle Ready For Launch`;
         document.getElementById("faultyItems").style.visibility='hidden';
      }  
   }
   

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response)//fetching JSON data for mission data
    {
        response.json().then( function(json) 
        {
            const missionTarget = document.getElementById("missionTarget");
            
            let div = document.createElement('div');  
            const randIndex = Math.floor(Math.random() * json.length)//grabs a random element in the array
            
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
      let inputs = []; //declare arry to hold inputs
      const pilotNameValue = pilotNameInput.value.trim();//trim any white space around entry
      //console.log(pilotNameValue);
      inputs.push(pilotNameValue);//push value into the array
      const coPilotNameValue = coPilotNameInput.value.trim();
      inputs.push(coPilotNameValue);
      const fuelLevelValue = fuelLevelInput.value.trim();
      inputs.push(fuelLevelValue);
      const cargoMassValue = cargoMassInput.value.trim();
      inputs.push(cargoMassValue);

      checkInputs(inputs);
      statusCheckUpdate(inputs);
   });
});