var apiKey = 'DPQNSMGH5QBIBWDPNRZO';

document.addEventListener('DOMContentLoaded', action);
document.getElementById('query').focus();

var form = document.getElementById("search-form"); // form
form.reset();

document.getElementById("resultsMssg").innerHTML = "";



function action () {
  document.getElementById('searchbutton').addEventListener('click', function(event) {

    if (document.getElementById("listContent")) {
      document.getElementById("listContent").remove();

    }

    var e = document.getElementById("distanceForm");
    var strUser = e.value;

    var req = new XMLHttpRequest();

    var location = document.getElementById('query').value;
    var distance = strUser + 'mi';
    var category = 'hackathon';
    var sort = 'date';
    var url = "https://www.eventbriteapi.com/v3/events/search/?q=" + category + "&sort_by=" + sort + "&location.address=" + location + "&location.within=" + distance + "&token=" + apiKey;

   

    req.open('GET', url, true);

    req.addEventListener('load', function(){ 
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);

      var newDiv = document.createElement("div");
      newDiv.setAttribute("id", "listContent");
      var info = document.getElementById("information");

      info.appendChild(newDiv);

      displayEvents(response);

      
      document.getElementById("resultsMssg").innerHTML = "Showing " + response.pagination.object_count + " events within " + strUser + " miles of " + '"' + location + '"';
    }
    else {
      console.log("Error in network request: " + req.statusText);
    }});

    req.send(null);

    event.preventDefault();
  })
}

// Append to list
  function displayEvents(object) {
  var eventsArray = object;  
  var length = eventsArray.events.length;

  /* PRINT INFO ONTO CONSOLE */
  console.log(eventsArray);

  var listArea = document.getElementById("listContent");

  //Create the list
  var list = document.createElement("ul");
  list.setAttribute("id", "hackathon_list");
  list.id = "results";
  list.style.listStyle = "none";
  list.className = "list-group";  

  // Build list
  for (var i = 0; i < length; i++) { 

    // Format Date
    // logs ex: ‎Friday‎, ‎September‎ ‎22‎, ‎2017
    var utcDate = eventsArray.events[i].start.utc;  // ISO-8601 formatted date returned from server
    var localDate = new Date(utcDate);
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    // Link to website to purchase ticket
    var link = eventsArray.events[i].url;

    //Create HTML DOM Elements 
    var event = document.createElement('span'); //Preview node      
    event.className = "list-group-item list-group-item-action"; //Set type 
    list.appendChild(event); 

    //Include image 
    if (eventsArray.events[i].logo){
      var imageURL = eventsArray.events[i].logo.original.url;
    } else {
      console.log('the property is not available...'); 
    }

    var image = document.createElement('img'); //Preview node  
    image.setAttribute("src", imageURL);
    image.setAttribute("class", "resultImages")
    image.setAttribute("width", "200");
    image.setAttribute("height", "200");
    event.appendChild(image); 

    var breakLine = document.createElement('br');
    event.appendChild(breakLine);

    //Include event name
    var name = document.createElement('a');
    name.setAttribute("href", link);
    name.setAttribute("class", "eventInfo");
    name.textContent = eventsArray.events[i].name.text;  
    name.setAttribute("id", "eventName"); 
    event.appendChild(name); 

    var breakLine = document.createElement('br');
    event.appendChild(breakLine);

    //Include event date
    var eventDate = document.createElement('span'); 
    eventDate.setAttribute("class", "eventInfo");  
    eventDate.setAttribute("id", "eventDate");      
    eventDate.textContent += localDate.toLocaleDateString('en-US', options);

    console.log(eventsArray.events.url);
    
    event.appendChild(eventDate); 
    var breakLine = document.createElement('br');
    event.appendChild(breakLine);
    
    //Include event description
    var eventDescription = document.createElement('p');
    eventDescription.setAttribute("class", "eventInfo");
    eventDescription.setAttribute("id", "eventDescription");
    eventDescription.textContent = eventsArray.events[i].description.text;
    
    event.appendChild(eventDescription); 
    var breakLine = document.createElement('br');
    event.appendChild(breakLine);
  } 
  
  listArea.appendChild(list)
}