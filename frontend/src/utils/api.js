class Api {
  constructor({url}) {
      this._url = url;
  }

  _checkResponse(res) {
      if (res.ok) {
          return res.json();
      }
      else {
          return Promise.reject(`Ошибка: ${res.status}`);
      }
  }

  getUserInfo(token) {
      return fetch(`${this._url}/users/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })
          .then(res => this._checkResponse(res));
  }

  editUserInfo(token, { newName = "", newAbout = "" }) {
      return fetch(`${this._url}/users/me`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: newName,
            about: newAbout,
          })
      })
          .then(this._checkResponse)
  }

  changeAvatar(token, { newAvatarLink }) {
      return fetch(`${this._url}/users/me/avatar`, {
          method: 'PATCH',
          headers: {
              // authorization: localStorage.getItem('jwt'),
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ avatar: newAvatarLink })
      })
          .then(this._checkResponse)
  }

  getInitialCards(token) {
      return fetch(`${this._url}/cards`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        })
          .then(this._checkResponse)
  }

  addNewCard(token, { cardName, cardLink }) {
      return fetch(`${this._url}/cards`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: cardName,
            link: cardLink,
          })
      })
          .then(this._checkResponse)
  }

  deleteCard(token, { cardId }) {
      return fetch(`${this._url}/cards/${cardId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
      })
          .then(this._checkResponse)
  }

toggleLike(token, { cardId, isSetLike }) {
  return fetch(`${this._baseUrl}/${cardId}/likes`, {
    method: isSetLike ? 'DELETE' : 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    credentials: 'include',
  }).then(this._checkResponse);
}
}

export const api = new Api({url: 'http://localhost:3001'});