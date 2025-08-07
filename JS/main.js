//Referencias
const temp = document.getElementById("temp");
const btnMin = document.getElementById("btn-min");
const btnMinOne = document.getElementById("btn-min-one");
const btnSeg = document.getElementById("btn-seg");
let btnI = document.getElementById("btn-i");
const botones = document.querySelector(".botones");

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

let btnR, btnP;

//Añade 5 minutos
btnMin.addEventListener("click", () => {
    if (pausa){
    limites();
    min += 5;
    limites();
    update();
    }
});

//añade 1 minuto
btnMinOne.addEventListener("click", () => {
    if (pausa){
    limites();
    min++;
    limites();
    update();
    }
});

//Añade 30 segundos
btnSeg.addEventListener("click", () => {
    if (pausa){
    limites();
    seg += 30;
    limites();
    update();
    }
});

//Iniciar y Pausar
btnI.addEventListener("click", () => {
    if (seg > 0 || min > 0 || hour > 0){
        if (pausa){
        control();
        startTimer();
        }
        btnI.remove();
        crearBTN();
    }
});

function crearBTN(){
    //Boton Reiniciar
    btnR = document.createElement("button");
    btnR.classList.add("btn-R");
    btnR.innerText = "Reiniciar";
    botones.appendChild(btnR);
    //Boton Pausar
    btnP = document.createElement("button");
    btnP.classList.add("btn-P");
    btnP.innerText = "Pausar";
    botones.appendChild(btnP);
    
    //asignar el evento al reiniciar
    btnP.addEventListener("click", () => {
        if (!pausa){
            stopTimer();
            stopCheck();
            btnP.innerText = "Reanudar";
        }else{
            control();
            startTimer();
            btnP.innerText = "Pausar";
        }
    });

    //Asignar evento al reiniciar
    btnR.addEventListener("click", () => {
    btnR.remove();
    btnP.remove();
    seg = min = hour = 0;
    update();

    crearBtnIniciar();

    });
}

function crearBtnIniciar(){
    if (btnI) btnI.remove();
    btnI = document.createElement("button");
    btnI.id = "btn-i";
    btnI.innerHTML = "Iniciar";
    botones.appendChild(btnI);

    //Asigna nuevamente el Evento del boton iniciar
    btnI.addEventListener("click", () => {
        if (seg > 0 || min > 0 || hour > 0){
            if (pausa){
            control();
            startTimer();
            }
            btnI.remove();
            crearBTN();
        }
    });

}

function update(){
    //Actualiza el DOM
    textSeg = seg.toString().padStart(2, "0");
    textMin = min.toString().padStart(2, "0");
    textHour = hour.toString().padStart(2, "0");
    temp.innerHTML = `${textHour}:${textMin}:${textSeg}`;
}

function limites(){
    //Limite Máximo
    if (seg > 59){
        min += Math.floor(seg / 60);
        seg = seg % 60;
    }else if (min > 59){
        hour += Math.floor(min / 60);
        min = min % 60;
    }else if (hour > 23){
        seg = 0;
        min = 0;
        hour = 24;
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
            btnR.remove();
            btnP.remove();
            crearBtnIniciar();
        }
        update();
        }, 100);
    }
}

update();