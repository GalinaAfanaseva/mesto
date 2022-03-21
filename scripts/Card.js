export class Card {
  constructor(data, cardTemplateselector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._cardTemplateSelector = cardTemplateselector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardTemplateSelector)
      .content
      .cloneNode(true);

    return this._cardElement;
  }

  _fillCard() {
    this._element.querySelector('.photo-card__name').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._likeCard);
    this._deleteButton.addEventListener('click', this._deleteCard);
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._link, this._name));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.photo-card__like-button');
    this._deleteButton = this._element.querySelector('.photo-card__delete');
    this._cardImage = this._element.querySelector('.photo-card__img');

    this._fillCard();

    this._setEventListeners();
    
    return this._element;
  }

  _likeCard = () => {
    this._likeButton.classList.toggle('photo-card__like-button_active');
  };

  _deleteCard() {
    this.closest('.photo-card').remove();
  }
}
