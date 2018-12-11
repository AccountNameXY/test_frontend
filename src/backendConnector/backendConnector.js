let request = require("request");
let config = require("./backend.json");

class BackendConnector {
    getPromise(url) {
        return new Promise((resolve, reject) => {
            request.get(url, (error, response, body) => {
            if(error) {
                return reject(error);
            }
            resolve(JSON.parse(body));
        }   );
        });
    } 

    postPromise(url, data) {
        return new Promise((resolve, reject) => {
            request.post(url, {form: data}, (error, response, body) => {
                if(error) {
                    return reject(error);
                }
                resolve(JSON.parse(body));
            })
        })
    }

    async pushTags(picture,tags){
        console.log(picture);
        let data = {
            "picture": picture,
            "tags": tags
        }
        console.log(data);
        return await this.postPromise(config.url+"/post" , data)
    }
}

export default BackendConnector;