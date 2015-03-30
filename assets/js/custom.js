var usuarios = [];

function init(prueba){
	if (prueba) {
		usuarios = crearUsuariosPrueba();
	} else {
		usuarios = [];
	}

	pintarLista(usuarios);
	pintarSumaEdades(usuarios);
	pintarBotonEliminar(usuarios);
	limpiarFormulario();
}

function guardarUsuario(id,nombre, apellido, ci, edad, direccion, email) {
	if (parseInt(id) > 0){
		editarUsuario(id,nombre, apellido, ci, edad, direccion, email);
	} else {
		crearUsuario(nombre, apellido, ci, edad, direccion, email);
	}
}

function crearUsuario(nombre, apellido, ci, edad, direccion, email) {
	var id = generarId();
	usuarios.push(new Usuario(id, nombre, apellido, ci, parseInt(edad), direccion, email));
	pintarLista(usuarios);
	pintarSumaEdades(usuarios);
	pintarBotonEliminar(usuarios);
	limpiarFormulario();
}

function editarUsuario(id,nombre, apellido, ci, edad, direccion, email) {
	var usuario = buscarPorId(id);
	if (usuario) {
		usuario.nombre = nombre;
		usuario.apellido = apellido; 
		usuario.ci = ci;
		usuario.edad = parseInt(edad); 
		usuario.direccion  = direccion;
		usuario.email = email;
	}
	pintarLista(usuarios);
	pintarSumaEdades(usuarios);
	pintarBotonEliminar(usuarios);
	limpiarFormulario();
}

function crearUsuariosPrueba() {
	var usuarios = [];
	var datos = [
					['Carlos', 'Mathiasen', '234234234432', 18, 'Posadas', 'matt987@mathiasen.com'],
					['Cristina', 'Alvarez', '432234235446', 24, 'Encarnación', 'cristina@alvarez.com'],
					['Jorge', 'Sanchez', '234234237865432', 32, 'Encarnación', 'sanchez@jorge.com'],
					['Jorge', 'Rojas', '234234234432', 34, 'Encarnación', 'rojas@jorge.com'],
					['Arnaldo', 'Ocampo', '776234234432', 32, 'Asunción', 'arnaldo@ocampo.com'],
					['Raul', 'Benitez', '234234234432', 45, 'Asunción', 'raul@benitez.com'],
					['Leois', 'Linka', '54545434432', 73, 'Asunción', 'leois@linka.com'],
					['Karina', 'Maidana', '2234234432', 23, 'Asunción', 'karina@maidana.com'],
					['Hugo', 'Sendoa', '23543434432', 44, 'Corrientes', 'hugo@sendoa.com'],
					['Nestor', 'Tapia', '234234234432', 22, 'Corrientes', 'nestor@tapia.com']
				]
	for (var i = 0; i < datos.length ; i++) {
		var dato = datos[i];
		var usuario = new Usuario(i + 1, dato[0], dato[1], dato[2], dato[3], dato[4], dato[5]);
		usuarios.push(usuario);
	};
	return usuarios;
}

function generarId(){
	var mayor = 0;
	for (var i = 0; i < usuarios.length ; i++) {
		if (mayor < usuarios[i].id){
			mayor = usuarios[i].id;
		}
	}
	return mayor + 1;
}

function pintarLista(usuarios) {
	var tabla = $("#listaUsuarios");
	var buffer = [];
	tabla.html("");
	for (var i = 0; i < usuarios.length ; i++) {
		var u = usuarios[i]
		buffer.push("<tr>");
		buffer.push("<td>" + u.id + "</td><td>" + u.nombre + "</td><td>" + u.apellido + "</td><td>" + u.ci + "</td><td>" + u.edad + "</td><td>" + u.direccion + "</td><td>" + u.email + "</td>");
		buffer.push('<td><a class="editar" data-id="' + u.id + '" href="#">Editar</a> | <a class="eliminar" data-id="' + u.id + ' "href="#">Eliminar</a>')
		buffer.push("</tr>	")
	} 
	tabla.html(buffer.join(""));
}

function pintarSumaEdades(usuarios) {
	var sumaEdad = $("#sumaEdades");
	sumaEdad.html("");
	var totalEdades = sumaEdades(usuarios);
	sumaEdad.html(totalEdades);
}

function pintarBotonEliminar(usuarios) {
	if (usuarios.length > 0) {
		$("#limpiarUsuarios").show();
	} else {
		$("#limpiarUsuarios").hide();
	}
}

function limpiarFormulario(){
	$("#formUsuario")[0].reset();
}

function sumaEdades(usuarios) {
	var total = 0;
	for (var i = 0; i < usuarios.length ; i++) {
		total += usuarios[i].edad;
	}
	return total;
}

function limpiarUsuarios() {
	usuarios = [];
	pintarLista(usuarios);
	pintarSumaEdades(usuarios);	
	pintarBotonEliminar(usuarios);
	limpiarFormulario();
}

function buscarPorId(usuarioId){
	var response = false;
	for (var i = 0; i < usuarios.length ; i++) {
		var usuario = usuarios[i];
		if (usuario.id === parseInt(usuarioId)){
			response = usuario;
		}
	
	};
	return response;
}

function eliminarUsuario(usuario) {
	for (var i = 0; i < usuarios.length ; i++) {
		var usuarioLocal = usuarios[i];
		if (usuarioLocal.id === parseInt(usuario.id)){
			usuarios.splice(i, 1);
			pintarLista(usuarios);
			pintarSumaEdades(usuarios);
			pintarBotonEliminar(usuarios);
			return true;
		}
	
	};	
	return false;
}
