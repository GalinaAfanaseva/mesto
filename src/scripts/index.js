import { initialCards } from './initialCards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

const popupProfile = document.querySelector('.popup_profile');
const buttonChangeProfile = document.querySelector('.profile-info__edit-button');
const formProfile = popupProfile.querySelector('.fillbox__form-profile');
const profileNewName = formProfile.querySelector('.fillbox__text_profile_name');
const profileNewDef = formProfile.querySelector('.fillbox__text_profile_def');
const buttonAddCardOpen = document.querySelector('.profile__add-card-button');
const formCard = document.querySelector('.fillbox__form-card');
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

function savePopupProfile (data) {
  const { name, description } = data;
  userInfo.setUserInfo(name, description);
  editProfilePopup.close();
} 

// ------ EDITING PROFILE ------

buttonChangeProfile.addEventListener('click', () => {
  editProfilePopup.open();
  const user = userInfo.getUserInfo();
  profileNewName.value = user.name.textContent;
  profileNewDef.value = user.description.textContent;
  profileFormValidator.resetValidation();
});

// ------ ADDING NEW CARD ------

buttonAddCardOpen.addEventListener('click', () => {
  addCardPopup.open();
  cardFormValidator.resetValidation();
});

// ------ SAVE NEW CARD ------

const savePopupCard = (data) => {
  const newCard = createCard({
    name: data.place,
    link: data.source
  });
  section.addItem(newCard);

  addCardPopup.close();
} 

// ------------

const imagePopup = new PopupWithImage('.popup_img');
const editProfilePopup = new PopupWithForm('.popup_profile', savePopupProfile);
const addCardPopup = new PopupWithForm('.popup_add-cards', savePopupCard);
const section = new Section({ items: initialCards, renderer: addCard}, '.photo-grid');
const userInfo = new UserInfo({ profileNameSelector: '.profile-info__name', profileInfoSelector: '.profile-info__def' });

imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
section.renderItems();

