const formSearch = document.querySelector('#formSearch');
const formModal = document.querySelector('#formModal');
const form = document.querySelector('#form');

if (formSearch) {
    // Input search by cedula
    formSearch.cedula.addEventListener('keyup', (e) => {
        let inputValue = e.target.value;

        formSearch.cedula.value = inputValue
            // Eliminamos espacios en blanco
            .replace(/\s/g, '')
            // Eliminar las letras
            .replace(/\D/g, '')
            // Elimina el ultimo espaciado
            .trim();
    });
}

if (form) {
    // Input cedula number
    form.cedula.addEventListener('keyup', (e) => {
        let inputValue = e.target.value; 
        form.cedula.value = inputValue 
            .replace(/\s/g, '') 
            .replace(/\D/g, '') 
            .trim(); 
    });

    // Input firtname
    form.firstname.addEventListener('keyup', (e) => {
        let inputValue = e.target.value; 
        form.firstname.value = inputValue.replace(/[0-9]/g, ''); // Eliminar los numeros
    });

    // Input lastname
    form.lastname.addEventListener('keyup', (e) => {
        let inputValue = e.target.value; 
        form.lastname.value = inputValue.replace(/[0-9]/g, '');
    });

    // Input department
    form.department.addEventListener('keyup', (e) => {
        let inputValue = e.target.value; 
        form.department.value = inputValue;
    });

    // Input position
    form.position.addEventListener('keyup', (e) => {
        let inputValue = e.target.value; 
        form.position.value = inputValue;
    }); 

    // Input date_of_expiration
    form.date_of_expiration.addEventListener('click', (e) => { 
        if (formModal) formModal.date_of_expiration.value = form.date_of_expiration.value;
    });
}

// validations to create the card
if (formModal) {
    // get the current values of the inputs 
    formModal.printYes.addEventListener('click', (e) => { 
        formModal.cedula.value = form.cedula.value;
        formModal.date_of_expiration.value = form.date_of_expiration.value;
        formModal.department.value = form.department.value.toUpperCase();
        formModal.position.value = form.position.value.toUpperCase(); 
    });
}

// show name of loaded file
$(document).on('change', '.custom-file-input', function () {
    let fileName = $(this).val().replace(/\\/g, '/').replace(/.*\//, '');
    $(this).parent('.custom-file').find('.custom-file-label').text(fileName);
});

// show the print window 
function imprimir() {
    window.print();
}