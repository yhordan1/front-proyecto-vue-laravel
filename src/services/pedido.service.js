import { http } from "./Http"

export default {
    listar(page=1, limit=10, q=""){
        return http().get(`/pedido?page=${page}&limit=${limit}&q=${q}`);
    },
    guardar(datos){
        return http().post("/pedido", datos);
    },
    mostrar(id){
        return http().get("/pedido/"+id);
    },
    modificar(datos, id){
        return http().put("/pedido/"+id, datos);
    },
    eliminar(id){
        return http().delete("/pedido/"+id);
    }
}