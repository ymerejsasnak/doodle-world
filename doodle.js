$(function() {

  
  addTrees();
  var guys = [];
  var guyIDcounter = 0;
  var timer = 0;
  var left = true;
  var width = $("body").width();



  $("#controls").on("click", "button", function() {
  	guys.push(new Guy( $(this).text() ));

    guyIDcounter++;    
  });


  animate();







 










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
      	              transform: "scale(" + scale + "," + (scale * 1.1)  + ")",
      	              "transform-origin": "0 bottom" });      
    }
  }




  //make 'guy' more generic and have specific guys inherit from it!


  function Guy(type) {

    $("body").append("<div class='guy " + type.toLowerCase() + "' id='guy" + guyIDcounter + "'></div>");
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

    //randomly use 1 of 3 images for walker
    this.img = Math.floor(Math.random() * 3) + 1;

    this.rotateLeft = true;
    this.rotateSpeed = Math.floor(Math.random() * 5) + 5
  	this.speed = 1 + Math.random();
    this.scale = Math.random() / 5 + 0.4;
    this.div.css({ background: "url(img/walker" + this.img + ".png)",
                   transform: "scale(" + this.scale + "," + this.scale  + ") rotateZ(-2deg)"});

          
  }


  Guy.prototype.update = function() {
  	this.x += this.speed * this.dir;
    
    //fake walking animation
    if (timer % this.rotateSpeed === 0) {
      if (this.rotateLeft) {
        this.div.css({transform: "scale(" + this.scale + "," + this.scale  + ") rotateZ(-4deg)"});
        this.rotateLeft = false;
      }
      else {
        this.div.css({transform: "scale(" + this.scale + "," + this.scale  + ") rotateZ(4deg)"});
        this.rotateLeft = true;
      }
    }
  }

  Guy.prototype.draw = function() {
    this.div.css({left: this.x + "px"});
  }

  Guy.prototype.remove = function(guy) {
    if (this.x < -200 || this.x > width) {
      this.div.remove();
      guys.splice(guy, 1);
      delete this;
    }
  }





   function animate() {
    
    for (var guy = 0; guy < guys.length; guy++) {
    	if (guys[guy]) {
        guys[guy].update();
    	  guys[guy].draw();
        guys[guy].remove(guy);
      }
    }



    timer++;
    requestAnimationFrame(animate);
  }
  

});