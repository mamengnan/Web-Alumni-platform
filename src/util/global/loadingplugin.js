exports.install = function (Vue, options) {
    // 根据传入的时间参数直接开启 Loading
    Vue.prototype.controlFullscreen = function (text, time) {
        var self = this;
        return new Promise(function (resolve) {
            const loading = self.$loading({
                lock: true,
                text: text,
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            });
            setTimeout(() => {
                loading.close();
                resolve();
            }, time);
        });
    }

    // 以服务的方式调用的 Loading
    Vue.prototype.serviceFullscreen = function (text) {
        return ELEMENT.Loading.service({
            lock: true,
            text: text,
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
        });
    };

    // 关闭以服务的方式调用的 Loading
    Vue.prototype.serviceCloseFullscreen = function (loadingInstance, time) {
        return new Promise(function (resolve) {
            setTimeout(() => {
                loadingInstance.close();
                resolve();
            }, time);
        });
    };
};