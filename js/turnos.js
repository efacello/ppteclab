// Función para validar el formulario de turnos y guardar en localStorage
function validarFormulario() {
  console.log("Validando formulario...");
  var nombre = document.getElementById("name").value;
  var obraSocial = document.getElementById("osocial").value;
  var telefono = document.getElementById("phone").value;
  var fecha = document.getElementById("date").value;
  var hora = document.getElementById("time").value;

  // Validar que la fecha seleccionada sea de lunes a viernes
  var diaSemana = moment(fecha).isoWeekday(); // 1 (lunes) - 7 (domingo)
  console.log("Fecha seleccionada:", fecha);
  console.log("Día de la semana:", diaSemana);
  console.log("Antes del primer condicional");
  if (diaSemana >= 6) {
    Swal.fire({
      icon: "error",
      title: "Día Incorrecto",
      text: "Los turnos solo están disponibles de lunes a viernes. Por favor, elige otro día.",
    });
    return false;
  }
  console.log("Antes del segundo condicional");
  // Restricción adicional: Verificar si el día es laborable (lunes a viernes) y la hora es válida
  if (diaSemana >= 1 && diaSemana <= 5 && (hora < "14:00" || hora > "21:00")) {
    console.log("Hora inválida.");
    Swal.fire({
      icon: "error",
      title: "Hora Inválida",
      text: "Los turnos solo están disponibles de 14:00 a 21:00. Por favor, elige otro horario.",
    });
    return false;
  }
  console.log("Después del segundo condicional");
  // Verificar si ya hay un turno para la fecha y hora seleccionadas
  var turnosGuardados = JSON.parse(localStorage.getItem("turnos")) || [];
  var turnoExistente = turnosGuardados.find(
    (turno) => turno.fecha === fecha && turno.hora === hora
  );
  console.log("Turno existente:", turnoExistente);
  if (turnoExistente) {
    console.log("Turno ocupado.");
    Swal.fire({
      icon: "error",
      title: "Turno Ocupado",
      text: "Lo siento, el horario seleccionado ya está ocupado. Por favor, elige otro horario.",
    });
    return false;
  }

  // Validar que se completen todos los campos
  if (
    nombre === "" ||
    obraSocial === "" ||
    telefono === "" ||
    fecha === "" ||
    hora === ""
  ) {
    Swal.fire({
      icon: "error",
      title: "Error!!...",
      text: "Por favor, completa todos los campos.",
    });
    return false;
  }

  // Validar formato de telefono
  var telefonoRegex = /^\d{10}$/;
  if (!telefonoRegex.test(telefono)) {
    Swal.fire({
      icon: "error",
      title: "Olvidaste algo?",
      text: "Por favor, introduce un número de teléfono sin el 15, sin el 0.",
    });
    return false;
  }

  // Guardar el turno en localStorage
  turnosGuardados.push({ nombre, obraSocial, telefono, fecha, hora });
  localStorage.setItem("turnos", JSON.stringify(turnosGuardados));

  // Si se valida todo...
  Swal.fire({
    icon: "success",
    title: "¡Gracias!",
    text: "Tu turno fue agendado.",
    timer: 45000,
  });

  return true;
}

// Asignar la función de validación al evento submit del formulario
document
  .getElementById("appointment-form")
  .addEventListener("submit", function (event) {
    console.log("Intento de envío de formulario...");
    // Prevenir que se envíe el formulario si la validación no es exitosa
    if (!validarFormulario()) {
      event.preventDefault();
    }
  });
