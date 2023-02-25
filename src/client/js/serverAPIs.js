/**
* @description POST data to the server
* @returns {request} response from the server
*/
const postData = async (data={}, url) =>{
    const request = await fetch(url,{
        method: 'POST',
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).catch((e) => {
            console.log('error', e);
    })
    return request;
}

/**
* @description GET data from the server
* @returns {request} response from the server
*/
const getData = async (url) =>{
    const request = await fetch(url)
    .then(response => response.json())
    .then((data) => {
        return data;
    }).catch((e) => {
        console.log('error', e);
    })
    return request;
}

export {postData, getData}