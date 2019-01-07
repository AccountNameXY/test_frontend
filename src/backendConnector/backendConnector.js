import { CLIENT_RENEG_LIMIT } from "tls";

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

    async postPicture(fd){
        let options = {
            content: fd 
        }
        return await this.postPromise(config.url+"/classify", JSON.stringify(options))
    }
   

    // async pushTags(picture){
    //     let data = {
    //         "picture": picture.name,
    //     }
    //     return await this.getPromise(config.url+"/classify/"+ picture.name)
    // }
}

export default BackendConnector;