
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
const buttonSaveCard = formCard.querySelector('.edit-form__submit');

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
  cardTemplateImage.addEventListener('click', () => {
    openImg(item);
    document.addEventListener('keyup', (evt) => {
      if (evt.key === 'Escape') {
        closePopup(popupImg);
      }
    }, { once: true });
  });
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

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


// ------ Загрузка карточек из массива initialCards на страницу ------

initialCards.forEach(addCard);

// ------ Изменение данных профиля ------

buttonChangeProfile.addEventListener('click', () => {
  openPopupProfile();
  hideInputError(formProfile, profileNewName);
  hideInputError(formProfile, profileNewDef);
  buttonSaveProfile.disabled = false;
  document.addEventListener('keyup', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(popupProfile);
    }
  }, { once: true });
});
buttonClosePopupProfile.addEventListener('click', () => {
  closePopup(popupProfile);
});
formProfile.addEventListener('submit', savePopupProfile); 

// ------ Добавление новой карточки ------

buttonAddCardOpen.addEventListener('click', () => {
  openPopupCard();
  hideInputError(formCard, newCardName);
  hideInputError(formCard, newCardSource);
  buttonSaveCard.disabled = true;
  document.addEventListener('keyup', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(popupAddCards);
    }
  }, { once: true });
});
buttonAddCardClose.addEventListener('click', () => {
  closePopup(popupAddCards);
});
formCard.addEventListener('submit', savePopupCard);

// ------ Закрытие большого изображения ------

buttonClosePopupImg.addEventListener('click', () => {
  closePopup(popupImg);
}); 

// ------ Закрытие попапа при клике на серую область ------

popupProfile.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(popupProfile);
  }
});

popupAddCards.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(popupAddCards);
  }
});

popupImg.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(popupImg);
  }
});



