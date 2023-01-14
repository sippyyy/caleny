// Declare actions **

export const setUsername = (data) => {
    return {
        type: 'signin/setUsername',
        payload: data
    }
}

export const setPassword = (data) => {
    return {
        type: 'signin/setPassword',
        payload: data
    }
}

export const loginStatusTrue = (data) => {
    return {
        type: 'singin/setAuthentication',
        payload: data
    }
}