

const popupProfile = document.querySelector('.popup_profile');
const changeProfileButton = document.querySelector('.profile-info__edit-button');
const closePopupProfileButton = popupProfile.querySelector('.popup__close');
const formProfile = popupProfile.querySelector('.edit-form__profile');
const profileOldName = document.querySelector('.profile-info__name');
const profileOldDef = document.querySelector('.profile-info__def');
const profileNewName = formProfile.querySelector('.edit-form__text_profile_name');
const profileNewDef = formProfile.querySelector('.edit-form__text_profile_def');

const popupCards = document.querySelector('.popup_cards');
const addCardButton = document.querySelector('.profile__add-card-button');
const closePopupCardsButton = popupCards.querySelector('.popup__close');
const formCard = document.querySelector('.edit-form__card');
const newCardName = formCard.querySelector('.edit-form__text_card_name');
const newCardSource = formCard.querySelector('.edit-form__text_card_src');

const popupImg = document.querySelector('.popup_img');
const poppingImage = popupImg.querySelector('.popup__img-big');
const poppingImageCaption = popupImg.querySelector('.popup__img-caption');
const closePopupImgButton = popupImg.querySelector('.popup__close');

const photoGrid = document.querySelector('.photo-grid');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^ Functions ^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// ------ Добавление новой карточки по шаблону ------

function addCard (item) {
  const cardTemplate = document.querySelector('#card-template').content.cloneNode(true);
  cardTemplate.querySelector('h2').textContent = item.name;
  cardTemplate.querySelector('img').src = item.link;
  cardTemplate.querySelector('img').alt = item.name;
  photoGrid.prepend(cardTemplate);
  // ------ Лайк на карточку ------
  photoGrid.querySelectorAll('.photo-card__like-button').forEach(item => {
    item.addEventListener('click', like)}); 
  // ------ Удаление карточки ------
  photoGrid.querySelectorAll('.photo-card__delete').forEach(item => {
    item.addEventListener('click', deleteCard)});
  // ------ Открытие фотографии ------
  photoGrid.querySelectorAll('.photo-card__img').forEach(item => {
    item.addEventListener('click', openImg)});  
}

// ------ Открытие фотографии ------
function openImg (event) {
  openPopupImg(event);
}

// ------  Удаление карточки ------

function deleteCard (event) {
  event.target.closest('.photo-card').remove();
}

// ------ Ставим лайки ------

function like (event) {
  event.target.closest('.photo-card__like-button').classList.toggle('photo-card__like-button_active');;
};

// ------ Открытие попап форм ------

function openPopupProfile () {
  togglePopup(popupProfile);
  profileNewName.value = profileOldName.textContent;
  profileNewDef.value = profileOldDef.textContent;
}

function openPopupCard () {
  togglePopup(popupCards);
  newCardName.value = null;
  newCardSource.value = null;
}

function openPopupImg (event) {
  togglePopup(popupImg);
  poppingImage.src = event.target.src;
  poppingImage.alt = event.target.alt;
  poppingImageCaption.textContent = event.target.alt;
}

// ------ Добавить/удалить класс popup_opened ------

function togglePopup (element) {
  element.classList.toggle('popup_opened');
}

// ------ Сохранение новых данных профиля ------

function savePopupProfile (event) {
  event.preventDefault();
  profileOldName.textContent = profileNewName.value;
  profileOldDef.textContent = profileNewDef.value;
  togglePopup(event.target.closest('.popup'));
} 

// ------ Сохранение новой карточки ------

function savePopupCard (event) {
  event.preventDefault();
  addCard({name: newCardName.value, link: newCardSource.value});
  togglePopup(event.target.closest('.popup'));
} 


// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


// ------ Загрузка карточек из массива initialCards на страницу ------

initialCards.forEach(addCard);

// ------ Изменение данных профиля ------

changeProfileButton.addEventListener('click', openPopupProfile);
closePopupProfileButton.addEventListener('click', () => {
  togglePopup(popupProfile);
});
formProfile.addEventListener('submit', savePopupProfile); 

// ------ Добавление новой карточки ------

addCardButton.addEventListener('click', openPopupCard);
closePopupCardsButton.addEventListener('click', () => {
  togglePopup(popupCards);
});
formCard.addEventListener('submit', savePopupCard);

// ------ Закрытие большого изображения ------

closePopupImgButton.addEventListener('click', () => {
  togglePopup(popupImg);
}); 
