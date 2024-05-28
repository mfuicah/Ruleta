
function numeroEntre(n, num1, num2){
    if (num2 < num1){
        let aux = num2;
        num2 = num1;
        num1 = aux;
    }

    if (n >= num1 && n <= num2){
        return true;
    }

    return false;
}

//corrección para basarse en los angulos que usa Phaser :/
// no costaba mucho que se basara en una notacion de 0 a 360º
function anguloComunAPhaser( angulo ){
    if (angulo > 180){
        return 360 - angulo;
    }
    return angulo;
}

function anguloPhaserAComun( angulo ){
    if (angulo < 0){
        return angulo + 360;
    }
    return angulo;
}