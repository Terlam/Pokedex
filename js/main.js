function getPokemon() {
    let pokeNames = document.querySelector('#pokeName').value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNames}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    
    // let pokeURL = `http://pokeapi.co/api/v1/pokemon/${param}/`;
     let pokeURL2 = `https://pokeapi.co/api/v2/pokemon/${pokeNames}`;




        let pokeID = data.id;
        let pokeName = data.name;
        let pokeType1 = data.types[0].type.name;
        
        // let pokeType2 = (data.types.length > 1) ? data.types[1].name :'none'
        if (data.types.length == 2) {

            let pokeType2 = data.types[1].type.name;
            console.log(pokeType2)
        } else {
            let pokeType2 = null;
        }
        // concatenate new URL for next GET request
        let descriptionURI = `https://pokeapi.co/api/v2/pokemon-species/${pokeName}`;

        // this variable will hold the description string
        let pokeDescription = " ";

        // GET request to new URL
        fetch(descriptionURI)
        .then(response => response.json())
        .then(data2 => {
            console.log(data2)
            pokeDescription = data2.flavor_text_entries[20].flavor_text

        });

        // 3rd GET request to get an image
        fetch(pokeURL2)
        .then(response => response.json())
        .then(data3 => {
            console.log(data3)
            let imageURI = data3.sprites.other.dream_world.front_default;
        
        

         // append data to HTML
            // empty string to hold HTML
            let li = "";
            li += '<p>\n<img src="' + imageURI + '"></p>';
            li += '<h1>#' + pokeID + ' ' + pokeName + '</h1>';
            li += '<p>Type 1: ' + pokeType1 + '</p>';
            

             if (data.types.length == 2) {

            let pokeType2 = data.types[1].type.name;
            console.log(pokeType2)
            li += '<p>Type 2: ' + pokeType2 + '</p>';
            console.log(pokeType2 + "is the pokemon type")
            
        } else {
            let pokeType2 = null;
        }
            // only display Type 2 if it is not null
           


            li += '<p>' + pokeDescription + '</p>';
            li += '</li>';

            // empty the listview
            $("#pokeDetails").empty();

            // append new li to listview
            $("#pokeDetails").append(li).promise().done(function(){
                    $(this).listview("refresh");

            
            });
        });
    }); // 2nd and 3rd GET request is nested inside success function of 1st request
}
