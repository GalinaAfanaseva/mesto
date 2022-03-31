import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  open(link, name) {
    super.open();
    const image = this._popup.querySelector('.popup__img-big');
    const caption = this._popup.querySelector('.popup__img-caption');
    caption.textContent = name; 
    image.src = link;
    image.alt = name;
  }
}

