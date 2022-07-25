class Api {
  constructor({url}) {
      this._url = url;
  }

  _checkResponse(res) {
  //проверка ответа
      if (res.ok) {
          return res.json();
      }
      else {
          return Promise.reject(`Ошибка: ${res.status}`);
      }
  }

  getUserInfo() {
  //получение информации о пользователе
      return fetch(`${this._url}/users/me`, {
          headers: {
            authorization: localStorage.getItem('jwt')
          }
        })
          .then(this._checkResponse)
  }

  editUserInfo(userData) {
  //обновление информации о пользователе
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
  //обновление аватара пользователя
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
  //получение стартового набора карточек с сервера
      return fetch(`${this._url}/cards`, {
          headers: {
            authorization: localStorage.getItem('jwt')
          }
        })
          .then(this._checkResponse)
  }

  addNewCard(card) {
  //пост новой карточки на сервер
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
  //удаление карточки по ее id
      return fetch(`${this._url}/cards/${cardId}`, {
          method: 'DELETE',
          headers: {
              authorization: localStorage.getItem('jwt')
          }
      })
          .then(this._checkResponse)
  }

  addLike(cardId) {
  //добавление лайка карточке
      return fetch(`${this._url}/cards/${cardId}/likes`, {
          method: 'PUT',
          headers: {
              authorization: localStorage.getItem('jwt')
          }
      })
          .then(this._checkResponse)
  }

  deleteLike(cardId) {
  //удаление лайка с карточки
      return fetch(`${this._url}/cards/${cardId}/likes`, {
          method: 'DELETE',
          headers: {
              authorization: localStorage.getItem('jwt')
          }
      })
          .then(this._checkResponse)       
  }
}




export const api = new Api({url: 'https://api.nana-mesto.nomoredomains.xyz'});














// // import { apiUserData } from "./utils.js";

// class Api {
//   constructor({ baseUrl, headers }) {
//     this._baseUrl = baseUrl;
//     this._headers = headers;
//   }

//   _request(endPoint, method, body) {
//     const fetchInit = {
//       method: method,
//       headers: {
//         // authorization: this._headers.authorization,
//         'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
//         "Content-Type": "application/json",
//       },
//     };

//     return fetch(
//       `${this._baseUrl}/${endPoint}`,
//       body ? { ...fetchInit, body } : fetchInit
//     ).then((res) => this._getResponseData(res));
//   }

//   getInitialCards = () => this._request("cards", "GET");

//   getUserInfo = () => this._request("users/me", "GET");

//   // getUserUnfo(token) { // Тут принимает твой токен
//   //   return fetch(`${this._baseUrl}/users/me`, { 
//   //     headers: { 
//   //       'Authorization': `Bearer ${token}`, // Сюда его прописываем
//   //       "Content-Type": "application/json", 
//   //     }, 
//   //   }).then(res => this._parseResponse(res)); 
//   // } 

//   editUserInfo = ({ newName = "", newAbout = "" }) =>
//     this._request(
//       "users/me",
//       "PATCH",
//       JSON.stringify({
//         name: newName,
//         about: newAbout,
//       })
//     );

//   addNewCard = ({ cardName, cardLink }) =>
//     this._request(
//       "cards",
//       "POST",
//       JSON.stringify({
//         name: cardName,
//         link: cardLink,
//       })
//     );

//   deleteCard = ({ cardId }) => this._request(`cards/${cardId}`, "DELETE");

//   toggleLike = ({ cardId, isSetLike }) =>
//     this._request(`cards/likes/${cardId}`, isSetLike ? "PUT" : "DELETE");

//   changeAvatar = ({ newAvatarLink }) =>
//     this._request(
//       `users/me/avatar`,
//       "PATCH",
//       JSON.stringify({ avatar: newAvatarLink })
//     );

//   _getResponseData = (res) =>
//     res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
// }

// export const api = new Api({
//   baseUrl: `https://api.nana-mesto.nomoredomains.xyz`,
//   // headers: {
//   //   authorization: apiUserData.userAuthorizationToken,
//   //   "Content-Type": apiUserData.apiContentType,
//   // },
// });
