let popupProfile = document.querySelector('.popup_profile');
let popupCards = document.querySelector('.popup_cards');
let popupImg = document.querySelector('.popup_img');
let poppingImage = popupImg.querySelector('.popup__img-big');
let poppingImageCaption = popupImg.querySelector('.popup__img-caption');
let changeProfileButton = document.querySelector('.profile-info__edit-button');
let addCardButton = document.querySelector('.profile__add-button');

let closePopupProfileButton = popupProfile.querySelector('.popup__close');
let closePopupCardsButton = popupCards.querySelector('.popup__close');
let closePopupImgButton = popupImg.querySelector('.popup__close');

let profileOldName = document.querySelector('.profile-info__name');
let profileOldDef = document.querySelector('.profile-info__def');
let formProfile = document.querySelector('.edit-form__profile');
const formCard = document.querySelector('.edit-form__card');
let profileNewName = formProfile.querySelector('.edit-form__text_profile_name');
let profileNewDef = formProfile.querySelector('.edit-form__text_profile_def');
const newCardName = formCard.querySelector('.edit-form__text_card_name');
const newCardSource = formCard.querySelector('.edit-form__text_card_src');
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
function openImg () {
  openPopup(popupImg);
}

// ------  Удаление карточки ------

function deleteCard (event) {
  event.target.closest('.photo-card').remove();
}

// ------ Ставим лайки ------

function like (event) {
  event.target.closest('.photo-card__like-button').classList.toggle('photo-card__like-button_active');;
};

// ------ Добавить/удалить класс popup_opened ------

function togglePopup (element) {
  element.classList.toggle('popup_opened');
}

// ------ Открытие попап форм ------

function openPopup (element) {
  if (element === popupProfile) {
    profileNewName.value = profileOldName.textContent;
    profileNewDef.value = profileOldDef.textContent;
  } else if (element === popupCards) {
    newCardName.value = null;
    newCardSource.value = null;
  } else {
    console.log(event.target);
    poppingImage.src = event.target.src;
    poppingImage.alt = event.target.alt;
    poppingImageCaption.textContent = event.target.alt;
  }
    togglePopup(element);
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

changeProfileButton.addEventListener('click', () => {
  openPopup(popupProfile);
});
closePopupProfileButton.addEventListener('click', () => {
  togglePopup(popupProfile);
});
formProfile.addEventListener('submit', savePopupProfile); 

// ------ Добавление новой карточки ------

addCardButton.addEventListener('click', () => {
  openPopup(popupCards);
});
closePopupCardsButton.addEventListener('click', () => {
  togglePopup(popupCards);
});
formCard.addEventListener('submit', savePopupCard);

// ------ Закрытие большого изображения ------

closePopupImgButton.addEventListener('click', () => {
  togglePopup(popupImg);
}); 
