/**
 * @author  zhyiwen
 * @date  2020/6/3 9:32
 * @version 1.0
 */
import axios from 'axios'
import {message} from 'element-ui'

const _api_root = 'http://zhyiwen.com:9003';

const api = {
    category: {
        getCategoryList: _api_root + "/category?page=1"
    }
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
            message({
                message: "提交成功",
                type: "success",
                offset: 70
            });
            console.log(response);
            // this.clearData();
        })
        .catch((error) => {
            message({
                message: "提交失败",
                type: "error",
                offset: 70
            });
            console.log(error);
            // this.clearData();
        })
};


export default {
    api,
    request
}