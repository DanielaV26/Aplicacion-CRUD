document.addEventListener("DOMContentLoaded", () => {
	// Obtener elementos del DOM
	const createForm = document.getElementById("create-form");
	const elementList = document.getElementById("element-list");

	// Obtener elementos del Local Storage
	let elements = JSON.parse(localStorage.getItem("elements")) || [];

	// Mostrar elementos existentes
	showElements();

	// Agregar controlador de eventos para enviar el formulario de creación
	createForm.addEventListener("submit", (e) => {
		e.preventDefault();

		// Obtener valores del formulario
		const nameInput = document.getElementById("name-input");
		const rutInput = document.getElementById("rut-input");
		const edadInput = document.getElementById("edad-input");
		const diagnosticoInput = document.getElementById("diagnostico-input");
		const descriptionInput = document.getElementById("description-input");

		const name = nameInput.value;
		const rut = rutInput.value;
		const edad = edadInput.value;
		const diagnostico = diagnosticoInput.value;
		const description = descriptionInput.value;

		// Validar valores no vacíos
		if (name.trim() === "" || description.trim() === "") {
			return;
		}

		// Crear un nuevo elemento
		const newElement = {
			id: Date.now(),
			name,
			rut,
			edad,
			diagnostico,
			description,
		};

		// Agregar el nuevo elemento al arreglo
		elements.push(newElement);

		// Guardar elementos en el Local Storage
		localStorage.setItem("elements", JSON.stringify(elements));

		// Limpiar el formulario
		nameInput.value = "";
		descriptionInput.value = "";

		// Mostrar los elementos actualizados
		showElements();
	});

	// Mostrar elementos en la lista
	function showElements() {
		elementList.innerHTML = "";

		elements.forEach((element) => {
			const li = document.createElement("li");
			li.innerHTML = `
		<div>
			<strong>${element.name}</strong>
			<p>${element.rut}</p>
			<p>${element.edad}</p>
			<p>${element.diagnostico}</p>
			<p>${element.description}</p>
		</div>

		<div class="actions">
			<button class="modificar-button" data-id="${element.id}">Modificar</button>
			<button class="eliminar-button" data-id="${element.id}">Eliminar</button>
		</div>
		`;

			elementList.appendChild(li);
		});
	}

	// Agregar controlador de eventos para borrar un elemento
	elementList.addEventListener("click", (e) => {
		if (e.target.classList.contains("eliminar-button")) {
			const elementId = parseInt(e.target.dataset.id);

			// Eliminar el elemento correspondiente del arreglo
			elements = elements.filter((element) => element.id !== elementId);

			// Guardar elementos actualizados en el Local Storage
			localStorage.setItem("elements", JSON.stringify(elements));

			// Mostrar los elementos actualizados
			showElements();
		}
	});
});

	// Agregar controlador de eventos para editar un elemento
	elementList.addEventListener("click", (e) => {
		if (e.target.classList.contains("modificar-button")) {
			const elementId = parseInt(e.target.dataset.id);

		// Obtener el elemento correspondiente del arreglo
		const element = elements.find((el) => el.id === elementId);

		if (element) {
			// Aquí puedes implementar la lógica para editar el elemento
		  	// Por ejemplo, puedes mostrar un formulario con los valores actuales del elemento
		  	// y permitir al usuario realizar cambios y guardarlos nuevamente en el arreglo

		  	// Luego de editar el elemento, puedes guardar los cambios en el Local Storage
			localStorage.setItem("elements", JSON.stringify(elements));

		  	// Mostrar los elementos actualizados
			showElements();
		}
		}
	});