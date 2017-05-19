var boxes = [];
var capture; 
var url = "https://api.nytimes.com/svc/topstories/v2/home.json?&api-key=9b876ba49e474225a671d2a4fb36f4ca";
var headline = []; 
var articles; 
var facex=10; 
var facey=10; 
var news_font; 
var index = 0; 
var button; 

function preload() { 
  loadJSON(url, gotData); 
  news_font = loadFont("CheltenhamStd-BoldItalic.otf"); 
}
 
function gotData(data) {
  articles = data.results; 

  for (var i=0; i<articles.length; i++){ 
    headline.push(articles[i].title);  
  }

    console.log(headline);

  //print(data.results[0].title);
}

function setup() {
    createCanvas(1080,720);
    
    //createCanvas(500, 500);

    var b = new Box; 

    for (var i = 0; i < headline.length; i++) {
        boxes.push(new Box(240,110,i));
    }
 
    capture = createCapture(VIDEO); 
    //capture.size(windowWidth,windowHeight);
    capture.hide();

}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();

    document.getElementById('time').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);


    var d = new Date();
    var date = d.getDate(); 
    var year = d.getFullYear(); 
    
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    var n = weekday[d.getDay()];
    var month = month[d.getMonth()]; 
    document.getElementById("date").innerHTML = n + ", " + month + " " + date + ", " + year;

    m = checkTime(m);
    s = checkTime(s);
    
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

// function onload(){
window.onload = function() {
      //var video = document.getElementById('video');
      //var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');

      var tracker = new tracking.ObjectTracker('face');
      tracker.setInitialScale(4);
      tracker.setStepSize(2);
      tracker.setEdgesDensity(0.1);

      tracking.track('#video', tracker, { camera: true });

      tracker.on('track', function(event) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        event.data.forEach(function(rect) {

           facex= rect.x;
           facey= rect.y;
            // console.log(facex);
          // context.strokeStyle = '#a64ceb';
          // context.strokeRect(rect.x, rect.y, rect.width, rect.height);
          // context.font = '11px Arial';
          // context.fillStyle = "yellow";
          // context.fillText(headline, rect.x ,rect.y + rect.height+11);
        });
      });
      var gui = new dat.GUI();
      gui.add(tracker, 'edgesDensity', 0.1, 0.5).step(0.01);
      gui.add(tracker, 'initialScale', 1.0, 10.0).step(0.1);
      gui.add(tracker, 'stepSize', 1, 5).step(0.1);
    };

var counter = 0;
setInterval(function() {
    if (counter < boxes.length){
        counter++;
    }
}, 5000);

function draw() {
    // background(250);
    image(capture,0,0, 1080,810);

    startTime(); 
    checkTime();


    // boxes[counter].show(); 
    
    for (var i = 0; i < counter; i++) {
        boxes[i].show(); 
    }

}


function mousePressed() {
    for (var i = 0; i < boxes.length; i++) {
        //checking to see if the mouse is over the box and turning it white if it is
        if (boxes[i].boxover == true) {
            if (boxes[i].buttonx < mouseX && mouseX < boxes[i].buttonx + boxes[i].buttonw 
                && boxes[i].buttony < mouseY && mouseY < boxes[i].buttony + boxes[i].buttonh) {

                alert("Please subscribe to continue reading.");

            } else {
                boxes[i].locked = true;
                boxes[i].xoffset = mouseX - boxes[i].xpos;
                boxes[i].yoffset = mouseY - boxes[i].ypos;
                boxes[i].clicked = true;
            }
            // print("mouse is pressed")
        } else {
 
            boxes[i].locked = false;
            // print("mouse isn't pressed")
        }
        

        
        // print(boxes[i].locked);
        // print(boxes[i].xoffset);
    }
    return false;
}
 
function mouseDragged() {
    for (var i = 0; i < boxes.length; i++) {
        if (boxes[i].locked) {
            boxes[i].xpos = mouseX - boxes[i].xoffset;
            boxes[i].ypos = mouseY - boxes[i].yoffset;
        }
    }
} 
// function mouseDragged() {

// for (var i = 0; i < boxes.length; i++) {
//         //checking to see if the mouse is over the box and turning it white if it is
//         if (boxes[i].boxover == true) {
//             boxes[i].locked = true;
//             boxes[i].xpos = facex+this.xoffset + mouseX;
//             boxes[i].ypos = facex+this.xoffset + mouseY}
//         }
//             // print("mouse is pressed")
//     //     } else {
 
//     //         boxes[i].locked = false;
//     //         // print("mouse isn't pressed")
//     //     }   
//     //     // print(boxes[i].locked);
//     //     // print(boxes[i].xoffset);
//     // }
//     // return false;
        
// }
 
function mouseReleased() {
    for (var i = 0; i < boxes.length; i++) {
        if (boxes[i].clicked) {
            boxes[i].locked = false;
            boxes[i].xoffset = -(facex - boxes[i].xpos);
            boxes[i].yoffset = -(facey-boxes[i].ypos);
            boxes[i].clicked = false;
        }
    }
}
 
function Box(tempWidth, tempHeight,random_headline) {
    //this.c = 240, 50;

    this.xoffset= random(800); 
    this.yoffset= random(600); 
    this.xpos = facex+this.xoffset;
    this.ypos = facey+this.yoffset;
    // this.xpos = facex+this.xoffet;
    // this.ypos = facey+this.yoffset;
    this.boxw = tempWidth;
    this.boxh = tempHeight;
    this.boxover = false;
    this.locked = false;
    this.title = random_headline;

    this.buttonx = this.xpos + 3.5;
    this.buttony = this.ypos + 3.5;
    this.buttonw = this.boxw/19;
    this.buttonh = this.boxh/9;

    this.clicked = false;

    // this.button = createButton("+"); 
    // this.button.position(this.xpos+215, this.ypos+10); 
    // this.button.mousePressed(expand); 
    //this.xoffset = 0;
    //this.yoffset = 0;
    rectMode(CORNER);
    
    

    this.show = function() {

        if (!this.clicked) {
            this.xpos = facex+this.xoffset;
            this.ypos = facey+this.yoffset;
        }

        if (mouseX < this.xpos + this.boxw && mouseX > this.xpos &&
            mouseY < this.ypos + this.boxh && mouseY > this.ypos ) {
            this.boxover = true;
            fill(200);

            if (mouseIsPressed && this.boxover == true) {  
                push();
                stroke(255, 0, 0); 
                fill(230);
                strokeWeight(2);
                rect(this.xpos, this.ypos, this.boxw, this.boxh);
                pop();

            } else {
                push();
                fill(255); 
                strokeWeight(1);
                rect(this.xpos, this.ypos, this.boxw, this.boxh);
                pop();
            }


 
        } else {
            this.boxover = false;

            // this.button.position(this.xpos+215, this.ypos+10);  

            push();
            fill(255); 
            strokeWeight(1);
            rect(this.xpos, this.ypos, this.boxw, this.boxh);
            pop();

        }
        
        
        //rect(this.xpos, this.ypos, this.boxw, this.boxh);

        push()
        fill(0);
        rect(this.xpos, this.ypos, this.boxw-1, this.boxh/5.5);
        pop() 

        push()
        fill(255);
        this.buttonx = this.xpos + 3.5;
        this.buttony = this.ypos + 3.5;
        this.buttonw = this.boxw/20;
        this.buttonh = this.boxh/9; 
        rect(this.buttonx, this.buttony, this.buttonw, this.buttonh);
        pop() 

        push()
        fill(0);
        textFont(news_font); 
        textSize(18);
        text("+",this.xpos+4.8, this.ypos+14)
        pop() 

        

        push(); 
        fill(0); 
        textSize(18);
        textLeading(19);
        noStroke(); 
        textFont(news_font); 
        text(headline[random_headline], this.xpos+11, this.ypos+29,this.boxw-10,this.boxh-10);
        pop();   

    };
    
}

