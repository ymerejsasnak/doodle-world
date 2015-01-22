$(function() {


  addTrees();




















  //add 2 to 4 trees at random positions and use scale to randomize their size a bit too
  //expression for left value uses a multiple of the i variable to make sure trees are spaced out a bit
  function addTrees() {
  	var howManyTrees = Math.floor(Math.random() * 2) + 3;

    for (var i = 0; i < howManyTrees; i++) {
    	
    	$("body").append("<div class='tree' id='tree" + i + "'></div>");
    	
    	var thisTree = $("#tree" + i);
    	var type = Math.floor(Math.random() * 3) + 1;
      
      thisTree.css({  background: "url(img/tree" + type + ".png)",
      	              left: (Math.random() * 10 + i * 25) + "%",
      	              transform: "scale(1," + (0.7 + Math.random() * 0.7) + ")",
      	              "transform-origin": "0 bottom" });      
    }
  }


  

});