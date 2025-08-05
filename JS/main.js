//Referencias
const temp = document.getElementById("temp");
const btnMin = document.getElementById("btn-min");
const btnI = document.getElementById("btn-i");
const botones = document.querySelector(".botones");

// const btnR = createElement("button");
// btnR.innerText = "Reanudar";
// const btnP = createElement("button");
// btnP.innerText = "Pausar";

//Variables
let pausa = true;
let interID = null;
let interIDCheck = null;

let seg = 0;
let min = 0;
let hour = 0;

let textSeg = "";
let textMin = "";
let textHour = "";

btnMin.addEventListener("click", () => {
    limites();
    min++;
    update();
});

//Iniciar y Pausar
btnI.addEventListener("click", () => {
    if (seg > 0 || min > 0 || hour > 0){
        if (!pausa){
        stopTimer();
        stopCheck();
    }else{
        control();
        startTimer();
    }
}
});

function update(){
    //Actualiza el DOM
    textSeg = seg.toString().padStart(2, "0");
    textMin = min.toString().padStart(2, "0");
    textHour = hour.toString().padStart(2, "0");
    temp.innerHTML = `${textHour}:${textMin}:${textSeg}`;
}

function limites(){
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
    
    //Verificación de restas
    if (seg < 0) {
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
}

function startTimer(){
    //Empieza la cuenta regresiva
    pausa = false;
    btnI.innerText = "Pausar";
    if (!interID)
    interID = setInterval(() => {
        seg--;
    }, 1000);
}

function stopTimer(){
    //Termina la cuenta regresiva
    pausa = true
    btnI.innerText = "Iniciar";
    if (interID){
        clearInterval(interID);
        interID = null;
    }
}

function stopCheck(){
    pausa = true;
    btnI.innerText = "Iniciar";
    if (interIDCheck){
        clearInterval(interIDCheck);
        interIDCheck = null;
    }
}

function control(){
    //Controla los limites y refresca cambios
if (seg > 0 || min > 0 || hour > 0){
    interIDCheck = setInterval(() => {

    limites();
    //Si finaliza la cuenta
    if (hour === 0 && min === 0 && seg === 0) {
        stopTimer();
        stopCheck();
    }

    update();
    }, 100);

    }else{
    update();
    }
}

update();
