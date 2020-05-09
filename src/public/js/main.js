const formSearch = document.getElementById('formSearch');
const formModal = document.getElementById('formModal');
const form = document.getElementById('form');

const data__fullname = document.getElementById('data__fullname');
const data__cedula = document.getElementById('data__cedula');
const data__department = document.getElementById('data__department');
const data__position = document.getElementById('data__position');
const data__expiration = document.getElementById('data__expiration');
const data__blood = document.getElementById('data__blood');

const carnet = document.getElementById('carnet');

// Rotacion del carnet
if (carnet) carnet.addEventListener('click', () => {
    carnet.classList.toggle('active');
});

// validations input Search from of form
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
    let vence = 'Vence:';
    let blood_type = 'Grupo sanguíneo:';

    if (cedula) {
        data__cedula.textContent = ci.concat(space, cedula);
        data__fullname.textContent = firstname.concat(space, lastname);
        data__department.textContent = department;
        data__position.textContent = position;
        data__expiration.textContent = vence.concat(space, expiration);
        data__blood.textContent = blood_type.concat(space, blood);
    }

    // Input cedula number
    form.form__cedula.addEventListener('keyup', (e) => {
        let inputValue = e.target.value;
        form.form__cedula.value = inputValue
            .replace(/\s/g, '')
            .replace(/\D/g, '')
            .trim();

        data__cedula.textContent = ci.concat(space, inputValue);
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

    // Evento disparado cuando se cambie la fecha
    form.form__expiration.addEventListener('change', function () {
        data__expiration.textContent = vence.concat(space, form.form__expiration.value);
    });

    // Evento disparado cuando se cambie el tipo desangre
    form.form__blood.addEventListener('change', function () {
        data__blood.textContent = blood_type.concat(space, form.form__blood.value);
    });

    // Actualizo el Label con el nombre del archivo que se selecciono
    form.form__photo.addEventListener('change', function () {
        let filename = form.form__photo.value.replace(/\\/g, '/').replace(/.*\//, '');
        document.getElementById('file__label').textContent = filename;

        if (form.form__photo.value) {
            if (carnet) {
                document.getElementById('btn-form').textContent = 'Actualizar Foto';
                document.getElementById('btn-form').style.display = "block";

                document.getElementById("btn-modal").style.display = "none";
            } else {
                document.getElementById('btn-form').textContent = 'Visualizar Carnet';
                document.getElementById('btn-form').style.display = "block";

                document.getElementById("btn-modal").style.display = "none";
            }
        } else {
            document.getElementById('file__label').textContent = 'Seleccionar Archivo';

            if (carnet) {
                document.getElementById('btn-form').textContent = 'Imprimir';
                document.getElementById('btn-form').style.display = "none";

                document.getElementById("btn-modal").style.display = "block";
            } else {
                document.getElementById('btn-form').textContent = 'Visualizar Carnet';
                document.getElementById('btn-form').style.display = "block";

                document.getElementById("btn-modal").style.display = "none";
            }
        }
    });

    if (!form.form__photo.value) {
        if (carnet) {
            document.getElementById('btn-form').textContent = 'Imprimir';
            document.getElementById('btn-form').style.display = "none";

            document.getElementById("btn-modal").style.display = "block";
        } else {
            document.getElementById('btn-form').textContent = 'Visualizar Carnet';
            document.getElementById('btn-form').style.display = "block";

            document.getElementById("btn-modal").style.display = "none";
        }
    }
}

// validations to create the card
if (formModal) {
    // get the current values of the inputs 
    formModal.printYes.addEventListener('click', (e) => {
        formModal.modal__cedula.value = form.form__cedula.value;
        formModal.modal__firstname.value = form.form__firstname.value.toUpperCase();
        formModal.modal__lastname.value = form.form__lastname.value.toUpperCase();
        formModal.modal__department.value = form.form__department.value.toUpperCase();
        formModal.modal__position.value = form.form__position.value.toUpperCase();
        formModal.modal__expiration.value = form.form__expiration.value;
        formModal.modal__blood.value = form.form__blood.value;
    });
}

// show the print window 
function imprimir() {

    //la impresion solo sale bien si la clase active esta activada,
    //por eso estas validaciones, y siempre imprimirla correctamente,
    //y para dejar el carnet en la misma posicion en la que el usuario le dio al boton

    if (carnet.classList.contains("active")) {
        window.print();
    } else {
        carnet.classList.add("active");
        window.print();
        carnet.classList.remove("active");
    }
}