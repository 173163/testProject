import axios from 'axios'
import _get from "lodash/get"
import isNil from "lodash/isNil"
import { Toast   } from 'antd-mobile';


const service = axios.create({
    baseURL: "api",
})

service.interceptors.request.use(
    config => {

        for (let param in config.params) {
            if (isNil(config.params[param]) || typeof (config.params[param]) === "string" && config.params[param].match(/^\s*$/)) {
                delete config.params[param]
            }
        }

        config.validateStatus = status => {
            return status >= 200
        }

        return config
    },
    error => {
        // do something with request error
        return Promise.reject(error)
    },
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    async response => {
        const status = response.status

        if (!(status >= 200 && status < 400)) {
            if (status === 401) {
                Toast.show({
                    icon: 'fail',
                    content: '401',
                })
            }

            if (status === 404) {
                Toast.show({
                    icon: 'fail',
                    content: `${_get(response, "config.url", "")} 404 找不到资源(Not Found)，请联系管理员`
                })

            }

            if (status.toString().match(/50\d/)) {
                Toast.show({
                    icon: 'fail',
                    content: `${_get(response, "config.url", "")} 服务器内部错误(Internal Server Error)，请联系管理员`
                })
            }

            return Promise.reject(response)
        }

        let res = response.data

        if (parseInt(res.code) !== 0) {
            Toast.show({
                icon: 'fail',
                content: res.message || res.msg || '系统错误，请联系管理员'
            })
            return Promise.reject(res)
        }

        return res
    },
    error => {
        if (error.code === 'ECONNABORTED' || (error.response && error.response.status === 408)) {
            Toast.show({
                icon: 'fail',
                content: `${_get(error.response, "config.url", "")} 服务器内部错误(Internal Server Error)，请联系管理员`
            })
        } else if (error.message === "Network Error") {
            Toast.show({
                icon: 'fail',
                content: `网络错误，请检查`
            })
        }
        return Promise.reject(error);
    },
)

const request = function (requestConfig) {
    return service(requestConfig)
}

export default request
