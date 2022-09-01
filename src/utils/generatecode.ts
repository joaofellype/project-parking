
export const generateNumber = () => {

    var number = "";
    for(var i=0; i < 6; i++){
        number += Math.floor(Math.random() * 9);
    } 
    return number;
} 
