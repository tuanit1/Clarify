import * as CONSTANT from './Constant'
import * as Color from './Color'

const createRequest = async (url, method, params) => {

    const requestOptions = {
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }

    if(method !== "GET"){
        requestOptions.body = JSON.stringify(params)
    }

    const res = await fetch(url, requestOptions);
    
    return res.json();
}

export {
    CONSTANT,
    Color,
    createRequest
}