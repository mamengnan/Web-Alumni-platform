import {
    Base64
} from "js-base64";

const mutations = {
    clearaccesstoken(state) {
        state.access_token = "";
    },
    logincontroller(state, response) {
        let exdate = new Date();
        exdate.setTime(JSON.parse(Base64.decode(response.msg.split(".")[0])).timestamp);
        window.document.cookie = "access_token" + "=" + response.msg + ";expires=" + exdate.toGMTString();
        state.access_token = response.msg;
    },
    registercontroller(state, response) {

    }
};

export default mutations