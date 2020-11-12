function getPokemon() {
    let pokeNames = document.querySelector('#pokeName').value;
    fetch(`http://pokeapi.co/api/v2/pokemon/${pokeNames}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    
    // let pokeURL = `http://pokeapi.co/api/v1/pokemon/${param}/`;
     let pokeURL2 = `http://pokeapi.co/api/v2/pokemon/${pokeNames}`;




        let pokeID = data.id;
        let pokeName = data.name;
        let pokeType1 = data.types[0].name;
        if (data.types.length ==2) {
            let pokeType2 = data.types[1].name;
        }
        else pokeType2 = null;

        // concatenate new URL for next GET request
        let descriptionURI = `https://pokeapi.co/api/v2/pokemon-species/${pokeName}//form_descriptions.description`;

        // this variable will hold the description string
        let pokeDescription = "";

        // GET request to new URL
        fetch(descriptionURI)
        .then(response => response.json())
        .then(data2 => {
            console.log(data2)

        });

        // 3rd GET request to get an image
        fetch(pokeURL2)
        .then(response => response.json())
        .then(data3 => {
            console.log(data3)
            let imageURI = data3.sprites.front_shiny;
        
        

         // append data to HTML
            // empty string to hold HTML
            let li = "";
            li += '<li><img src="' + imageURI + '">';
            li += '<h1>#' + pokeID + ' ' + pokeName + '</h1>';
            li += '<p>Type 1: ' + pokeType1 + '</p>';

            // only display Type 2 if it is not null
            if (pokeType2 != null){
                li += '<p>Type 2: ' + pokeType2 + '</p>';
            }

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
