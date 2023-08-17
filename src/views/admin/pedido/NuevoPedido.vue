<template>
    <div class="grid">
        <div class="col-7">
            <div class="card">
               <TablaProductoComponent :nombre="nombre" :data="productos" @funCarrito="addCarrito"/>
            </div>
        </div>
        <div class="col-5">
            <div class="grid">
                <div class="col-12">
                    <div class="card">
                        <DataTable :value="carrito" >
                            <Column field="nombre" header="NOMBRE"></Column>
                            <Column field="precio" header="PRECIO"></Column>
                            <Column field="cantidad" header="c.">
                            <template #body="slotProps">
                                <div style="display: flex; align-items: center;">
            <Button icon="pi pi-plus" style="width: 30px; height: 20px;" text raised @click="incrementarCant(slotProps.data)" />
            <InputNumber v-model="slotProps.data.cantidad" class="custom-input-number" inputId="integeronly" />
            <Button icon="pi pi-minus" style="width: 30px; height: 20px;" text raised @click="decrementarCant(slotProps.data)" />
        </div>
                            </template>
                            </Column>
   
                            <Column headerStyle="min-width:10rem;">
                                <template #body="slotProps">
                                    <Button icon="pi pi-trash"  severity="danger" text raised rounded aria-label="Eliminar" @click="quitarCarrito(slotProps.data)" />
                                    
                                </template></Column>
                        </DataTable>
                        
                    </div>
                </div>
                <div class="col-12">
                    <div class="card">
                        
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="buscarClie" placeholder="Search" @keypress.enter="buscarCliente"/>
                        </span>

                        <Button label="Nuevo Cliente" icon="pi pi-user" @click="visibleCliente = true" outlined />

                        <div class="card" v-if="cliente_seleccionado.id">
                            <h4>CLIENTE: {{ cliente_seleccionado.nombre_completo }}</h4>
                            <h4>CI/NIT: {{ cliente_seleccionado.ci_nit }}</h4>
                            <h4>TELEFONO: {{ cliente_seleccionado.telefono }}</h4>

                        </div>
                        <Dialog v-model:visible="visibleCliente" modal header="Nuevo Cliente" :style="{ width: '50vw' }" class="p-fluid">
                            <div class="field">
                                <label for="name">NOMBRE COMPLETO</label>
                                <InputText id="name" v-model.trim="cliente.nombre_completo" required="true" />
                            </div>
                            <div class="field">
                                <label for="ci_nit">CI/NIT</label>
                                <InputText id="ci_nit" v-model.trim="cliente.ci_nit" required="true"  />
                            </div>
                            <div class="field">
                                <label for="telefono">TELEFONO</label>
                                <InputText id="telefono" v-model.trim="cliente.telefono" required="true"  />
                            </div>
                            <template #footer>
                        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="visibleCliente=false" />
                        <Button label="Guardar Cliente" icon="pi pi-check" class="p-button-text" @click="guardarCliente" />
                    </template>
                        </Dialog>
                    </div>
                </div>
                <div class="col-12">
                    <div class="card">
                        <Button label="REGISTRAR PEDIDO" icon="pi pi-user" severity="success" @click="guardarPedido" text raised/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import TablaProductoComponent from '@/components/admin/TablaProductoComponent.vue';
    import { onMounted, ref } from 'vue';
    import productoService from '../../../services/producto.service';
    import clienteService from '../../../services/cliente.service';
    import pedidoService from '../../../services/pedido.service';
    
    const nombre = ref("Lista Productos");
    const productos = ref([]);
    const carrito = ref([]);
    const visibleCliente = ref(false);
    const cliente = ref({});
    const cliente_seleccionado = ref({})
    const buscarClie = ref("");

    onMounted(()=>{
        listarProducto();
    })
    const listarProducto = async () => {
        const {data} = await productoService.listar();
        productos.value = data.data;
    }
    const addCarrito = (prod) => {

        const p = {
            producto_id: prod.id,
            nombre: prod.nombre,
            precio: prod.precio,
            cantidad: 1,
            stock: prod.stock
        }
        carrito.value.push(p);
    }
    const quitarCarrito = (prod) =>{
        console.log(prod.producto_id);
        carrito.value.splice(carrito.value.indexOf(prod),1);
    }
    const incrementarCant = (prod) => {
        if(prod.cantidad < prod.stock)
            prod.cantidad++;
    }
    const decrementarCant = (prod) => {
        if(prod.cantidad >= 2)
            prod.cantidad--;
    }
    const guardarCliente = async () => {
        const {data} = await clienteService.guardar(cliente.value);
        cliente_seleccionado.value = data.cliente;
        visibleCliente.value = false;
        cliente.value = {};
    }
    const buscarCliente = async () => {
        const {data} = await clienteService.buscar(buscarClie.value);
        cliente_seleccionado.value = data;
        buscarClie.value = ""
    }
    const guardarPedido = async () => {
        if(confirm("¿Esta seguro de segistrar el pedido?")){

            const datos =   {
                "cliente_id": cliente_seleccionado.value.id,
                "productos": carrito.value
            }
            const {data} = await pedidoService.guardar(datos);
            carrito.value = []
            cliente.value = {}
            cliente_seleccionado.value = {}
            buscarClie.value = "" 
        }
    }
</script>