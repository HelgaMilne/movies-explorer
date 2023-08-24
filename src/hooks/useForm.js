import { useState, useCallback } from 'react';

export function useForm(inputValues = {}) {
    const [values, setValues] = useState(inputValues);
    const [errorMessages, setErrorMessages] = useState({});
    const [validationState, setValidationState] = useState({});
    const errorMessageForName = 'Допускаются только латиница, кириллица, пробел или дефис.'
    const errorMessageForPassword = "от 8 до 40 символов, в том числе по меньшей мере, одну цифру,  одну прописную, одну строчную буквы"
    const errorMessageForEmail = `Пожалуйста, введите адрес электронной почты в формате "username@mailname.domen"`;
    const patternEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+[.]{1}[a-zA-Z]{2,6}$/;

    function checkEmail(item) {
        return !patternEmail.test(item);
    }

    function returnErrorText(name) {
        if (name === 'name') {
            return errorMessageForName;
        } else if (name === 'password') {
            return errorMessageForPassword;
        }
    }

    const handleChange = (event) => {
        if (event.target.name === 'email') {
            const isError = checkEmail(event.target.value);
            if (event.target.value === '') {
                setErrorMessages({ ...errorMessages, [event.target.name]: 'Заполните это поле' });
            } else {
                const errorMessage = isError ? errorMessageForEmail : '';
                setErrorMessages({ ...errorMessages, [event.target.name]: errorMessage });
            }
            setValidationState({ ...validationState, [event.target.name]: event.target.validity.valid && !isError });

        } else if (event.target.name === 'name' || event.target.name === 'password') {
            if (event.target.validity.patternMismatch) {
                setErrorMessages({ ...errorMessages, [event.target.name]: returnErrorText(event.target.name) });
            } else if (!event.target.validity.valid) {
                setErrorMessages({ ...errorMessages, [event.target.name]: event.target.validationMessage });
            } else {
                setErrorMessages({ ...errorMessages, [event.target.name]: '' });
            }
            setValidationState({ ...validationState, [event.target.name]: event.target.validity.valid });
        }
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrorMessages(newErrors);
            setValidationState(newIsValid);
        },
        [setValues, setErrorMessages, setValidationState]
    );

    return {
        values,
        setValues,
        errorMessages,
        setErrorMessages,
        validationState,
        setValidationState,
        handleChange,
        resetForm
    };
}
