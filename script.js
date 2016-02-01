var json;
var selectedDrinks = [];

console.log("hello world");
$(document).ready(function() {
	
	
	$.getJSON('./drinks.json', function(data){
		//set data
		json = data;
	});

	

	$("body").click(function(){
		
		console.log(selectedDrinks);
	});
	
	//clicking a button
	$("div").click(function(){
		//get the id 
		var drink = $(this).attr("id");
		
		
		
		//flag to check for drink
		var contains = false;
		//index of drink in array
		var index = 0;
		
		for(var i = 0; i < selectedDrinks.length; i++){
			//if drink exists
			if(selectedDrinks[i] == drink){
				contains = true;
				index = i;
				break;
			}
		}
		
		//if the drink doesn't exsists add it 
		//else remove the drink from array
		if(!contains){
			selectedDrinks.push(drink);
		} else{
			//remove drink
			selectedDrinks.splice(index, 1);
		}
		
		//updates user on selected drinks
		$("#selectedDrinks").html(selectedDrinks.toString());
			
			
			if(selectedDrinks.length > 1){
					selectedDrinks.sort();
					findPossibleDrinks();
			}
			
	});
	
	
});

function findPossibleDrinks(){
	
	//console.log(json.drinks);
	
	//list of those who matched all ingredients
	var  possibleDrinks = [];
	
	
	//for all drinks in list
	for(var i in json){
		/*console.log(json[i]);
		console.log(json[i].description);
		console.log(json[i].contents);*/
		
		//store ingredient list of current drink in data
		var ingredientList = [];
		
		//for all list of contents
		for(var obj in json[i].contents){
			//console.log(json[i].contents[obj]);
			
			
			//for all drink types
			for(key in json[i].contents[obj]){
				//console.log(key);
				ingredientList.push(key);
				
				/*one way to optimize would be to skip if contents list is not the same size
					as selected ingreidents. 
					
					this might be an issue in the future if we add "possible drinks if you have x ingredient"
				
				*/
			}
			
			
		}
		
		//assert equality
		if(superbag(selectedDrinks, ingredientList)){
				
				possibleDrinks.push(json[i].name);
			}
		
		
	}

	if(possibleDrinks.length > 0){
		$("#possibleDrinks").html(possibleDrinks.toString());
		
	}
	
}



/*
General helper functions

*/

function superbag(sup, sub) {
    sup.sort();
    sub.sort();
    var i, j;
    for (i=0,j=0; i<sup.length && j<sub.length;) {
        if (sup[i] < sub[j]) {
            ++i;
        } else if (sup[i] == sub[j]) {
            ++i; ++j;
        } else {
            // sub[j] not in sup, so sub not subbag
            return false;
        }
    }
    // make sure there are no elements left in sub
    return j == sub.length;
}