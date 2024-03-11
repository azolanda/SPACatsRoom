"use strict"

function contactsForm() {
    let form = document.getElementById('contact__form');
    let formRequired = document.querySelectorAll('._required');

    for (let i = 0; i < formRequired.length; i++) {
        let input = formRequired[i];
        input.addEventListener('blur', function () {
            formRemoveError(input);
        })
    }

    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();
        let error = formValidate(form);

        let formData = new FormData(form);

        const mainBox = document.querySelector('#main-box');
        const messagePopup = document.createElement('div');
        messagePopup.classList.add('message__popup');
        let messagePopupInnerHTML = '<div class = "message__box">';

        if (error === 0) {
            // отправка формы
            form.classList.add('_sending');

            const response = await fetch(baseUrl + 'sendmail', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                let result = await response.json();

                if (result.message == "received") {
                    form.classList.remove('_sending');
                    form.reset();
                    messagePopupInnerHTML += `<p>Ваше сообщение успешно отправлено</p>`;
                } else {
                    messagePopupInnerHTML += `<p>Ошибка отправки сообщения: + ${result.message}</p>`;
                    form.classList.remove('_sending');
                }
            } else {
                messagePopupInnerHTML += `<p>Server error: message was not send</p>`;
                form.classList.remove('_sending');
            }
        } else {
            messagePopupInnerHTML += `<p>Необходимо корректно заполнить все поля формы</p>`;
        }

        messagePopupInnerHTML += `<button id = "btn__close-message" class="btn btn-primary btn-articles btn__close btn-dark">Закрыть</button></div>`;
        messagePopup.innerHTML = messagePopupInnerHTML;
        mainBox.appendChild(messagePopup);

        document.querySelector('#btn__close-message').addEventListener('click', () => {
            messagePopup.remove();
        })
    }

    function formValidate(form) {
        let error = 0;

        const formRequired = document.querySelectorAll('._required');
        const companyField = document.getElementById('company_field_id');

        if (companyField.value.length > 0) {
            error++;
        }

        for (let i = 0; i < formRequired.length; i++) {
            let input = formRequired[i];

            formRemoveError(input);

            if (input.value === '' && getComputedStyle(input).display != 'none') {
                formAddError(input);
                error++;
            } else if (input.classList.contains('_name')) {
                if (nameTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.classList.contains('_company') || input.classList.contains('_comments')) {
                if (companyTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else {
                if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                    formAddError(input);
                    error++;
                }
            }
        }

        return error;
    }

    function formAddError(input) {
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.classList.remove('_error');
    }

    function nameTest(input) {
        return !/^[a-zA-Zа-яА-я- \-]*$/i.test(input.value);
    }

    function emailTest(input) {
        return !/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i.test(input.value);
    }

    function companyTest(input) {
        return !/^[0-9a-zA-Zа-яА-я- \-\.\+\"\_\@\,\#\!\?\:\;\(\)\№\&\/]*$/i.test(input.value);
    }
}