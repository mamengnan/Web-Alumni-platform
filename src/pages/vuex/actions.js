let axios = require("../axios");

var API_LEARNWARE_ROUTER = "/db/learnware";


const actions = {
    // 登陆test
    LoginTest({
        commit
    }, item) {
        return new Promise((on_result) => {
            axios.post("http://localhost:9090/api/token", item)
                .then(function (response) {
                    if(response.data.code == 200){
                        alert('登陆成功!');
                    }
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    }

};

export default actions