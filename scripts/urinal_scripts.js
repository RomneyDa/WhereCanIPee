//console.log("hello");

function GenerateUrinals(){

    //console.log("button clicked");
    document.getElementById("bathroom-wall").innerHTML = '';
    document.getElementById("results-wall").innerHTML = '';

    let num_urinals;
    num_urinals = document.forms[0].number_of_urinals.value;
    //document.getElementById("bathroom-wall");
    //val = document.getElementByID("");
    for(var urinal = 0; urinal < num_urinals; urinal++){
        //console.log(urinal);
        let urinal_element;
        urinal_element = document.createElement('button');
        urinal_element.id = "urinal_" + urinal;
        urinal_element.textContent = urinal;
        urinal_element.setAttribute("onclick", "UrinalClick(" + "'" + urinal_element.id + "');");
        urinal_element.className = "free_urinal";
        document.getElementById("bathroom-wall").appendChild(urinal_element);

        results_urinal = document.createElement('button');
        results_urinal.id = "results_urinal_" + urinal;
        results_urinal.textContent = urinal;
        //results_urinal.setAttribute("onclick", "");
        results_urinal.className = "bad_urinal";
        document.getElementById("results-wall").appendChild(results_urinal);

    }
    //console.log(num_urinals);

    return false; // prevents page refresh
}

function UrinalClick(urinal_id) {
    //console.log(urinal_id);
    if (document.getElementById(urinal_id).className == "free_urinal"){
        document.getElementById(urinal_id).className = "occupied_urinal";
    } else {
        document.getElementById(urinal_id).className = "free_urinal";
    }
    //console.log(document.getElementById(urinal_id));

    WhereCanIPee();
}

function WhereCanIPee(){
    //console.log("checking where to pee");

    let urinals_in = new Array();
    
    let spaced_out = new Array();

    let wall = document.getElementById("bathroom-wall");

    // CREATE ARRAY REPRESENTING URINAL OCCUPATION
    for(let urinal = 0; urinal < wall.children.length; urinal++){
        if(wall.children[urinal].className == "free_urinal"){
            urinals_in.push(0);
        } else {
            urinals_in.push(1);
        }
    }
    //console.log(urinals_in);

    // CHECK SYMMETRY
    let symmetry_out = new Array(wall.children.length).fill(0);;
    for(let urinal = 0; urinal < wall.children.length; urinal++){
        
        if(urinals_in[urinal] == 0){
            //console.log("urinal " + urinal + " is free");
            let urinals_in_copy = [...urinals_in];
            urinals_in_copy[urinal] = 1;

            let urinals_in_copy_reversed = [...urinals_in_copy];
            urinals_in_copy_reversed.reverse();
        
            //console.log(urinals_in_copy);
            //console.log(urinals_in_copy_reversed);
            if(arraysEqual(urinals_in_copy_reversed, urinals_in_copy)){
                //console.log("MATCH!");
                symmetry_out[urinal] = 1;
            }
        }
    }
    //console.log(symmetry_out);

    // APPLY STYLES

    let results_wall = document.getElementById("results-wall");
    //console.log(symmetry_out);
    for(let urinal = 0; urinal < results_wall.children.length; urinal++){
        //console.log(symmetry_out[urinal]);
        if(symmetry_out[urinal] === 0){
            results_wall.children[urinal].className = "bad_urinal";
        } else {
            results_wall.children[urinal].className = "good_urinal";
        }
    }
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }