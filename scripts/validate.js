// ------ Валидация формы редактирования профиля ------

const showInputError = (formElement, inputElement, errorMessage) => {
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    formError.textContent = errorMessage;
    inputElement.classList.add('edit-form__text_type_error'); //red line
  }
  
  const hideInputError = (formElement, inputElement) => {
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    formError.textContent = '';
    inputElement.classList.remove('edit-form__text_type_error'); //red line
  }
   
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
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
  
  profileNewName.addEventListener('input', () => {
    const inputList = [profileNewName, profileNewDef];
    checkInputValidity(formProfile, profileNewName);
    toggleProfileButtonState(inputList, buttonSaveProfile);
  });
  
  profileNewDef.addEventListener('input', () => {
    const inputList = [profileNewName, profileNewDef];
    checkInputValidity(formProfile, profileNewDef);
    toggleProfileButtonState(inputList, buttonSaveProfile);
  });
  
  // ------ Валидация формы добавления новой карточки ------
  
  newCardName.addEventListener('input', () => {
    const inputList = [newCardName, newCardSource];
    checkInputValidity(formCard, newCardName);
    toggleProfileButtonState(inputList, buttonSaveCard);
  });
  
  newCardSource.addEventListener('input', () => {
    const inputList = [newCardName, newCardSource];
    checkInputValidity(formCard, newCardSource);
    toggleProfileButtonState(inputList, buttonSaveCard);
  });
/*

  // ------ Новый код ------

  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.edit-form__text'));
    const buttonElement = formElement.querySelector('.edit-form__submit');
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);
            toggleProfileButtonState(inputList, buttonElement);
          });
    });
  }

  const enableValidation = () => {
      const formList = Array.from(document.querySelectorAll('.edit-form'));
  }


const validConfig = {
    formSelector: '.edit-form__profile',
    submitButtonSelector: '.edit-form__submit',
    inputErrorClass: 'edit-form__text_type_error',
    errorClass: 'popup__error_visible'
}

enableValidation(validConfig);

  /*
  const enableValidation = ({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
  }) => {
    if (!inputElement.validity.valid) {
      const formError = formElement.querySelector(`.${inputElement.id}-error`);
      formError.textContent = errorMessage;
      inputElement.classList.add('edit-form__text_type_error');
    } else {
      const formError = formElement.querySelector(`.${inputElement.id}-error`);
      formError.textContent = '';
      inputElement.classList.remove('edit-form__text_type_error');
    }
  }
  
  enableValidation({
    formSelector: '.edit-form__profile',
    inputSelector: '.edit-form__text_profile_name',
    submitButtonSelector: '.edit-form__submit',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
  
  const formProfile = popupProfile.querySelector('.edit-form__profile');
  const profileOldName = document.querySelector('.profile-info__name');
  const profileOldDef = document.querySelector('.profile-info__def');
  const profileNewName = formProfile.querySelector('.edit-form__text_profile_name');
  const profileNewDef = formProfile.querySelector('.edit-form__text_profile_def');
  const buttonSaveProfile = formProfile.querySelector('.edit-form__submit');
  */