var axiosBaseURL = "";
var TempUploadUrl = "";

if (window.location.href.includes("localhost")) {
    axiosBaseURL = 'http://localhost:9090';
    TempUploadUrl = "http://localhost:9090/api/file/userimg";
} else {
    axiosBaseURL = 'http://47.94.229.48:80';
    TempUploadUrl = "http://47.94.229.48:80/api/file/userimg";
}


var appconfig = {
    AXIOSBASERUL: axiosBaseURL,
    TEMPUPLOADRUL: TempUploadUrl
}

module.exports = appconfig;