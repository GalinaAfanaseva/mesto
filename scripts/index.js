

const popupProfile = document.querySelector('.popup_profile');
const buttonChangeProfile = document.querySelector('.profile-info__edit-button');
const buttonClosePopupProfile = popupProfile.querySelector('.popup__close');
const formProfile = popupProfile.querySelector('.edit-form__profile');
const profileOldName = document.querySelector('.profile-info__name');
const profileOldDef = document.querySelector('.profile-info__def');
const profileNewName = formProfile.querySelector('.edit-form__text_profile_name');
const profileNewDef = formProfile.querySelector('.edit-form__text_profile_def');
const buttonSaveProfile = formProfile.querySelector('.edit-form__submit');

const popupAddCards = document.querySelector('.popup_add-cards');
const buttonAddCardOpen = document.querySelector('.profile__add-card-button');
const buttonAddCardClose = popupAddCards.querySelector('.popup__close');
const formCard = document.querySelector('.edit-form__card');
const newCardName = formCard.querySelector('.edit-form__text_card_name');
const newCardSource = formCard.querySelector('.edit-form__text_card_src');

const popupImg = document.querySelector('.popup_img');
const poppingImage = popupImg.querySelector('.popup__img-big');
const poppingImageCaption = popupImg.querySelector('.popup__img-caption');
const buttonClosePopupImg = popupImg.querySelector('.popup__close');

const photoGrid = document.querySelector('.photo-grid');

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^ Functions ^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// ------ Добавление новой карточки по шаблону ------

function newCard (item) {
  const cardTemplate = document.querySelector('#card-template').content.cloneNode(true);
  const cardTemplateImage = cardTemplate.querySelector('.photo-card__img');
  cardTemplate.querySelector('.photo-card__name').textContent = item.name;
  cardTemplateImage.src = item.link;
  cardTemplateImage.alt = item.name;
  // ------ Лайк на карточку ------
  cardTemplate.querySelector('.photo-card__like-button').addEventListener('click', likeCard);
  // ------ Удаление карточки ------
  cardTemplate.querySelector('.photo-card__delete').addEventListener('click', deleteCard);
  // ------ Открытие фотографии ------
  cardTemplateImage.addEventListener('click', () => openImg(item));
  return cardTemplate;
}

function addCard (item) {
  photoGrid.prepend(newCard(item));
}

// ------ Открытие фотографии ------
function openImg (item) {
  openPopupImg(item);
}

// ------  Удаление карточки ------

function deleteCard (event) {
  event.target.closest('.photo-card').remove();
}

// ------ Ставим лайки ------

function likeCard (event) {
  event.target.classList.toggle('photo-card__like-button_active');;
};

// ------ Открытие попап форм ------

function openPopupProfile () {
  openPopup(popupProfile);
  profileNewName.value = profileOldName.textContent;
  profileNewDef.value = profileOldDef.textContent;
}

function openPopupCard () {
  openPopup(popupAddCards);
  newCardName.value = null;
  newCardSource.value = null;
}

function openPopupImg (item) {
  openPopup(popupImg);
  poppingImage.src = item.link;
  poppingImage.alt = item.name;
  poppingImageCaption.textContent = item.name;
}

// ------ Добавить/удалить класс popup_opened ------

function openPopup (element) {
  element.classList.add('popup_opened');
}

function closePopup (element) {
  element.classList.remove('popup_opened');
}

// ------ Сохранение новых данных профиля ------

function savePopupProfile (event) {
  event.preventDefault();
  profileOldName.textContent = profileNewName.value;
  profileOldDef.textContent = profileNewDef.value;
  closePopup(popupProfile);
} 

// ------ Сохранение новой карточки ------

function savePopupCard (event) {
  event.preventDefault();
  addCard({name: newCardName.value, link: newCardSource.value});
  closePopup(popupAddCards);
} 

// ------ Валидность форм ------

const showInputError = (formElement, inputElement, errorMessage) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  formError.textContent = errorMessage;
  inputElement.classList.add('edit-form__text_type_error');
}

const hideInputError = (formElement, inputElement) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  formError.textContent = '';
  inputElement.classList.remove('edit-form__text_type_error');
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
    buttonElement.classList.add('edit-form__submit_inactive');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('edit-form__submit_inactive');
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

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


// ------ Загрузка карточек из массива initialCards на страницу ------

initialCards.forEach(addCard);

// ------ Изменение данных профиля ------

buttonChangeProfile.addEventListener('click', openPopupProfile);
buttonClosePopupProfile.addEventListener('click', () => {
  closePopup(popupProfile);
  hideInputError(formProfile, profileNewName);
  hideInputError(formProfile, profileNewDef);
  buttonSaveProfile.classList.remove('edit-form__submit_inactive');
  buttonSaveProfile.disabled = false;
});
formProfile.addEventListener('submit', savePopupProfile); 

// ------ Добавление новой карточки ------

buttonAddCardOpen.addEventListener('click', openPopupCard);
buttonAddCardClose.addEventListener('click', () => {
  closePopup(popupAddCards);
});
formCard.addEventListener('submit', savePopupCard);

// ------ Закрытие большого изображения ------

buttonClosePopupImg.addEventListener('click', () => {
  closePopup(popupImg);
}); 
