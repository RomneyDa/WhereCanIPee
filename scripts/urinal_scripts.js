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

    let wall = document.getElementById("bathroom-wall");

    // CREATE ARRAY REPRESENTING URINAL OCCUPATION
    for(let urinal = 0; urinal < wall.children.length; urinal++){
        if(wall.children[urinal].className == "free_urinal"){
            urinals_in.push(0);
        } else {
            urinals_in.push(1);
        }
    }

    let spacing_out = new Array(wall.children.length).fill(0);
    let symmetry_out = new Array(wall.children.length).fill(0);

    if(urinals_in.reduce((a, b) => a + b, 0) === urinals_in.length){
        console.log("URINALS FULL");
        let results_wall = document.getElementById("results-wall");
        //console.log(symmetry_out);
        for(let urinal = 0; urinal < results_wall.children.length; urinal++){
            results_wall.children[urinal].className = "bad_urinal";
        }
    } else {

        // CHECK SYMMETRY IF BOX IS CHECKED
        if (document.forms[0].check_symmetry.checked){
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
        }
        //console.log(symmetry_out);

        // CHECK SPACING
        let gap_length = 0;
        let start_array = [0];

        for(let urinal = 0; urinal < wall.children.length; urinal++){
            if (urinals_in[urinal] == 0){
                let current_gap = 1;
                for(j = urinal + 1; j < wall.children.length; j++){
                    if(urinals_in[j] === 1){
                        break;
                    }
                    else {
                        current_gap++;
                    }
                }
                if(current_gap > gap_length){
                    gap_length = current_gap;
                    start_array = [urinal];
                } else if(current_gap === gap_length){
                    start_array.push(urinal);
                }
            }
        }
        //console.log("longest white gap is " + gap_length + " starting at " + start_array);

        for(let start_index = 0; start_index < start_array.length ; start_index++){
            if(gap_length === urinals_in.length){
                if(gap_length % 2 === 0){
                    //console.log("even gap length. center of gap = " + (gap_length/2 - 1) + " and " + gap_length/2);
                    spacing_out[(gap_length/2 - 1)] = 1;
                    spacing_out[(gap_length/2)] = 1;
                } else {
                    //console.log("odd gap length. center of gap = " + Math.floor(gap_length/2));
                    spacing_out[Math.floor(gap_length/2)] = 1;
                }
                spacing_out[0] = 0;
            } else if(start_array[start_index] === 0){
            //console.log("longest gap on left side");
                spacing_out[0] = 1;
            } else if(start_array[start_index] + gap_length === urinals_in.length){
                //console.log("longest gap on right side");
                spacing_out[wall.children.length - 1] = 1;
            } else {
                if(gap_length % 2 === 0){
                    //console.log("even gap length. center of gap = " + (gap_length/2 - 1) + " and " + gap_length/2);
                    spacing_out[start_array[start_index] + (gap_length/2 - 1)] = 1;
                    spacing_out[start_array[start_index] + (gap_length/2)] = 1;
                } else {
                    //console.log("odd gap length. center of gap = " + Math.floor(gap_length/2));
                    spacing_out[start_array[start_index] + Math.floor(gap_length/2)] = 1;
                }
            }
        }

        // APPLY STYLES
        let results_wall = document.getElementById("results-wall");
        let urinal_out = arrayOR(spacing_out, symmetry_out);
        for(let urinal = 0; urinal < results_wall.children.length; urinal++){
            if(urinal_out[urinal] === 0){
                results_wall.children[urinal].className = "bad_urinal";
            } else {
                results_wall.children[urinal].className = "good_urinal";
            }
        }

        // SUM OF SYMMETRY ARRAY
        //console.log(symmetry_out.reduce((a, b) => a + b, 0));

        // else if(urinals_in.reduce((a, b) => a + b, 0) === 0){
        //     console.log("URINALS EMPTY");
            
        // } 
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

function arrayAND(a, b) {
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    let and_array = new Array(a.length)
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== 0 && b[i] !== 0){
        and_array[i] = 1;
      } else {
        and_array[i] = 0;
      }
    }
    return and_array;
}

function arrayOR(a, b) {
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    let and_array = new Array(a.length)
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== 0 || b[i] !== 0){
        and_array[i] = 1;
      } else {
        and_array[i] = 0;
      }
    }
    return and_array;
}