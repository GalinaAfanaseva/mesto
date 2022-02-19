const showInputError = (formElement, inputElement, errorMessage, inputErrorClass) => {
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    formError.textContent = errorMessage;
    inputElement.classList.add(inputErrorClass); //red line
}
  
const hideInputError = (formElement, inputElement, inputErrorClass) => {
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    formError.textContent = '';
    inputElement.classList.remove(inputErrorClass); //red line
}

const checkInputValidity = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, config.inputErrorClass);
    } else {
      hideInputError(formElement, inputElement, config.inputErrorClass);
    }
}
  
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
}
  
const toggleProfileButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
    } else {
      buttonElement.disabled = false;
    }
}

const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, config);
            toggleProfileButtonState(inputList, buttonElement);
          });
    });
}

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
        formList.forEach((formElement) => {
        setEventListeners(formElement, config);
    });
}

enableValidation({
    formSelector: '.fillbox__form',
    inputSelector: '.fillbox__text',
    submitButtonSelector: '.fillbox__submit',
    inputErrorClass: 'fillbox__text_type_error'
});
