<template>
    <div class="card">
    <h1>Lista Pedidos</h1>
    <DataTable :value="pedidos" tableStyle="min-width: 50rem">
        <Column field="id" header="ID" style="width: 5%" ></Column>
        <Column field="fecha" header="FECHA"></Column>
        <Column field="observacion" header="OBSERVACION"></Column>
        <Column field="cliente.nombre_completo" header="CLIENTE"></Column>
        <Column field="user.name" header="USUARIO"></Column>
        <Column headerStyle="min-width:10rem;">
            <template #body="slotProps">
                <Button label="Productos" icon="pi pi-product" @click="verProductos(slotProps.data)" outlined />
            </template></Column>
    </DataTable>
    <Dialog v-model:visible="visibleProductos" modal header="Lista Pedido" :style="{ width: '50vw' }" class="p-fluid">
                <h4>FECHA: {{ pedido.fecha }}</h4>
                <h4>CLIENTE: {{ pedido.cliente.nombre_completo }}</h4>
                <h4>ATENDIDO POR: {{ pedido.user.name }}</h4>
                <DataTable :value="pedido.productos" tableStyle="min-width: 50rem">
                    <Column field="id" header="ID" style="width: 5%" ></Column>
                    <Column field="nombre" header="NOMBRE"></Column>
                    <Column field="precio" header="PRECIO"></Column>
                    <Column field="pivot.cantidad" header="CANTIDAD"></Column>
                    <Column headerStyle="min-width:10rem;" header="SUB TOTAL">
                    <template #body="slotProps">
                        {{ parseFloat(slotProps.data.pivot.cantidad * slotProps.data.precio).toFixed(2) }}
                    </template></Column>
                </DataTable>
    </Dialog>
</div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import pedidoService from "../../../services/pedido.service";

const pedidos = ref([])
const visibleProductos = ref(false);
const pedido = ref([]);

onMounted(()=>{
    listarPedidos()
})
const listarPedidos = async () => {
    const {data} = await pedidoService.listar();
    pedidos.value = data.data;
}
const verProductos = (datos) =>{
    visibleProductos.value = true;
    pedido.value = datos;
}
</script>