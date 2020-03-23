const form = document.querySelector('#form');

// Input numero de cedula
form.cedula.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;

    form.cedula.value = valorInput
        // Eliminamos espacios en blanco
        .replace(/\s/g, '')
        // Eliminar las letras
        .replace(/\D/g, '')
        // Elimina el ultimo espaciado
        .trim();
});

// jQuery para mostrar el nombre del archivo cargado
$(document).on('change', '.custom-file-input', function () {
    let fileName = $(this).val().replace(/\\/g, '/').replace(/.*\//, '');
    $(this).parent('.custom-file').find('.custom-file-label').text(fileName);
});


// // * Select del mes generado dinamicamente.
// for (let i = 1; i <= 12; i++) {
//     let opcion = document.createElement('option');
//     opcion.value = i;
//     opcion.innerText = i;
//     form.selectMonth.appendChild(opcion);
// }

// // * Select del año generado dinamicamente.
// const yearActual = new Date().getFullYear();
// for (let i = yearActual; i <= yearActual + 4; i++) {
//     let opcion = document.createElement('option');
//     opcion.value = i;
//     opcion.innerText = i;
//     form.selectYear.appendChild(opcion);
// }