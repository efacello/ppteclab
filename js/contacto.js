// Validar el formulario
function validarFormulario() {  
  var nombre = document.getElementById("nombre").value;
  var email = document.getElementById("email").value;
  var telefono = document.getElementById("tel").value;
  var asunto = document.getElementById("asunto").value;
  var mensaje = document.getElementById("text").value;

  // Validar que se completen todos los campos
  if (nombre === "" || email === "" || telefono === "" || asunto === "" || mensaje === "") {
    Swal.fire({
      icon: 'error',
      title: 'Error!!...',
      text: 'Por favor, completa todos los campos.'
    });
    return false;
  }

  // Validar formato de email
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    Swal.fire({
      icon: 'error',
      title: 'Te confundiste?',
      text: 'Por favor, introduce una dirección de correo electrónico válida.'
    });
    return false;
  }

  // Validar formato de telefono
  var telefonoRegex = /^\d{10}$/;
  if (!telefonoRegex.test(telefono)) {
    Swal.fire({
      icon: 'error',
      title: 'Olvidaste algo?',
      text: 'Por favor, introduce un número de teléfono válido (10 dígitos).'
    });
    return false;
  }
    // Si se valida todo...
    Swal.fire({
      icon: 'success',
      title: '¡Muchas gracias!',
      text: 'Los datos se han enviado correctamente, en breve me comunico con vos.',
      timer: 40000
    });
  return true;
}

// Asignar la funcion de validación al evento submit
document.getElementById("contactForm").addEventListener("submit", function(event) {
  // Prevenir que se envie el formulario si la validación no es exitosa
  if (!validarFormulario()) {
    event.preventDefault();
  }
});
