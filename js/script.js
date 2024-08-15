document.addEventListener('DOMContentLoaded', () => {
    const timestamp = Date.now().toString();
    const privateKey = '07525c8f8e047d827c303739ed5ac0075a508fd3';
    const publicKey = 'c75233c772342459c41ec5c20e7070a0';

    //해시생성
    function generateHash(timestamp, privateKey, publicKey) {
        const dataToHash = timestamp + privateKey + publicKey;
        console.log(dataToHash);
        return md5(dataToHash);
    }

    const hash = generateHash(timestamp, privateKey, publicKey);

    console.log(hash);

    //===========================================================

    const baseUrl = 'http://gateway.marvel.com/v1/public/comics';
    const queryString = `?apikey=${publicKey}&ts=${timestamp}&hash=${hash}`;

    console.log(baseUrl + queryString);
    fetch(baseUrl + queryString, {
        method: 'GET',
        headers: {
            Accept: '*/*',
        },
    })
        .then((res) => {
            console.log(res);
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject('네트워크 장애');
            }
        })
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.error('에러내용 : ', err);
        });
});
