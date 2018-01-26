let axios = require("../axios");

var API_LEARNWARE_ROUTER = "/db/learnware";


const actions = {
    // 登陆控制器
    LoginController({
        commit
    }, item) {
        return new Promise(async (on_result, on_error) => {
            try {
                var response = await axios.post("/api/token", item);
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
            } catch (error) {
                console.log(error);
                on_error({
                    code: 999
                });
            }
        });
    },
    // 注册控制器
    RegisterController({
        commit
    }, item) {
        return new Promise(async (on_result, on_error) => {
            try {
                var response = await axios.post("/api/user", item);
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
            } catch (error) {
                console.log(error);
                on_error({
                    code: 999
                });
            }
        });
    }

};

export default actions