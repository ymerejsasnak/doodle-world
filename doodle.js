$(function() {

  
  
  var guys = [];
  var guyIDcounter = 0;
  var timer = 0;
  var left = true;
  var width = $("body").width();
  


  $("#controls").on("click", ".guy-button", function() {
  	guys.push(new Guy( $(this).text() ));
    guyIDcounter++;    
  });

  $("#controls").on("click", "#time", function() {
    $("#night").toggle();    
    $("#sun").toggle();
    $("#moon").toggle();
  });


  addTrees();
  animate();




  ////////////////////////////////////////////////////////////////////////

   



  //add 2 to 4 trees at random positions and use scale to randomize their size a bit too
  //expression for left value uses a multiple of the i variable to make sure trees are spaced out a bit
  function addTrees() {
  	var howManyTrees = Math.floor(Math.random() * 2) + 3;

    for (var i = 0; i < howManyTrees; i++) {
    	
    	$("body").append("<div class='tree' id='tree" + i + "'></div>");
    	
    	var thisTree = $("#tree" + i);
    	var type = Math.floor(Math.random() * 3) + 1;
      var scale = (0.7 + Math.random() * 0.6)
      
      thisTree.css({  background: "url(img/tree" + type + ".png)",
      	              left: (Math.random() * 10 + i * 25) + "%",
      	              transform: "scale(" + scale + "," + (scale * 1.1)  + ")"  });      
    }
  }






  
  function Guy(guyType) {

    this.guyType = guyType;
    this.speed = 1 + Math.random();
    this.scale = Math.random() / 5 + 0.4;
  
    $("body").append("<div class='guy " + guyType.toLowerCase() + "' id='guy" + guyIDcounter + "'></div>");
  	this.div = $("#guy" + guyIDcounter);

    //alternate generation on left and right side
    if (left) {
  	  this.x = -200;
  	  this.dir = 1;
      left = false;
    }
    else {
      this.x = width;
      this.dir = -1
      left = true;
    }

    //other properties based on 'guy type'
    switch(guyType) {

      case "Walker":
        this.rotateLeft = true;
        this.rotateSpeed = Math.floor(Math.random() * 5) + 5;
        this.img = Math.floor(Math.random() * 3) + 1;
        this.div.css({ background: "url(img/walker" + this.img + ".png)",
                       transform: "scale(" + this.scale + ") rotateZ(-2deg)" });
        break;


      case "Roller":
        this.div.css({ background: "url(img/roller1.png)" });
        break;


      case "Flipper":
        this.flipCounter = 0;
        this.flipTimer = 0;
        this.div.css({ background: "url(img/flipper1.png)" });
        break;


      case "Dancer":
        this.x = Math.random() * (width - 100);
        this.div.css({ background: "url(img/dancer1.png)", 
                       transform: "scale(" + this.scale + ")" });
        break;


      case "Flyer":
        this.altitude = Math.random() * 30 + 40;
        this.div.css({ background: "url(img/flyer1.png)",
                       transform: "scale(" + this.scale + ")" });
        break;

    }
              
  }



  Guy.prototype.update = function() {
      
    switch(this.guyType) {

      case "Walker": //rotate slightly left and right on z axis to fake walking
        this.x += this.speed * this.dir;
    
        if (timer % this.rotateSpeed === 0) {
          if (this.rotateLeft) {
            this.div.css({transform: "scale(" + this.scale + ") rotateZ(-4deg)"});
            this.rotateLeft = false;
          }
          else {
            this.div.css({transform: "scale(" + this.scale + ") rotateZ(4deg)"});
            this.rotateLeft = true;
          }
        }
        break;


      case "Roller": //rotates around z axis using timer to continually increase the degrees
        this.x += this.speed * this.dir * 2;
        this.div.css({transform: "scale(0.5) rotateZ(" + (this.dir * timer * this.speed * 2) + "deg)" });
        break;


      case "Flipper": //rotates 180deg periodically to simulate walking by flipping
        this.x += this.speed/4 * this.dir;
        if (this.flipTimer % 30 === 0) {
          this.div.css({transform: "scale(0.5) rotateZ(" + (this.dir * this.flipCounter * 180) + "deg)", 
                        transition: "transform " + (0.3 * this.speed) + "s ease-in-out" });
          this.flipCounter++;
          this.x += this.speed * 4 * this.dir;
        }
        this.flipTimer++;
        break;


      case "Dancer": //a bunch of random transforms
        if (timer % 10 === 0) {
          var randomValue = Math.random() * 100 - 50;
          switch(Math.floor(Math.random() * 5)){
            case 0:
              this.div.css({transform: "scale(" + (this.scale * 0.99) + ") rotateX(" + (randomValue * 2) + "deg)", 
                          transition: "transform " + (0.2 * this.speed) + "s ease-in-out" });
              break;
            case 1:
              this.div.css({transform: "scale(" + this.scale + ") rotateY(" + (randomValue / 2) + "deg)", 
                          transition: "transform " + (0.2 * this.speed) + "s ease-in-out" });
              break;
            case 2:
              this.div.css({transform: "scale(" + (this.scale * 1.01) + ") rotateZ(" + (randomValue / 2) + "deg)", 
                          transition: "transform " + (0.2 * this.speed) + "s ease-in-out" });
              break;
            case 3:
              this.div.css({transform: "scale(" + this.scale + ") skewX(" + randomValue + "deg)", 
                          transition: "transform " + (0.2 * this.speed) + "s ease-in-out" });
              break;
            case 4:
              this.div.css({transform: "scale(" + this.scale + ") skewY(" + randomValue + "deg)", 
                          transition: "transform " + (0.2 * this.speed) + "s ease-in-out" });
              break;
          }
        }
        break;


      case "Flyer":
        if (timer % 30 === 0) {
          this.altitude += Math.random() * 2 - 1;
        }
        this.x += this.speed * 1.5 * this.dir;
        this.div.css({transform: "scale(" + this.scale + ")",
                      bottom: this.altitude + "%" });
        break;
    }

    //and move guy left or right
    this.div.css({left: this.x + "px"});
    
  }



  Guy.prototype.remove = function(thisGuy) {
    if (this.x < -200 || this.x > width) {
      this.div.remove();
      guys.splice(thisGuy, 1);
      delete this;
    }
  }










   function animate() {
    
    for (var thisGuy = 0; thisGuy < guys.length; thisGuy++) {
    	if (guys[thisGuy]) {
        guys[thisGuy].update();
    	  guys[thisGuy].remove(thisGuy);
      }
    }
    timer++;
    requestAnimationFrame(animate);
  }
  

});