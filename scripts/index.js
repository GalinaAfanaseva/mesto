let popupProfile = document.querySelector('.popup_edit_profile');
let popupCards = document.querySelector('.popup_edit_cards');
let changeProfileButton = document.querySelector('.profile-info__edit-button');
let addCardButton = document.querySelector('.profile__add-button');
let closePopupProfileButton = popupProfile.querySelector('.popup__close');
let closePopupCardsButton = popupCards.querySelector('.popup__close');
let profileOldName = document.querySelector('.profile-info__name');
let profileOldDef = document.querySelector('.profile-info__def');
let formProfile = document.querySelector('.edit-form__profile');
const formCard = document.querySelector('.edit-form__card');
let profileNewName = formProfile.querySelector('.edit-form__text_profile_name');
let profileNewDef = formProfile.querySelector('.edit-form__text_profile_def');
const newCardName = formCard.querySelector('.edit-form__text_card_name');
const newCardSource = formCard.querySelector('.edit-form__text_card_src');
let likeButton = document.querySelectorAll('.photo-card__like-button');
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

// ------ Загрузка карточек из массива initialCards на страницу ------

for (let i = 0; i < initialCards.length; i++) {
  const cardTemplate = document.querySelector('#card-template').content.cloneNode(true);
  cardTemplate.querySelector('h2').textContent = initialCards[i].name;
  cardTemplate.querySelector('img').src = initialCards[i].link;
  cardTemplate.querySelector('img').alt = initialCards[i].name;
  photoGrid.append(cardTemplate);
}

// ------ Открытие/закрытие, сохранение попап ------

function togglePopup (element) {
  element.classList.toggle('popup_opened');
}

function openPopup(element) {
  if (element === popupProfile) {
    profileNewName.value = profileOldName.textContent;
    profileNewDef.value = profileOldDef.textContent;
  } else if (element === popupCards) {
    newCardName.value = null;
    newCardSource.value = null;
  }
    togglePopup(element);
}

function savePopup(event) {
  event.preventDefault();
  profileOldName.textContent = profileNewName.value;
  profileOldDef.textContent = profileNewDef.value;
  togglePopup(event.target.closest('.popup'));
} 

function savePopupCard(event) {
  event.preventDefault();
  const cardTemplate = document.querySelector('#card-template').content.cloneNode(true);
  cardTemplate.querySelector('h2').textContent = newCardName.value;
  cardTemplate.querySelector('img').src = newCardSource.value;
  cardTemplate.querySelector('img').alt = newCardName.value;
  photoGrid.prepend(cardTemplate);
  togglePopup(event.target.closest('.popup'));
} 

// ------ Ставим лайки ------

for (let i = 0; i < likeButton.length; i++) {
    likeButton[i].addEventListener('click', function(event){
        if (likeButton[i].classList.contains('photo-card__like-button_active')) {
            event.preventDefault();
            likeButton[i].classList.remove('photo-card__like-button_active');
        } else {
            event.preventDefault();
            likeButton[i].classList.add('photo-card__like-button_active');
        }
    });
}

// ------ Слушатели ------

// ------ Изменение данных профиля ------
changeProfileButton.addEventListener('click', () => {
  openPopup(popupProfile);
});
closePopupProfileButton.addEventListener('click', () => {
  togglePopup(popupProfile);
});
formProfile.addEventListener('submit', savePopup); 

// ------ Добавление новой карточки ------
addCardButton.addEventListener('click', () => {
  openPopup(popupCards);
});
closePopupCardsButton.addEventListener('click', () => {
  togglePopup(popupCards);
});
formCard.addEventListener('submit', savePopupCard);