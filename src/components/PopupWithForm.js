import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.fillbox__form');
    this._inputs = [...this._form.querySelectorAll('.fillbox__text')];
  }

  _getInputValues() {
    const values = {};
    this._inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      this._handleSubmit(this._getInputValues());
    }); 
  }

  close() {
    super.close();
    this._form.reset();
  }
}