var Q = 2;
var T60 = 0.8;
var fs = 95;
var alfa = 0.02;
var volumen = 356.86;
var nSillas = 56;
var p = 0.75;
var distancia = {
largo : 12.8,
altura : 4.1,
ancho : 6.8
};

var superficie = {
Total : 334.8,
Puerta : 16.72,
Pared : 144,
Techo : 87.04,
Piso : 87.04,
Mesa : 0.5,
Silla : 0.25
};

var frecuenciaMateriales = [
125,
250,
500,
1000,
2000,
4000
];

var frecuencias = [
45,
50,
55,
60,
65,
70,
75,
80,
85,
90,
95,
100,
105,
110,
115
];

var frecuenciasTercio = [
50,
63,
80,
100
];

var datosMateriales = {
Piso : datosPiso,
Techo : datosTecho,
Pared : datosPared,
Silla : datosSilla,
Mesa : datosMesa,
Puerta : datosPuerta,
Persona : datosPersona
};

var areaEq = function(tipo, i, f){
return superficie[tipo]*datosMateriales[tipo][i].Coef[f];
}

var datoEq = function(tipo, i, f){
return datosMateriales[tipo][i].Aeq[f];
}

var DistanciaCritica = function(q,v,t,alfa){

return 0.06*Math.sqrt(q*v/(t*t*(1-alfa)));

};

var TiempoReverberacion = function(Vol, Area, frec){

if(frec == undefined){

return 0.163*Vol/Area;

} else if(frec < 125) {
var constant = 1893;

return (frec/constant)*(frec/constant)*Vol;

} else {
switch (frec){
case 125:
return 0.41 + 0.26*Math.log10(Vol);

case 250:
return 0.32 + 0.21*Math.log10(Vol);

default : 
return 0.28 + 0.18*Math.log10(Vol);
}
}

return 0;
};

var getSum = function(total, num){
return total + num;
}

var lenPisos = datosPiso.length;
var lenTechos = datosTecho.length;
var lenPared = datosPared.length;
var lenSillas = datosSilla.length;
var lenSillasPersonas = datosPersona.length;
var lenMesas = datosMesa.length;
var dataTiempoOptimo = [];
var dataTiempoOptimo30up = [];
var dataTiempoOptimo30down = [];
for(var i = 0, frec; frec = frecuenciaMateriales[i]; i++){
var tr = TiempoReverberacion(volumen,superficie.Total,frec);
dataTiempoOptimo.push(tr);
dataTiempoOptimo30up.push(tr*1.15);
dataTiempoOptimo30down.push(tr*0.85);

}

var dataTiempoVacia = [];
var ecm = [];
for(var i = 0, frec; frec = frecuenciaMateriales[i]; i++){
var Apared = areaEq("Pared",0,i);
var Atecho = areaEq("Techo",1,i);
var Apiso = areaEq("Piso",0,i);
var Apuerta = areaEq("Puerta",0,i);
var Atotal = Apiso + Atecho + Apared + Apuerta;
var Tr = TiempoReverberacion(volumen, Atotal);

var cuad = (dataTiempoOptimo[i]-Tr)*(dataTiempoOptimo[i]-Tr);
ecm.push(cuad);
//console.log(frec+" & "+Tr.toFixed(2)+" & "+dataTiempoOptimo[i].toFixed(2)+" & "+cuad.toFixed(2)+"\\\\");
//console.log(frec+" & "+Apiso.toFixed(2)+" & "+Atecho.toFixed(2)+" & "+Apared.toFixed(2)+" & "+Apuerta.toFixed(2)+" & "+Atotal.toFixed(2)+" & "+Tr.toFixed(2)+"\\\\");
dataTiempoVacia.push(Tr);

}
//console.log("ECM sala vacia "+ecm.reduce(getSum, 0)/6);

var dataTiempoMuebles = [];
var ecm = [];
for(var i = 0, frec; frec = frecuenciaMateriales[i]; i++){
var Apared = areaEq("Pared",0,i);
var Atecho = areaEq("Techo",1,i);
var Apiso = areaEq("Piso",0,i);
var Apuerta = areaEq("Puerta",0,i);
var Asillas = nSillas*datoEq("Silla",1,i);
var Amesa = datoEq("Mesa",0,i);
var Aeq = Apiso + Atecho + Apared + Apuerta;
var Atotal = Aeq + Asillas + Amesa;
var Tr = TiempoReverberacion(volumen, Atotal);

var cuad = (dataTiempoOptimo[i]-Tr)*(dataTiempoOptimo[i]-Tr);
ecm.push(cuad);
//console.log(frec+" & "+Aeq.toFixed(2)+" & "+Asillas.toFixed(2)+" & "+Amesa.toFixed(2)+" & "+Atotal.toFixed(2)+" & "+Tr.toFixed(2)+"\\\\");
dataTiempoMuebles.push(Tr);

}
//console.log("ECM sala con muebles "+ecm.reduce(getSum, 0)/6);

var dataTiempoPersonas = [];
var ecm = [];
for(var i = 0, frec; frec = frecuenciaMateriales[i]; i++){
var Apared = areaEq("Pared",0,i);
var Atecho = areaEq("Techo",1,i);
var Apiso = areaEq("Piso",0,i);
var Apuerta = areaEq("Puerta",0,i);
var Asillas = (1-p)*nSillas*datoEq("Silla",1,i);
var Amesa = datoEq("Mesa",0,i);
var Aeq = Apiso + Atecho + Apared + Apuerta;
var Aeq2 = Aeq + Asillas + Amesa;

var Apersonas = p*nSillas*datoEq("Persona",1,i);
var Atotal = Aeq2 + Apersonas;
var Tr = TiempoReverberacion(volumen, Atotal);

var cuad = (dataTiempoOptimo[i]-Tr)*(dataTiempoOptimo[i]-Tr);
ecm.push(cuad);
//console.log(frec+" & "+Aeq2.toFixed(2)+" & "+Apersonas.toFixed(2)+" & "+Atotal.toFixed(2)+" & "+Tr.toFixed(2)+"\\\\");
dataTiempoPersonas.push(Tr);

}
//console.log("ECM sala con personas "+ecm.reduce(getSum, 0)/6);

var resultados = [];
var res = [];

for(var j = 0; j < lenPared; j++){
for(var h = 0; h < lenPisos; h++){
for(var k = 0; k < lenTechos; k++){
for(var l = 0; l < lenSillas; l++){
var tRev = [];
var tRevAux = [];
for(var i = 0; frecuenciaMateriales[i]; i++){
var Apared = areaEq("Pared",j,i);
var Atecho = areaEq("Techo",k,i);
var Apiso = areaEq("Piso",h,i);
var Apuerta = areaEq("Puerta",0,i);
var Asillas = (1-p)*nSillas*datoEq("Silla",l,i);
var Amesa = datoEq("Mesa",0,i);
var Aeq = Apiso + Atecho + Apared + Apuerta;
var Aeq2 = Aeq + Asillas + Amesa;

var Apersonas = p*nSillas*datoEq("Persona",l,i);
var Atotal = Aeq2 + Apersonas;
var tr = TiempoReverberacion(volumen, Atotal);

tRev.push((dataTiempoOptimo[i] - tr)*(dataTiempoOptimo[i] - tr));
tRevAux.push(tr);
}

resultados.push(tRev.reduce(getSum, 0));
var data = {
t : tRevAux,
indexPared : j,
indexTecho : k,
indexPiso : h,
indexPersonaSilla : l,
pared : datosMateriales["Pared"][j].nombre,
techo : datosMateriales["Techo"][k].nombre,
piso :  datosMateriales["Piso"][h].nombre,
silla : datosMateriales["Silla"][l].nombre
}
res.push(data);
}
}
}
}

var inf = 3;
var pos = -1;
for(var i = 0, aa; aa = resultados[i]; i++){
if(aa < inf){
inf = aa;
pos = i;
}
}
//console.log(res[pos]);

var ecm = [];
for(var i = 0, frec; frec = frecuenciaMateriales[i]; i++){
var Apared = areaEq("Pared",res[pos].indexPared,i);
var Atecho = areaEq("Techo",res[pos].indexTecho,i);
var Apiso = areaEq("Piso",res[pos].indexPiso,i);
var Apuerta = areaEq("Puerta",0,i);
var Asillas = (1-p)*nSillas*datoEq("Silla",res[pos].indexPersonaSilla,i);
var Amesa = datoEq("Mesa",0,i);
var Aeq = Apiso + Atecho + Apared + Apuerta;
var Aeq2 = Aeq + Asillas + Amesa;

var Apersonas = p*nSillas*datoEq("Persona",res[pos].indexPersonaSilla,i);
var Atotal = Aeq2 + Apersonas;
var Tr = TiempoReverberacion(volumen, Atotal);

var cuad = (dataTiempoOptimo[i]-Tr)*(dataTiempoOptimo[i]-Tr);
ecm.push(cuad);
console.log(frec+" & "+Tr.toFixed(2)+" & "+dataTiempoOptimo[i].toFixed(2)+" & "+cuad.toFixed(2)+"\\\\");
//
//console.log(frec+" & "+Apiso.toFixed(2)+" & "+Atecho.toFixed(2)+" & "+Apared.toFixed(2)+" & "+Apuerta.toFixed(2)+" & "+Amesa.toFixed(2)+" & "+Asillas.toFixed(2)+" & "+Apersonas.toFixed(2)+" & "+Atotal.toFixed(2)+" & "+Tr.toFixed(2)+"\\\\");
//console.log(frec+" & "+Aeq2.toFixed(2)+" & "+Apersonas.toFixed(2)+" & "+Atotal.toFixed(2)+" & "+Tr.toFixed(2)+"\\\\");

}
//console.log(ecm);
//console.log("ECM final "+ecm.reduce(getSum, 0)/6);

var barChartData = {
labels: frecuenciaMateriales,
datasets: [{
borderColor: 'blue',
borderWidth: 4,
pointRadius : 0,
lineTension : 0,
fill : false,
data: dataTiempoOptimo
},{
borderColor: 'blue',
borderWidth: 4,
pointRadius : 10,
fill : false,
showLine : false,
data: dataTiempoOptimo30down
},{
borderColor: 'blue',
pointRadius : 10,
fill : false,
showLine : false,
borderWidth: 4,
lineTension : 0,
data: dataTiempoOptimo30up
},{
borderColor: 'red',
borderWidth: 4,
pointRadius : 0,
lineTension : 0,
fill : false,
data: dataTiempoVacia
},{
borderColor: 'violet',
borderWidth: 4,
pointRadius : 0,
lineTension : 0,
fill : false,
data: dataTiempoMuebles
},{
borderColor: 'orange',
borderWidth: 4,
pointRadius : 0,
lineTension : 0,
fill : false,
data: dataTiempoPersonas
},{
borderColor: 'green',
borderWidth: 4,
pointRadius : 0,
lineTension : 0,
fill : false,
data: res[pos].t
}]

};

window.onload = function() {
var ctx = document.getElementById('canvas').getContext('2d');
var a = new Chart(ctx, {
type: 'line',
data: barChartData,
options: {
bezierCurve: false,
responsive: true,
legend: {
position: 'top',
},
title: {
display: true,
text: ''
},
scales : {
xAxes : [{
display : true,
ticks : {
fontSize : 15
},
scaleLabel : {
display : true,
fontSize : 25,
labelString : "frecuencia [Hz]"
}
}],
yAxes : [{
display : true,
ticks : {
fontSize : 20
},
scaleLabel : {
display : true,
fontSize : 25,
labelString : "Tiempo de reverberaci\u00f3n [s]"
}
}]
}
}
});

a.update();

//tablaCoef("tablePiso", datosPiso, 0);
//tablaCoef("tablePared", datosPared, 0);
//tablaCoef("tableTecho", datosTecho, 1);
//tablaAeq("tablePersona", datosPersona, 1);
//tablaAeq("tableSilla", datosSilla, 1);
//tablaAeq("tableMesa", datosMesa);
//tablaCoef("tablePuerta", datosPuerta, 0);
//
tablaCoef("tablePiso", datosPiso, res[pos].indexPiso);
tablaCoef("tablePared", datosPared, res[pos].indexPared);
tablaCoef("tableTecho", datosTecho, res[pos].indexTecho);
tablaAeq("tablePersona", datosPersona, res[pos].indexPersonaSilla);
tablaAeq("tableSilla", datosSilla, res[pos].indexPersonaSilla);
tablaAeq("tableMesa", datosMesa);
tablaCoef("tablePuerta", datosPuerta);
//
//res[pos].t
};

