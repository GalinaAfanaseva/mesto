import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__img-big');
    this._caption = this._popup.querySelector('.popup__img-caption');
  }

  open(link, name) {
    super.open();
    this._caption.textContent = name; 
    this._image.src = link;
    this._image.alt = name;
  }
}

