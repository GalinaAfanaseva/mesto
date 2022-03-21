export class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._settings = settings;
  }

  _showInputError(inputElement, errorMessage) {
    const formError = this._formElement.querySelector(`.${inputElement.id}-error`);
    formError.textContent = errorMessage;
    inputElement.classList.add(this._settings.inputErrorClass); //red line
  }

  _hideInputError (inputElement) {
    const formError = this._formElement.querySelector(`.${inputElement.id}-error`);
    formError.textContent = '';
    inputElement.classList.remove(this._settings.inputErrorClass); //red line
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.disabled = false;
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    const { inputSelector, submitButtonSelector } = this._settings;

    this._inputList = Array.from(this._formElement.querySelectorAll(inputSelector));
    this._buttonElement = this._formElement.querySelector(submitButtonSelector);

    this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
          });
    });
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

