import state from './state';

var axios = require('../axios');

const getters = {
    access_token: (state) => {
        if (state.access_token == "") {
            if (window.document.cookie.length > 0) {
                var c_start = window.document.cookie.indexOf("access_token" + "=");
                if (c_start != -1) {
                    c_start = c_start + "access_token".length + 1;
                    var c_end = window.document.cookie.indexOf(";", c_start);
                    if (c_end == -1) c_end = window.document.cookie.length;
                    state.access_token = window.document.cookie.substring(c_start, c_end);
                }
            }
        }
        return state.access_token;
    },
    formData: (state) => {
        return state.formData;
    },
    img_bs64_url: (state) => {
        return state.img_bs64_url;
    },
    isNewUser: (state) => {
        return state.isNewUser;
    }
};

export default getters