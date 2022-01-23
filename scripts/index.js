let popup = document.querySelector('.popup');
let changeProfileButton = document.querySelector('.profile-info__edit-button');
let closePopupButton = popup.querySelector('.popup__close');
let profileOldName = document.querySelector('.profile-info__name');
let profileOldDef = document.querySelector('.profile-info__def');
let formElement = document.querySelector('.edit-form__form');
let profileNewName = formElement.querySelector('.edit-form__text_type_name');
let profileNewDef = formElement.querySelector('.edit-form__text_type_def');
let likeButton = document.querySelectorAll('.photo-card__like-button');

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
