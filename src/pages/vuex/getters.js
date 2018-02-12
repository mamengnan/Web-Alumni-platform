import state from './state'
import axios from '../axios'
import cookie from '../../util/cookie'

const getters = {
    access_token: (state) => {
        if (state.access_token == "") {
            state.access_token = cookie.get("access_token");
        }
        return state.access_token;
    }
};

export default getters