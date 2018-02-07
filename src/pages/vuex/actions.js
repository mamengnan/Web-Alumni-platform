import axios from '../axios'
import store from './store';
import convertimg2bs64 from '../../util/global/imgresolver'
import appconfig from '../../util/config/application'

const actions = {
    // 提交个人信息控制器
    SubmitPfoController({
        commit
    }, item) {
        return new Promise(async (on_result, on_error) => {
            try {
                item.user_id = JSON.parse(atob(store.getters.access_token.split(".")[0])).user_id;
                var response = await axios({
                    url: "/api/userinfo",
                    method: 'post',
                    data: item,
                    headers: {
                        'content-type': 'application/json',
                        'authorization': store.getters.access_token
                    }
                });
                if (response.data.code == 200) {
                    on_result({
                        code: 200
                    });
                } else {
                    on_result({
                        code: response.data.code
                    });
                }
            } catch (error) {
                console.error(error);
                on_error({
                    code: 999
                });
            }
        });
    },

    // 更改用户基本信息控制器
    UpdatePfoController({
        commit
    }, item) {
        return new Promise(async (on_result, on_error) => {
            try {
                item.user_id = JSON.parse(atob(store.getters.access_token.split(".")[0])).user_id;
                var response = await axios({
                    url: "/api/userinfo",
                    method: 'put',
                    data: item,
                    headers: {
                        'content-type': 'application/json',
                        'authorization': store.getters.access_token
                    }
                });
                if (response.data.code == 200) {
                    on_result({
                        code: 200
                    });
                } else {
                    on_result({
                        code: response.data.code
                    });
                }
            } catch (error) {
                console.error(error);
                on_error({
                    code: 999
                });
            }
        });
    },

    // 获取用户基本信息控制器
    GetUserInfoController({
        commit
    }, item) {
        return new Promise(async (on_result, on_error) => {
            try {
                var response = await axios({
                    url: "/api/userinfo",
                    method: 'get',
                    params: {
                        id: JSON.parse(atob(store.getters.access_token.split(".")[0])).user_id,
                        return_body: item
                    },
                    headers: {
                        'content-type': 'application/json',
                        'authorization': store.getters.access_token
                    }
                });
                if (response.data.code == 200) {
                    response.data.obj.imgurl = response.data.obj.img;
                    response.data.obj.img = await convertimg2bs64(appconfig.AXIOSIMGURL + response.data.obj.img);
                    if (item) {
                        commit('setuserinfocontroller', response.data);
                    }
                    on_result({
                        code: 200
                    });
                } else {
                    on_result({
                        code: response.data.code
                    });
                }
            } catch (error) {
                // console.log(error);
                on_error({
                    code: 999
                });
            }
        });
    },

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
                console.error(error);
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
                console.error(error);
                on_error({
                    code: 999
                });
            }
        });
    }

};

export default actions