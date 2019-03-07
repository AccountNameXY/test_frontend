import { CLIENT_RENEG_LIMIT } from "tls";

let request = require("request");
let config = require("./backend.json");

// config.url = config.localURL

class BackendConnector {

    deleteOnReupload(data, uploadData) {
        console.log("HUHU")
        fetch(config.url + "/delete", {
            method: "POST",
            // mode: "cors",

            headers: {
                "Content-Type": "application/json",
                // "Allowed-Header": "origin"
            },
            body: JSON.stringify(data),
        }).then(function (response) {
            if (response.ok) {
                uploadData.map((item, index) => {
                    let fd = new FormData()
                    fd.append("image", item.file)
                    // console.log(item.file)
                    fetch(config.url + "/upload", {
                        method: "POST",
                        // mode: "cors",
                        headers: {
                            // "Allowed-Header": "origin"
                        },
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
        })
    }

    handleUpload(data) {
        data.map((item, index) => {
            let fd = new FormData()
            fd.append("image", item.file)
            // console.log(item.file)
            fetch(config.url + "/upload", {
                method: "POST",
                // mode: "cors",
                headers: {
                    // "Allowed-Header": "origin"
                },
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
                    // "Allowed-Header": "origin"
                },
                body: JSON.stringify(item)
            }).then(function (response) {
                if (!response.ok) {
                    return Promise.reject('some reason');
                }
                return response.json();
            })
                .then(function (response) {
                    stateData[index].tags = response.tags
                })
        })

        console.log(stateData)
        return stateData
    }

    sendTags(data) {
        fetch(config.url + "/tag", {
            // mode: 'no-cors',
            method: "POST",
            // mode: "cors",
            headers: {
                "Content-Type": "application/json",
                // "Allowed-Header": "origin"
            },
            body: JSON.stringify(data)
        }).then(function (response) {
            if (response.ok) {
                // console.log(response)
                return response.json()
            }
        }).then(function (response) {
            window.location = config.url + "/download/" + response.filename
        })
    }

}

export default BackendConnector;