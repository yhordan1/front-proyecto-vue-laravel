import axios from "axios";

const url_base = "http://127.0.0.1:8000/api";

export const http = () =>{
    const api = axios.create({
        baseURL: url_base,
        headers:{
            'Accept': 'application/json',
            'Authorization': 'Bearer' + token
        }
    })
    //interceptar errores 401, 403
    
    return api;
}