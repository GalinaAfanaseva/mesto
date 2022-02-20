
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

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^ FUNCTIONS ^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// ------ ADDING NEW CARD WITH TEMPLATE ------

function newCard (item) {
  const cardTemplate = document.querySelector('#card-template').content.cloneNode(true);
  const cardTemplateImage = cardTemplate.querySelector('.photo-card__img');
  cardTemplate.querySelector('.photo-card__name').textContent = item.name;
  cardTemplateImage.src = item.link;
  cardTemplateImage.alt = item.name;
  // ------ LIKE ------
  cardTemplate.querySelector('.photo-card__like-button').addEventListener('click', likeCard);
  // ------ CARD DELETE ------
  cardTemplate.querySelector('.photo-card__delete').addEventListener('click', deleteCard);
  // ------ PIC OPEN ------
  cardTemplateImage.addEventListener('click', () => {
    openImg(item);
  });
  return cardTemplate;
}

function addCard (item) {
  photoGrid.prepend(newCard(item));
}

// ------ BIG PICTURE OPENING ------
function openImg (item) {
  openPopupImg(item);
}

// ------ CARD DELETING ------

function deleteCard (event) {
  event.target.closest('.photo-card').remove();
}

// ------ LIKE ------

function likeCard (event) {
  event.target.classList.toggle('photo-card__like-button_active');;
};

// ------ OPEN POPUP FORMS ------

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

// ------ ADD/REMOVE 'popup_opened' ------

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

// ------ SAVE EDITED PROFILE INFO ------

function savePopupProfile (event) {
  event.preventDefault();
  profileOldName.textContent = profileNewName.value;
  profileOldDef.textContent = profileNewDef.value;
  closePopup(popupProfile);
} 

// ------ SAVE NEW CARD ------

function savePopupCard (event) {
  event.preventDefault();
  addCard({name: newCardName.value, link: newCardSource.value});
  closePopup(popupAddCards);
} 

// ------ ESCAPE CLOSING POPUP  ------

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

// ------ CREATING INITIAL CARDS FROM CARDS.JS ------

initialCards.forEach(addCard);

// ------ EDITING PROFILE ------

buttonChangeProfile.addEventListener('click', () => {
  openPopupProfile();
  hideInputError(formProfile, profileNewName, 'fillbox__text_type_error');
  hideInputError(formProfile, profileNewDef, 'fillbox__text_type_error');
  buttonSaveProfile.disabled = false;
});

buttonClosePopupProfile.addEventListener('click', () => {
  closePopup(popupProfile);
});

formProfile.addEventListener('submit', savePopupProfile); 

// ------ ADDING NEW CARD ------

buttonAddCardOpen.addEventListener('click', () => {
  openPopupCard();
  hideInputError(formCard, newCardName, 'fillbox__text_type_error');
  hideInputError(formCard, newCardSource, 'fillbox__text_type_error');
  buttonSaveCard.disabled = true;
});

buttonAddCardClose.addEventListener('click', () => {
  closePopup(popupAddCards);
});

formCard.addEventListener('submit', savePopupCard);

// ------ CLOSING BIG PIC POPUP ------

buttonClosePopupImg.addEventListener('click', () => {
  closePopup(popupImg);
}); 



