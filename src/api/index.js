import request from '../utils/request'

function base(api) {
    const getList = function (params) {
        return request({
            url: `/${api}`,
            method: 'get',
            params,
        })
    }

    const get = function (code, params) {
        return request({
            url: code !== undefined ? `/${api}/${code}` : `/${api}`,
            method: 'get',
            params,
        })
    }

    const fetch = function (params) {
        return request({
            url: `/${api}/new`,
            method: 'get',
            params,
        })
    }

    const create = function (data, params) {
        return request({
            url: `/${api}`,
            method: 'post',
            data: data,
            params,
        })
    }

    const update = function (data, code, params) {
        return request({
            url: `/${api}/${code}`,
            method: 'put',
            data: data,
        })
    }

    const deleteSingle = function (deleteString) {
        return request({
            url: `/${api}/${deleteString}`,
            method: 'delete',
        })
    }

    const deleteMulti = function (deleteString, params) {
        let url = deleteString.indexOf("&") > -1 ? `/${api}?${deleteString}` : `/${api}/${deleteString.split("=")[1]}`
        return request({
            url,
            method: 'delete',
            params,
        })
    }

    const exportTemplate = function (deleteString) {
        return request({
            url: `/${api}/export-template`,
            method: 'get',
        })
    }

    const importTemplate = function (data, args) {
        let url = args ? `/${api}/upload-excel/${args}` : `/${api}/upload-excel`
        return request({
            url: url,
            method: 'post',
            responseType: 'blob',
            data: data,
        })
    }

    const exportTemplateURL = function () {
        return request({
            url: `/${api}/export-template`,
            responseType: 'blob',
            method: 'get',
        })
    }

    const upload = function (data, params) {
        return request({
            url: `/${api}/upload`,
            method: 'POST',
            responseType: 'blob',
            data,
            params
        })
    }

    // const exportTemplateURL = `${settings.baseURL}/${api}/export-template`
    const getListNoPageList = function (data) {
        return request({
            url: `/${api}/current`,
            method: 'get',
        })
    }

    // 根据id查看详情(deprecated)
    const getDetailById = get

    // 申报
    const declare = function (id) {
        return request({
            url: `/${api}/declare/${id}`,
            method: 'post',
        })
    }

    return {
        getList, // 获取列表
        get, // 根据ID获取单条数据
        fetch, // 新增时的初始化数据
        create, // 新增（创建）
        update, // 编辑（更新/修改）
        deleteMulti, // 删除（单/多共享）
        deleteSingle, // 删除单个
        exportTemplate, // 导出模板
        exportTemplateURL,
        importTemplate, // 导入数据
        getListNoPageList, // 获取列表不带分页,
        getDetailById, // 根据Id详情信息
        declare, // 根据id申报
        upload, // 导入
    }

}

export { base }

export default function common(path) {
    return base(`${path}`)
}
