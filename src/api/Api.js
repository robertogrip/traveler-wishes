import axios from 'axios';

const apiUrl = 'https://5b056c948be5840014ce45f1.mockapi.io/api/v1/';

const apiRest = {
    get: (url) => {
        return axios.get(`${apiUrl}${url}`)
    },
    post: (url, params = '') => {
        return axios.post(`${apiUrl}${url}`, params)
    },
    put: (url, params = '') => {
        return axios.put(`${apiUrl}${url}`, params)
    },
    delete: (url) => {
        return axios.delete(`${apiUrl}${url}`)
    }
}

function ApiObject(table) {
    this.get = (id) => {
        return apiRest.get(`${table}/${id}`)
    }

    this.getAll = () => {
        return apiRest.get(`${table}/`)
    }

    this.update = (id, data) => {
        return apiRest.put(`${table}/${id}`, data)
    }

    this.create = (data) => {
        return apiRest.post(`${table}/`, data)
    }

    this.delete = (id) => {
        return apiRest.delete(`${table}/${id}`)
    }
}

export default {
    users: new ApiObject('users'),
    posts: new ApiObject('posts'),
    galeries: new ApiObject('galeries'),
    comments: new ApiObject('comments'),
    categories: new ApiObject('categories')
};