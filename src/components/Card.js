export class Card {
  constructor(data, cardTemplateselector, handleCardClick, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._likesArray = data.likes;
    this._ownerId = data.ownerId;
    this._userId = data.myUserId;
    this._cardTemplateSelector = cardTemplateselector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardTemplateSelector)
      .content
      .querySelector('.photo-card')
      .cloneNode(true);

    return this._cardElement;
  }

  _fillCard() {
    this._element.querySelector('.photo-card__name').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
  }

  isLiked() {
    const userHasLikedCard = this._likesArray.find((user) => user._id === this._userId);
    return userHasLikedCard;
  }

  setLikes(newLikes) {
    this._likesArray = newLikes;
    this._likesCount = this._element.querySelector('.photo-card__like-count');
    this._likesCount.textContent = this._likesArray.length;
    this._visibleLike();

    if (this.isLiked()) {
      this._likeButton.classList.add('photo-card__like-button_active');
    } else {
      this._likeButton.classList.remove('photo-card__like-button_active');
    }
  }

  _visibleLike() {
    if (this._likesArray.length > 0) {
      this._likesCount.classList.add('photo-card__like-count_visible');
    } else {
      this._likesCount.classList.remove('photo-card__like-count_visible');
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick();
      //this._likeCard();
    });
    this._deleteButton.addEventListener('click', this._deleteCard);
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._link, this._name));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.photo-card__like-button');
    this._deleteButton = this._element.querySelector('.photo-card__delete');
    this._cardImage = this._element.querySelector('.photo-card__img');

    this.setLikes(this._likesArray);

    this._fillCard();

    this._setEventListeners();
    
    return this._element;
  }

  _likeCard = () => {
    this._likeButton.classList.toggle('photo-card__like-button_active'); /*
    this._likesArray.forEach((likeOwner) => {
      if (likeOwner._id = '2a75bae67c5a85a3b4a4d09b') {
        this._likesAmount = this._likesAmount - 1;
      } else {
        this._likesAmount = this._likesAmount + 1;
      }
    }); */
  };

  _deleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  }
}

