import appconfig from '../util/config/application'

axios.defaults.baseURL = appconfig.AXIOSBASERUL;
axios.defaults.timeout = 1000 * 15;
axios.defaults.headers['Content-Type'] = 'application/json';

module.exports = axios;