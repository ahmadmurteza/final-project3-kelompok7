const axios = require('axios');
axios({
    method: 'get',
    url: 'http://localhost:3000/photos',

})
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });