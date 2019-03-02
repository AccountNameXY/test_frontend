import { CLIENT_RENEG_LIMIT } from "tls";

let request = require("request");
let config = require("./backend.json");



class BackendConnector {

    deleteOnReupload(data) {
        fetch(config.url + "/delete", {
            method: "POST",
            // mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
    }

    handleUpload(data) {
        data.map((item, index) => {
            let fd = new FormData()
            fd.append("image", item.file)
            fetch(config.url + "/upload", {
                method: "POST",
                // mode: "cors",
                body: fd
            })
                .then(function (response) {
                    if (!response.ok) {
                        return Promise.reject('some reason');
                    }
                    return response.json();
                })
        });
    }

    handleTagging(dataToMap, stateData) {
        dataToMap.map((item, index) => {
            fetch(config.url + "/classify", {
                method: "POST",
                // mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(item)
            })
                .then(function (response) {
                    if (!response.ok) {
                        return Promise.reject('some reason');
                    }
                    return response.json();
                })
                .then(function (response) {
                    stateData[index].tags = response.tags
                })
        })
        console.log(stateData);
        return stateData
    }

    sendTags(data) {
        fetch(config.url + "/tag", {
            // mode: 'no-cors',
            method: "POST",
            // mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then(function (response) {
            if (response.ok) {
                console.log(response)
                return response.json()
            }
        }).then(function (response) {
            window.location = config.url + "/download/" + response.filename
        })
    }

}

export default BackendConnector;