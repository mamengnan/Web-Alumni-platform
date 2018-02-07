import server_config from '../../../config'

var axiosBaseURL = "";
var TempUploadUrl = "";
var axiosImgUrl = "";

if (window.location.href.includes("localhost")) {
    axiosBaseURL = 'http://localhost:9090';
    TempUploadUrl = "http://localhost:9090/api/file/userimg";
    axiosImgUrl = 'http://localhost:' + server_config.dev.port;
} else {
    axiosBaseURL = 'http://47.94.229.48:80';
    TempUploadUrl = "http://47.94.229.48:80/api/file/userimg";
    axiosImgUrl = "http://47.94.229.48:80";
}


var appconfig = {
    AXIOSBASERUL: axiosBaseURL,
    TEMPUPLOADRUL: TempUploadUrl,
    AXIOSIMGURL: axiosImgUrl
}

module.exports = appconfig;