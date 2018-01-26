var axios = require('axios');

if (window.location.href.includes("localhost")) {
    axios.defaults.baseURL = 'http://localhost:9090';
} else {
    axios.defaults.baseURL = 'http://47.94.229.48:80';
}
axios.defaults.timeout = 1000 * 15;
axios.defaults.headers['Content-Type'] = 'application/json';




module.exports = axios;