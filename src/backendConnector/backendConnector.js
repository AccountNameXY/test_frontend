import axios from 'axios';
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

        console.log(data)
        // return new Promise((resolve, reject) => {
        //     request.post(url, {form: data}, (error, response, body) => {
        //         if(error) {
        //             return reject(error);
        //         }
        //         resolve(JSON.parse(body));
        //     })
        // })
         axios.post(url,  data )
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
    }

   

    async pushTags(picture){
        let data = {
            "picture": picture.name,
        }
        return await this.getPromise(config.url+"/classify/"+ data)
    }
}

export default BackendConnector;