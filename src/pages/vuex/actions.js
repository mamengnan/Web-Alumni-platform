let axios = require("../axios");

var API_LEARNWARE_ROUTER = "/db/learnware";


const actions = {
    // 登陆控制器
    LoginController({
        commit
    }, item) {
        return new Promise((on_result, on_error) => {
            axios.post("/api/token", item)
                .then(function (response) {
                    if (response.data.code == 200) {
                        commit('logincontroller', response.data);
                        on_result({
                            code: 200
                        });
                    } else {
                        on_result({
                            code: response.data.code
                        });
                    }
                })
                .catch(function (error) {
                    on_error({
                        code: 999
                    });
                });
        });
    },
    // 注册控制器
    RegisterController({
        commit
    }, item) {
        return new Promise((on_result, on_error) => {
            axios.post("/api/user", item)
                .then(function (response) {
                    if (response.data.code == 200) {
                        commit('registercontroller', response.data);
                        on_result({
                            code: 200
                        });
                    } else {
                        on_result({
                            code: response.data.code
                        });
                    }
                })
                .catch(function (error) {
                    on_error({
                        code: 999
                    });
                });
        });
    }

};

export default actions