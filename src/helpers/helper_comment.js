import {API_URL_COMMENT} from '../config.js'
import Auth from './auth.js'

export default class CommentHelper {
	constructor() {
		
	}
	
	static index(project_id,object_type, object_id) {
        return axios({
            method: 'get',
            url: API_URL_COMMENT,
            headers: Auth.header(),
            params: {
                project_id : project_id,
                object_type : object_type,
                object_id : object_id
            }
        });
    }

    // static show(id) {
    //     return axios({
    //         method: 'get',
    //         url: API_URL_COMMENT + '/' + id,
    //         headers: Auth.header(),
    //     });
    // }

    static store(data) {
        return axios({
            method: 'post',
            url: API_URL_COMMENT,
            headers: Auth.header(),
            data: data
        });
    }

    static update(data) {
        const dataJson = URI.parseQuery(data);
        return axios({
            method: 'put',
            url: API_URL_COMMENT + '/' + dataJson.id,
            headers: Auth.header(),
            data: data
        });
    }

    static save(data) {
        const dataJson = URI.parseQuery(data);
        if (dataJson.id) {
            var ajaxObj = CommentHelper.update(data);
        } else {
            var ajaxObj = CommentHelper.store(data);
        }
        return ajaxObj;
    }


    static delete(id) {
        return axios({
            method: 'delete',
            url: API_URL_COMMENT + '/' + id,
            headers: Auth.header(),
        });
    }
}