"use strict"

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

   async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);
    }

    let formData = new FormData(form);
    formData.append('image', formImage.file[0]);

    if (error === 0) {
        form.classList.add('_sending');

        let response = await fetch('sendmail.php'), {
            method: 'POST',
            body: formData
        });

if (response.ok) {
    let result = await response.json();
    alert(result.message);
    formPreview.innerHTML = '';
    form.reset();
    form.classList.remove('_sending');
}

else {

    alert('Ошибка');
    form.classList.remove('_sending');
} 
            else {

    alert('Заполнены не все обязательные поля');
}
    )

function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let index = 0; index < formReq.length; index++) {
        const input = formReq[index];
        formRemoveError(input);

        if (input.classList.contains('_email')) {
            if (emailTest(input)) {
                formAddError(input);
                error++;
            }
        }
        else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
            formAddError(input);
            error++;
        }
        else {
            if (input.value === '') {
                formAddError(input);
                error++;
            }
        }

    }
    return error;
}
function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
}
function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
}
//функция теста email
function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
//Получает инпут file в переменную
const formImage = document.getElementById('formImage');
//получаем виддля превью в переменную
const formPreview = document.getElementById('formPreview');

//Слушаем изменения в инпут file
formImage.addEventListener('change', () => {
    uploadFile(formImage.files[0]);
});
function uploadFile(file) {
    //проверяем тип данных
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        alert('только картинки');
        formImage.value = '';
        return;
    }
    //проверка размера
    if (file.size > 2 * 1024 * 1024) {
        alert('Не более 2мб');
        return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
        formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
    };
    reader.onerror = function (e) {
        alert('Ошибка');
    };
    reader.readAsDataURL(file);
}
});  