 //  Search button event listener
document.getElementById('search-form').addEventListener('submit', getMeetUpEvents);


// Ajax request using search term to getPlaylist route
function getMeetUpEvents(event) {
   var query = document.getElementById("query").value; // query location
   var form = document.getElementById("search-form"); // form
   form.reset();

   
   // Make meetup API request
   var req = new XMLHttpRequest(); 
   var url = "https://api.meetup.com/2/open_events?key=3b5cd41e32702b161a85e68646bb&category=34&fields=group_photo&time=,1m&zip=" + query;
   req.open("GET", url, true);
   req.addEventListener('load', function() {
     if(req.status >= 200 && req.status < 400){
       var response = JSON.parse(req.responseText);
       console.log(response.results);
       displayEvents(response.results);
     } else {
         console.log("Error in network request: " + req.statusText);
     }
   }); 
   req.send(null);
  event.preventDefault();
}

// Append to list
function displayEvents(object) {
  var eventsArray = object;    
  var listArea = document.getElementById("listContent");

  //Create the list
  var list = document.createElement("ul");
  list.id = "results";
  list.style.listStyle = "none";
  list.className = "list-group";  


  // Build list
  for (var i = 0; i < eventsArray.length; i++) { 

    // Format Date
    // logs ex: ‎Friday‎, ‎September‎ ‎22‎, ‎2017
    var utcDate = eventsArray[i].time;  // ISO-8601 formatted date returned from server
    var localDate = new Date(utcDate);
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


    //Create HTML DOM Elements      
    var event = document.createElement('a'); //Preview node      
    event.className = "list-group-item list-group-item-action"; //Set type      
    // event.textContent = eventsArray[i].name;  
    event.setAttribute("href", eventsArray[i].event_url);

    // Include image 
    if (eventsArray[i].group.group_photo){
      var imageURL = eventsArray[i].group.group_photo.photo_link;
    } else {
      console.log('the property is not available...'); 
      var imageURL = "http://icons.iconarchive.com/icons/danleech/simple/1024/meetup-icon.png";
    }

    var image = document.createElement('img'); //Preview node  
    image.setAttribute("src", imageURL);
    image.setAttribute("width", "300");
    event.appendChild(image); 

    var breakLine = document.createElement('br');
    event.appendChild(breakLine);

    var name = document.createElement('span');
    name.textContent = eventsArray[i].name;   
    event.appendChild(name);  

    var breakLine = document.createElement('br');
    event.appendChild(breakLine);

    var eventDate = document.createElement('span');        
    eventDate.textContent += localDate.toLocaleDateString('en-US', options);

    event.appendChild(eventDate);      
 
    list.appendChild(event);      
  } 
  
  listArea.appendChild(list)
}




