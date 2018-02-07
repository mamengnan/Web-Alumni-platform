const mutations = {
    changeIsNewUser(state, item) {
        state.isNewUser = item;
    },
    clearInfomation(state) {
        state.access_token = "";
        var temp = {
            name: '',
            sex: '',
            img: '/static/img/default.jpg',
            imgurl: '',
            nation: '',
            home: '',
            political: '',
            workstation: '',
            job: '',
            undergraduate: '',
            speciality: '',
            date1: '',
            date2: ''
        };
        for (var prop in temp) {
            if (state.formData.hasOwnProperty(prop)) {
                state.formData[prop] = temp[prop];
            }
        }
        state.img_bs64_url = "/static/img/default.jpg";
        state.isNewUser = true;
    },
    logincontroller(state, response) {
        let exdate = new Date();
        exdate.setTime(JSON.parse(atob(response.msg.split(".")[0])).timestamp);
        window.document.cookie = "access_token" + "=" + response.msg + ";expires=" + exdate.toGMTString();
        state.access_token = response.msg;
    },
    registercontroller(state, response) {

    },
    setuserinfocontroller(state, response) {
        for (var prop in response.obj) {
            if (state.formData.hasOwnProperty(prop)) {
                if (prop == "sex" || prop == "political") {
                    state.formData[prop] = response.obj[prop].toString();
                } else if (prop == "img") {
                    state.img_bs64_url = response.obj[prop];
                    state.formData[prop] = response.obj[prop];
                } else if (prop == "date1" || prop == "date2") {
                    state.formData[prop] = new Date(response.obj[prop]).toGMTString();
                } else {
                    state.formData[prop] = response.obj[prop];
                }
            }
        }
    }
};

export default mutations