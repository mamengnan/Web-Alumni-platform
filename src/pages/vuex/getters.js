import state from './state'
import axios from '../axios'
import cookie from '../../util/cookie'

const getters = {
    access_token: (state) => {
        if (state.access_token == "") {
            state.access_token = cookie.get("access_token");
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