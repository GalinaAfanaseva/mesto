export class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(res => { 
      return this._getResponseData(res);
    })
    .catch(err => {
      console.log(err);
    });
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(res => {
      return this._getResponseData(res);
    })
    .catch(err => {
      console.log(err);
    });
  }

  editUserInfo(name, info) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        about: info
      }),
      headers: this._headers
    })
    .then(res => {
      return this._getResponseData(res);
    })
    .catch(err => {
      console.log(err);
    });
  }

  sendNewCard(name, link, likes) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        link: link
      }),
      headers: this._headers
    })
    .then(res => {
      return this._getResponseData(res);
    })
    .catch(err => {
      console.log(err);
    });
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => {
      return this._getResponseData(res);
    })
    .catch(err => {
      console.log(err);
    });
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      return this._getResponseData(res);
    })
    .catch(err => {
      console.log(err);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      return this._getResponseData(res);
    })
    .catch(err => {
      console.log(err);
    });
  }
}