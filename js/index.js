// RECUPERAR TODOS LOS TRÁMITES
let body_home = document.getElementById("body_home");
let bloque_tabla = document.getElementById("bloque_tabla");
let tabla = document.getElementById("tabla");

window.addEventListener("load", (e) => {
	e.preventDefault();

	const TRAMITES = localStorage.getItem("tramites");

	if (TRAMITES == null) {
		bloque_tabla.innerHTML =
			"<div class='sin_tramites'><span class='msj_sin_tramites'>No hay trámites<span></div>";
	} else {
		let lista_tramites = JSON.parse(TRAMITES);

		lista_tramites.forEach((tramite) => {
			body_home.innerHTML =
				body_home.innerHTML +
				`
				<tr>
					<td>${tramite.id}</td>
					<td>${tramite.nombre} ${tramite.apellido}</td>
					<td>${tramite.fecha_actualizacion}</td>
					<td>${tramite.estado}</td>
					<td class="icon_acciones" id="tramite${tramite.id}">
						<button class="btn_icon" onclick='cambiarEstado(${tramite.id})'>
							<box-icon
								name="transfer-alt"
								color="green"
								title="Cambiar de estado"
							></box-icon>
						</button>
						<button class="btn_icon" onclick='eliminarTramite(${tramite.id})'>
						<box-icon
							type="solid"
							name="trash"
							color="red"
							title="Eliminar trámite"
						></box-icon>
						</button>
					</td>
				</tr>
			`;
		});
		tabla.insertAdjacentElement("beforeend", body_home);

		tabla.classList.remove("oculto");
	}
});

const eliminarTramite = (id_tramite) => {
	const TRAMITES = localStorage.getItem("tramites");
	let lista_tramites = JSON.parse(TRAMITES);

	lista_tramites.forEach((tramite) => {
		if (tramite.id == id_tramite) {
			lista_tramites.splice(lista_tramites.indexOf(tramite), 1);
		}
	});
	localStorage.setItem("tramites", JSON.stringify(lista_tramites));
	location.href = "/index.html";
};

const cambiarEstado = (id_tramite) => {
	localStorage.setItem("id_tramite", id_tramite);
	location.href = "/pages/cambio_estado.html";
};