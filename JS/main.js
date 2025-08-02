//Referencias
const temp = document.getElementById("temp");
const btnMin = document.getElementById("btn-min");
const btnP = document.getElementById("btn-p");




//Variables
let pausa = true
let interID = null;

let seg = 0;
let min = 0;
let hour = 0;

let textSeg = "";
let textMin = "";
let textHour = "";

btnMin.addEventListener("click", () => {
    min += 1;
});

//Iniciar y Pausar
btnP.addEventListener("click", () => {
    if (!pausa){
        pausa = true
        btnP.innerText = "Iniciar";
        if (interID){
            clearInterval(interID);
            interID = null;
        }
    }else{
        pausa = false;
        btnP.innerText = "Pausar";
        if (!interID)
        interID = setInterval(() => {
            seg--;
        }, 1000);
    }
});


setInterval(() => {

    //Limite Máximo
    if (seg >= 60){
        min += 1;
        seg = 0;
    }else if (min >= 60){
        hour += 1;
        min = 0;
    }else if (hour >= 60){
        seg = 0;
        min = 0;
        hour = 0;
    }
    

    if (seg <= 0) {
        if (min > 0) {
            min--;
            seg = 59;
        } else if (hour > 0) {
            hour--;
            min = 59;
            seg = 59;
        } else {
            seg = 0;
        }
    }

    if (hour === 0 && min === 0 && seg === 0) {
        btnP.innerText = "Iniciar";
        pausa = true;
        if (interID) {
            clearInterval(interID);
            interID = null;
        }
    }

    //Actualiza el DOM
    textSeg = seg.toString().padStart(2, "0");
    textMin = min.toString().padStart(2, "0");
    textHour = hour.toString().padStart(2, "0");
    temp.innerHTML = `${textHour}` + ":" + `${textMin}` + ":" + `${textSeg}`;
}, 100);




