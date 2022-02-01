let popup = document.querySelector('.popup');
let changeProfileButton = document.querySelector('.profile-info__edit-button');
let closePopupButton = popup.querySelector('.popup__close');
let profileOldName = document.querySelector('.profile-info__name');
let profileOldDef = document.querySelector('.profile-info__def');
let formElement = document.querySelector('.edit-form__form');
let profileNewName = formElement.querySelector('.edit-form__text_type_name');
let profileNewDef = formElement.querySelector('.edit-form__text_type_def');
let likeButton = document.querySelectorAll('.photo-card__like-button');

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

const photoGrid = document.querySelector('.photo-grid');

/*
<template id="card-template">
    <li class="photo-card">
      <img class="photo-card__img">
      <div class="photo-card__caption">
        <h2 class="photo-card__name"></h2>
        <button class="photo-card__like-button" type="button"></button>
      </div>
    </li>
</template>*/

for (let i = 0; i < initialCards.length; i++) {
  const cardTemplate = document.querySelector('#card-template').content.cloneNode(true);
  cardTemplate.querySelector('h2').textContent = initialCards[i].name;
  cardTemplate.querySelector('img').src = initialCards[i].link;
  cardTemplate.querySelector('img').alt = initialCards[i].name;
  photoGrid.append(cardTemplate);
}





changeProfileButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', savePopup);

function openPopup() {
    popup.classList.add('popup_opened');
    profileNewName.value = profileOldName.textContent;
    profileNewDef.value = profileOldDef.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function savePopup(event) {
    if (profileNewName.value !== '' && profileNewDef.value !== '') {
        event.preventDefault();
        profileOldName.textContent = profileNewName.value;
        profileOldDef.textContent = profileNewDef.value;
        closePopup();
    }
}

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
