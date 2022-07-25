// import { apiUserData } from "./utils.js";

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _request(endPoint, method, body) {
    const fetchInit = {
      method: method,
      headers: {
        // authorization: this._headers.authorization,
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
    };

    return fetch(
      `${this._baseUrl}/${endPoint}`,
      body ? { ...fetchInit, body } : fetchInit
    ).then((res) => this._getResponseData(res));
  }

  getInitialCards = () => this._request("cards", "GET");

  getUserInfo = () => this._request("users/me", "GET");

  // getUserUnfo(token) { // Тут принимает твой токен
  //   return fetch(`${this._baseUrl}/users/me`, { 
  //     headers: { 
  //       'Authorization': `Bearer ${token}`, // Сюда его прописываем
  //       "Content-Type": "application/json", 
  //     }, 
  //   }).then(res => this._parseResponse(res)); 
  // } 

  editUserInfo = ({ newName = "", newAbout = "" }) =>
    this._request(
      "users/me",
      "PATCH",
      JSON.stringify({
        name: newName,
        about: newAbout,
      })
    );

  addNewCard = ({ cardName, cardLink }) =>
    this._request(
      "cards",
      "POST",
      JSON.stringify({
        name: cardName,
        link: cardLink,
      })
    );

  deleteCard = ({ cardId }) => this._request(`cards/${cardId}`, "DELETE");

  toggleLike = ({ cardId, isSetLike }) =>
    this._request(`cards/likes/${cardId}`, isSetLike ? "PUT" : "DELETE");

  changeAvatar = ({ newAvatarLink }) =>
    this._request(
      `users/me/avatar`,
      "PATCH",
      JSON.stringify({ avatar: newAvatarLink })
    );

  _getResponseData = (res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export const api = new Api({
  baseUrl: `https://api.nana-mesto.nomoredomains.xyz`,
  // headers: {
  //   authorization: apiUserData.userAuthorizationToken,
  //   "Content-Type": apiUserData.apiContentType,
  // },
});
