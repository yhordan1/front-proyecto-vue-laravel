<template>
    <div class="grid">
        <div class="col-7">
            <div class="card">
               <TablaProductoComponent :nombre="nombre" :data="productos"/>
            </div>
        </div>
        <div class="col-5">
            <div class="grid">
                <div class="col-12">
                    <div class="card">Carrito</div>
                </div>
                <div class="col-12">
                    <div class="card">Cliente</div>
                </div>
                <div class="col-12">
                    <div class="card">Pedido</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import TablaProductoComponent from '@/components/admin/TablaProductoComponent.vue';
    import { onMounted, ref } from 'vue';
    import productoService from '../../../services/producto.service';
    
    const nombre = ref("Lista Productos");
    const productos = ref([]);

    onMounted(()=>{
        listarProducto();
    })
    const listarProducto = async () => {
        const {data} = await productoService.listar();
        productos.value = data.data;
    }
</script>