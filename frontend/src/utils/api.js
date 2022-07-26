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

  getUserInfo() {
      return fetch(`${this._url}/users/me`, {
          headers: {
            authorization: localStorage.getItem('jwt')
          }
        })
          .then(this._checkResponse)
  }

  editUserInfo(userData) {
      return fetch(`${this._url}/users/me`, {
          method: 'PATCH',
          headers: {
              authorization: localStorage.getItem('jwt'),
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({name: userData.name, about: userData.about})
      })
          .then(this._checkResponse)
  }

  changeAvatar(userPhoto) {
      return fetch(`${this._url}/users/me/avatar`, {
          method: 'PATCH',
          headers: {
              authorization: localStorage.getItem('jwt'),
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({avatar: userPhoto.avatar})
      })
          .then(this._checkResponse)
  }

  getInitialCards() {
      return fetch(`${this._url}/cards`, {
          headers: {
            authorization: localStorage.getItem('jwt')
          }
        })
          .then(this._checkResponse)
  }

  addNewCard(card) {
      return fetch(`${this._url}/cards`, {
          method: 'POST',
          headers: {
              authorization: localStorage.getItem('jwt'),
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({name: card.name, link: card.link})
      })
          .then(this._checkResponse)
  }

  deleteCard(cardId) {
      return fetch(`${this._url}/cards/${cardId}`, {
          method: 'DELETE',
          headers: {
              authorization: localStorage.getItem('jwt')
          }
      })
          .then(this._checkResponse)
  }

toggleLike(id, isSetLike) {
  return fetch(`${this._baseUrl}/cards/${id}/likes`, {
    method: isSetLike ? 'DELETE' : 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('jwt'),
    },
    credentials: 'include',
  }).then(this._checkResponse);
}
}

export const api = new Api({url: 'https://api.nana-mesto.nomoredomains.xyz'});