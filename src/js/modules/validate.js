import IMask from 'imask';

//let email = document.querySelector('.contact-box__input-item-mail');
export function validateForm() {
    //const phoneInner = document.querySelector('.contact-box__input-row-phone');
    const nameInput = document.querySelector('.contact-box__input-name');
    const phoneInput = document.querySelector('.contact-box__input-phone');
    const emailInput = document.querySelector('.contact-box__input-email');
    const contactBox = document.querySelector('.contact-box');
    let validation = true;
    const inputCheckRules = document.querySelector('.input__check-rules');
    const contactBoxBtn = document.querySelector('.contact-box__btn');
    const popup = document.querySelector('.popup');



    popup.addEventListener('click', () => popup.classList.remove('active'))


    const disabledBtn = () => {
        if (inputCheckRules.checked) {
            contactBoxBtn.classList.remove('disabled');
            contactBoxBtn.disabled = false;
        }
        else {
            contactBoxBtn.classList.add('disabled');
            contactBoxBtn.disabled = true;
        }
    }

    inputCheckRules.addEventListener('click', disabledBtn)

    const maskOptionsPhone = {
        mask: '{+} {7} (000) 000-00-00'
    };

    const maskPhone = IMask(phoneInput, maskOptionsPhone);

    const setError = (input, text) => {
        let inputRow = input.closest('.input__row');
        let inputItemSmall = inputRow.querySelector('.input__item-small');
        inputItemSmall.textContent = text;

        validation = false;

        inputRow.classList.remove('success');
        inputRow.classList.add('error');
    }

    const setSucces = (input, text) => {
        let inputRow = input.closest('.input__row');
        let inputItemSmall = inputRow.querySelector('.input__item-small');
        inputItemSmall.textContent = text;

        inputRow.classList.remove('error');
        inputRow.classList.add('success');
    }

    const isName = (name) => {
        let re = /^((?:\S+\s+){2}\S+).*/u;
        return re.test(name.value);
    }

    const isEmail = (email) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.value);
    }

    const checkInputs = () => {

        if (nameInput.value === '') {
            setError(nameInput, 'Обязательное поле.');
        } else if (!isName(nameInput)) {
            setError(nameInput, 'Проверьте поле на правильность заполения.');
        } else {
            setSucces(nameInput, '');
        }

        if (emailInput.value === '') {
            setError(emailInput, 'Обязательное поле.');
        } else if (!isEmail(emailInput)) {
            setError(emailInput, 'Почта не найдена.');
        } else {
            setSucces(emailInput, '');
        }

        if (phoneInput.value === '') {
            setError(phoneInput, 'Обязательное поле.');
        } else if (phoneInput.value.length < 19) {
            setError(phoneInput, 'Телефон не найден.');
        } else {
            setSucces(phoneInput, '');
        }

        if (!inputCheckRules.checked) {
            validation = false;
        }
    }

    contactBox.addEventListener('submit', (e) => {
        e.preventDefault()
        validation = true;
        checkInputs()
        
        if (validation) {
            // валидация успешна, данные пойдут на сервер
            console.log('Валидация прошла')
            popup.classList.add('active');
        }
        else {
            console.log('Валидация не прошла')
            // валидация не пройдена, надо вывести ошибки и не отправлять форму
        }
    })

}