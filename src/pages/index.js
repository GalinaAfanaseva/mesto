import { initialCards, settings, optionsApi } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

import '../pages/index.css';

const popupProfile = document.querySelector('.popup_profile');
const buttonChangeProfile = document.querySelector('.profile-info__edit-button');
const formProfile = popupProfile.querySelector('.fillbox__form-profile');
const profileNewName = formProfile.querySelector('.fillbox__text_profile_name');
const profileNewDef = formProfile.querySelector('.fillbox__text_profile_def');
const buttonAddCardOpen = document.querySelector('.profile__add-card-button');
const formCard = document.querySelector('.fillbox__form-card');
const photoGrid = document.querySelector('.photo-grid');

// ------ VALIDATING ------

const profileFormValidator = new FormValidator(settings, formProfile);

const cardFormValidator = new FormValidator(settings, formCard);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^ FUNCTIONS ^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


//function addCard (item) {
//  const cardElement = createCard(item);
//	section.addItem(cardElement);
//}

const createCard = (item) => {
  const card = new Card(item, '#card-template', () => {
    imagePopup.open(item.link, item.name);
  });
  section.addItem(card.generateCard());
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
  profileNewName.value = user.name;
  profileNewDef.value = user.description;
  profileFormValidator.resetValidation();
});

// ------ ADDING NEW CARD ------

buttonAddCardOpen.addEventListener('click', () => {
  addCardPopup.open();
  cardFormValidator.resetValidation();
});

// ------ SAVE NEW CARD ------

const savePopupCard = (data) => {
  createCard({
    name: data.place,
    link: data.source
  });
  //section.addItem(newCard);

  addCardPopup.close();
} 

// ------------

const imagePopup = new PopupWithImage('.popup_img');
const editProfilePopup = new PopupWithForm('.popup_profile', savePopupProfile);
const addCardPopup = new PopupWithForm('.popup_add-cards', savePopupCard);
const section = new Section(createCard, '.photo-grid');
const userInfo = new UserInfo({ profileNameSelector: '.profile-info__name', profileInfoSelector: '.profile-info__def' });
const api = new Api(optionsApi);

imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
api.getInitialCards()
  .then(cards => {
    section.renderItems(cards);
  });

