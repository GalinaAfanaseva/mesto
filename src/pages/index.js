import { settings, optionsApi } from '../utils/constants.js';
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
const profileName = formProfile.querySelector('.fillbox__text_profile_name');
const profileDef = formProfile.querySelector('.fillbox__text_profile_def');
const buttonAddCardOpen = document.querySelector('.profile__add-card-button');
const buttonChangeAvatar = document.querySelector('.profile-info__avatar');
const formAvatar = document.querySelector('.fillbox__form-avatar');
const formCard = document.querySelector('.fillbox__form-card');

let myUserId;

// ------ VALIDATING ------

const profileFormValidator = new FormValidator(settings, formProfile);

const cardFormValidator = new FormValidator(settings, formCard);

const avatarChangeValidator = new FormValidator(settings, formAvatar);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarChangeValidator.enableValidation();

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^ FUNCTIONS ^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


const createCard = (item) => {
  const card = new Card(
    item, 
    '#card-template', 
    () => {
      imagePopup.open(item.link, item.name);
    },
    () => {
      if (card.isLiked()) {
        api.deleteLike(item._id)
        .then(res => {
          card.setLikes(res.likes)
        })
        .catch(err => {
          console.log(err);
        })
      } else {
        api.addLike(item._id)
        .then(res => {
          card.setLikes(res.likes)
        })
        .catch(err => {
          console.log(err);
        })
      }
    }, 
    (id) => {
      deleteCardPopup.open();
      deleteCardPopup.changeSubmitHandler(() => {
        api.deleteCard(id)
        .then(res => {
          card.deleteCard();
          deleteCardPopup.close();
        })
        .catch(err => {
          console.log(err);
        });
      });
    }
  );
  section.addItem(card.generateCard());
}

function savePopupProfile (data) {
  const { name, description } = data;
  editProfilePopup.setButtonText('Сохранение...');
  api.editUserInfo(name, description)
  .then(res => {
    userInfo.setUserInfo(res.name, res.about, res.avatar);
    editProfilePopup.close();
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => editProfilePopup.setButtonText('Сохранить'));
} 

// ------ EDITING PROFILE ------

buttonChangeProfile.addEventListener('click', () => {
  editProfilePopup.open();
  const user = userInfo.getUserInfo();
  profileName.value = user.name;
  profileDef.value = user.description;
  profileFormValidator.resetValidation();
});

// ------ ADDING NEW CARD ------

buttonAddCardOpen.addEventListener('click', () => {
  addCardPopup.open();
  cardFormValidator.resetValidation();
});

// ------ SAVE NEW CARD ------

const savePopupCard = (data) => {
  
  addCardPopup.setButtonText('Сохранение...');
  api.sendNewCard(data.place, data.source)
  .then((res) => {
    res.myUserId = myUserId;
    createCard(res);
    addCardPopup.close();
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => addCardPopup.setButtonText('Сохранить'));
} 

// ------ Editing profile image (avatar) ------

buttonChangeAvatar.addEventListener('click', () => {
  changeAvatarPopup.open();
  avatarChangeValidator.resetValidation();
});

// ------ SAVE NEW profile image ------

const savePopupAvatar = (data) => {
  const link = data.avatar;
  changeAvatarPopup.setButtonText('Сохранение...');
  api.editUserAvatar(link)
  .then((res) => {
    userInfo.setUserInfo(res.name, res.about, res.avatar);
    changeAvatarPopup.close();
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => changeAvatarPopup.setButtonText('Сохранить'));
} 

// ------------

const api = new Api(optionsApi);
const imagePopup = new PopupWithImage('.popup_img');
const editProfilePopup = new PopupWithForm('.popup_profile', savePopupProfile);
const addCardPopup = new PopupWithForm('.popup_add-cards', savePopupCard);
const deleteCardPopup = new PopupWithForm('.popup_delete-card');
const changeAvatarPopup = new PopupWithForm('.popup_change-avatar', savePopupAvatar);
const section = new Section(createCard, '.photo-grid');
const userInfo = new UserInfo({ profileNameSelector: '.profile-info__name', profileInfoSelector: '.profile-info__def', profileAvatarSelector: '.profile-info__avatar' });


imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
deleteCardPopup.setEventListeners();
changeAvatarPopup.setEventListeners();

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user.name, user.about, user.avatar);
    myUserId = user._id;
    const formattedData = cards.map(data => ({
      ...data,
      myUserId,
    }));
    section.renderItems(formattedData.reverse());
  })
  .catch(err => {
    console.log(err);
  });

  