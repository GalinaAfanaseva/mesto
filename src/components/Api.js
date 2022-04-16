export class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _customFetch(url, options) {
    return fetch(url, options)
    .then(res => { 
      return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getInitialCards() {
    return this._customFetch(`${this._baseUrl}/cards`, {
         headers: this._headers
    });
  }

  getProfile() {
    return this._customFetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    });
  }

  editUserInfo(name, info) {
    return this._customFetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        about: info
      }),
      headers: this._headers
    });
  }

  sendNewCard(name, link) {
    return this._customFetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        link: link
      }),
      headers: this._headers
    });
  }

  addLike(cardId) {
    return this._customFetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    });
  }

  deleteLike(cardId) {
    return this._customFetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  deleteCard(cardId) {
    return this._customFetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  editUserAvatar(link) {
    return this._customFetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: link
      }),
      headers: this._headers
    });
  }
}