import { initialCards } from './initialCards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

const popupProfile = document.querySelector('.popup_profile');
const buttonChangeProfile = document.querySelector('.profile-info__edit-button');
const buttonClosePopupProfile = popupProfile.querySelector('.popup__close');
const formProfile = popupProfile.querySelector('.fillbox__form-profile');
const profileOldName = document.querySelector('.profile-info__name');
const profileOldDef = document.querySelector('.profile-info__def');
const profileNewName = formProfile.querySelector('.fillbox__text_profile_name');
const profileNewDef = formProfile.querySelector('.fillbox__text_profile_def');
const buttonSaveProfile = formProfile.querySelector('.fillbox__submit');

const popupAddCards = document.querySelector('.popup_add-cards');
const buttonAddCardOpen = document.querySelector('.profile__add-card-button');
const buttonAddCardClose = popupAddCards.querySelector('.popup__close');
const formCard = document.querySelector('.fillbox__form-card');
const newCardName = formCard.querySelector('.fillbox__text_card_name');
const newCardSource = formCard.querySelector('.fillbox__text_card_src');
const buttonSaveCard = formCard.querySelector('.fillbox__submit');

const popupImg = document.querySelector('.popup_img');
const poppingImage = popupImg.querySelector('.popup__img-big');
const poppingImageCaption = popupImg.querySelector('.popup__img-caption');
const buttonClosePopupImg = popupImg.querySelector('.popup__close');

const photoGrid = document.querySelector('.photo-grid');

// ------ VALIDATING ------

const profileFormValidator = new FormValidator({
  inputSelector: '.fillbox__text',
  submitButtonSelector: '.fillbox__submit',
  inputErrorClass: 'fillbox__text_type_error'
}, formProfile);

const cardFormValidator = new FormValidator({
  inputSelector: '.fillbox__text',
  submitButtonSelector: '.fillbox__submit',
  inputErrorClass: 'fillbox__text_type_error'
}, formCard);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^ FUNCTIONS ^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


function addCard (item) {
  const cardElement = createCard(item);
	photoGrid.prepend(cardElement);
}



const createCard = (item) => {
  const card = new Card(item, '#card-template', () => {
    imagePopup.open(item.link, item.name);
  });
	return card.generateCard();
}



// ------ OPEN POPUP FORMS ------
/*
function openPopupProfile () {
  openPopup(popupProfile);
  profileNewName.value = profileOldName.textContent;
  profileNewDef.value = profileOldDef.textContent;
  profileFormValidator.resetValidation();
}

function openPopupCard () {
  openPopup(popupAddCards);
  newCardName.value = null;
  newCardSource.value = null;
  cardFormValidator.resetValidation();
}

const openPopupImg = (link, name) => {
  openPopup(popupImg);
  poppingImage.src = link;
  poppingImage.alt = name;
  poppingImageCaption.textContent = name;
}*/

// ------ ADD/REMOVE 'popup_opened' ------
/*
function openPopup (popupForm) {
  popupForm.classList.add('popup_opened');
  document.addEventListener('keyup', closePopupByEsc);
  popupForm.addEventListener('click', closePopupByOverlay);
}

function closePopup (popupForm) {
  popupForm.classList.remove('popup_opened');
  document.removeEventListener('keyup', closePopupByEsc);
  popupForm.removeEventListener('click', closePopupByOverlay);
}
*/
// ------ SAVE EDITED PROFILE INFO ------

function savePopupProfile (data) {
  const { name, description } = data;
  userInfo.setUserInfo(name, description);
  editProfilePopup.close();
} 

// ------ SAVE NEW CARD ------

const savePopupCard = (data) => {
  const newCard = createCard({
    name: data.place,
    link: data.source
  });
  section.addItem(newCard);

  addCardPopup.close();
} 

// ------ ESCAPE CLOSING POPUP  ------
/*
function closePopupByEsc (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
}

// ------ CLOSING POPUP BY CLICK ON GREY AREA ------

function closePopupByOverlay (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);  
  };
}
*/
// ------ CREATING INITIAL CARDS FROM CARDS.JS ------

//initialCards.forEach(addCard);

// ------ EDITING PROFILE ------

buttonChangeProfile.addEventListener('click', () => {
  editProfilePopup.open();
  const user = userInfo.getUserInfo();
  profileNewName.value = user.name.textContent;
  profileNewDef.value = user.description.textContent;
  profileFormValidator.resetValidation();
});
/*
buttonClosePopupProfile.addEventListener('click', () => {
  closePopup(popupProfile);
});
*/

//formProfile.addEventListener('submit', savePopupProfile); 

// ------ ADDING NEW CARD ------

buttonAddCardOpen.addEventListener('click', () => {
  addCardPopup.open();
  cardFormValidator.resetValidation();
});
/*
buttonAddCardClose.addEventListener('click', () => {
  closePopup(popupAddCards);
});
*/
//formCard.addEventListener('submit', savePopupCard);

const imagePopup = new PopupWithImage('.popup_img');
const editProfilePopup = new PopupWithForm('.popup_profile', savePopupProfile);
const addCardPopup = new PopupWithForm('.popup_add-cards', savePopupCard);
const section = new Section({ items: initialCards, renderer: addCard}, '.photo-grid');
const userInfo = new UserInfo({ profileNameSelector: '.profile-info__name', profileInfoSelector: '.profile-info__def' });

imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
section.renderItems();



// ------ CLOSING BIG PIC POPUP ------
/*
buttonClosePopupImg.addEventListener('click', () => {
  closePopup(popupImg);
}); */


