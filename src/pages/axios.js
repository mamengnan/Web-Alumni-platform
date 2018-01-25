var axios= require('axios');


axios.defaults.baseURL = 'http://localhost:9090';
// axios.defaults.baseURL = 'http://47.94.229.48:80';
axios.defaults.timeout = 1000 * 15;
axios.defaults.headers['Content-Type'] = 'application/json';




module.exports = axios;
