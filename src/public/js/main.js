const formSearch = document.querySelector('#formSearch');
const form = document.querySelector('#form');

if (formSearch) {
    // Input search by cedula
    formSearch.searchCedula.addEventListener('keyup', (e) => {
        let valorInput = e.target.value;

        formSearch.searchCedula.value = valorInput
            // Eliminamos espacios en blanco
            .replace(/\s/g, '')
            // Eliminar las letras
            .replace(/\D/g, '')
            // Elimina el ultimo espaciado
            .trim();
    });
}

if (form) {
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

    // Input numero de firtname
    form.firstname.addEventListener('keyup', (e) => {
        let valorInput = e.target.value;

        form.firstname.value = valorInput
            // Eliminar los numeros
            .replace(/[0-9]/g, '');
    });

    // Input numero de lastname
    form.lastname.addEventListener('keyup', (e) => {
        let valorInput = e.target.value;

        form.lastname.value = valorInput
            // Eliminar los numeros
            .replace(/[0-9]/g, '');
    });
}

// mostrar el nombre del archivo cargado
$(document).on('change', '.custom-file-input', function () {
    let fileName = $(this).val().replace(/\\/g, '/').replace(/.*\//, '');
    $(this).parent('.custom-file').find('.custom-file-label').text(fileName);
});

// imprimirElemento 
function imprimir() {
    window.print();
}