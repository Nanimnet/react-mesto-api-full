const BASE_URL = 'http://localhost:3001';

function checkResponse(res) {
     if (res.ok) {
         return res.json()
     } 
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": email,
            "password": password,
        })
    })

    .then(checkResponse)
    .then((res) => {
        if (res.error || res.message) {
           return Promise.reject(`Ошибка: ${res.error || res.message}`)
        }
        return res
    })
}

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            "email": email,
            "password": password,
        })
    })

    .then(checkResponse)

    .then((data) => {
        if (data.token){
            localStorage.setItem('jwt', data.token);
            return data;
        }
    })
}

export const checkToken = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization" : `Bearer ${jwt}`
        },
        credentials: 'include',
    })

    .then(checkResponse)
}