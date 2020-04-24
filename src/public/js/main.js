const formSearch = document.querySelector('#formSearch');
const formModal = document.querySelector('#formModal');
const form = document.querySelector('#form');

const data__fullname = document.querySelector('#carnet .data__fullname');
const data__cedula = document.querySelector('#carnet .data__cedula');
const data__department = document.querySelector('#carnet .data__department');
const data__position = document.querySelector('#carnet .data__position');
const data__expiration = document.querySelector('#carnet .data__expiration');
const data__blood = document.querySelector('#carnet .data__blood');

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

    const cedula = document.getElementById("form__cedula").value;
    const firstname = document.getElementById("form__firstname").value;
    const lastname = document.getElementById("form__lastname").value;
    const department = document.getElementById("form__department").value;
    const position = document.getElementById("form__position").value;
    const expiration = document.getElementById("form__expiration").value;
    const blood = document.getElementById("form__blood").value;

    let space = ' ';
    let ci = 'CI.';
    data__cedula.textContent = ci.concat(space, cedula);
    data__fullname.textContent = firstname.concat(space, lastname);
    data__department.textContent = department;
    data__position.textContent = position;
    // data__expiration.textContent = expiration;
    // data__blood.textContent = blood;

    // Input cedula number
    form.form__cedula.addEventListener('keyup', (e) => {
        let inputValue = e.target.value;
        form.form__cedula.value = inputValue
            .replace(/\s/g, '')
            .replace(/\D/g, '')
            .trim();

        data__cedula.textContent = inputValue;
    });

    // Input firstname
    form.form__firstname.addEventListener('keyup', (e) => {
        let inputValue = e.target.value;
        form.form__firstname.value = inputValue.replace(/[0-9]/g, ''); // Eliminar los numeros 

        data__fullname.textContent = inputValue.concat(space, form.form__lastname.value);
    });

    // Input lastname
    form.form__lastname.addEventListener('keyup', (e) => {
        let inputValue = e.target.value;
        form.form__lastname.value = inputValue.replace(/[0-9]/g, '');

        data__fullname.textContent = form.form__firstname.value.concat(space, inputValue);
    });


    // Input department
    form.form__department.addEventListener('keyup', (e) => {
        let inputValue = e.target.value;
        form.form__department.value = inputValue;

        data__department.textContent = inputValue;
    });

    // Input position
    form.form__position.addEventListener('keyup', (e) => {
        let inputValue = e.target.value;
        form.form__position.value = inputValue;

        data__position.textContent = inputValue;
    });

    // Input date_of_expiration
    form.form__expiration.addEventListener('click', (e) => {
        if (formModal) formModal.modal__expiration.value = form.form__expiration.value;

        data__expiration.textContent = form.form__expiration.value;
    });

    // Input blood_type
    form.form__blood.addEventListener('click', (e) => {
        data__blood.textContent = form.form__blood.value;
    });
}

// validations to create the card
if (formModal) {
    // get the current values of the inputs 
    formModal.printYes.addEventListener('click', (e) => {
        formModal.modal__cedula.value = form.form__cedula.value;
        formModal.modal__date_of_expiration.value = form.form__expiration.value;
        formModal.modal__department.value = form.form__department.value.toUpperCase();
        formModal.modal__position.value = form.form__position.value.toUpperCase();
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