var tableTemplateHead = function(){

	var tr = document.createElement('tr');

	var td1 = document.createElement('th');
	var text1 = document.createTextNode('Nombre');
	td1.appendChild(text1);
	tr.appendChild(td1);

	for(var i = 0, frec; frec = frecuenciaMateriales[i]; i++){
		var td = document.createElement('th');
		var text = document.createTextNode('f '+frec+"Hz");
		td.appendChild(text);
		tr.appendChild(td);
	}

	return tr;
};

var tableTemplateBody = function(datos, tipo){
	var tr = document.createElement('tr');

	var td1 = document.createElement('td');
	var text1 = document.createTextNode(datos.nombre);
	td1.appendChild(text1);
	tr.appendChild(td1);

	for(var i = 0, frec; frec = frecuenciaMateriales[i]; i++){
		var td = document.createElement('td');
		var text = document.createTextNode(datos[tipo][i]);
		td.appendChild(text);
		tr.appendChild(td);
	}

	return tr;
};


var tablaCoef = function(div, datos, index){

	var table = document.createElement('table');

	table.appendChild(tableTemplateHead());

	if(index != undefined){
			table.appendChild(tableTemplateBody(datos[index], "Coef"));
	} else {
		for(var i = 0, dato; dato = datos[i]; i++){
			table.appendChild(tableTemplateBody(dato, "Coef"));
		}
	}

	document.getElementById(div).appendChild(table);


}

var tablaAeq = function(div, datos, index){

	var table = document.createElement('table');

	table.appendChild(tableTemplateHead());

	if(index != undefined){
			table.appendChild(tableTemplateBody(datos[index], "Aeq"));
	} else {
		for(var i = 0, dato; dato = datos[i]; i++){
			table.appendChild(tableTemplateBody(dato, "Aeq"));
		}
	}

	document.getElementById(div).appendChild(table);


}

