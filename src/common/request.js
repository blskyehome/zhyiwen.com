/**
 * @author  zhyiwen
 * @date  2020/6/3 9:32
 * @version 1.0
 */
import axios from 'axios'

const _api_root = 'http://zhyiwen.com:9003';

const api = {
    category:  _api_root + "/category",
    link:  _api_root + "/link"
};

const request = function(o){
    o.data || (o.data = {});
    axios({
        url: o.url,
        header: o.header || {
            "content-type": "application/x-www-form-urlencoded",
        },
        data: o.data || {},
        method: o.method || "GET",
        dataType: o.dataType || "json",
    })
        .then((response) => {
            console.log(response);
            // this.clearData();
        })
        .catch((error) => {
            console.log(error);
            // this.clearData();
        })
};


export default {
    api,
    request
}