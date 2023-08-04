<script setup>
import { ref, onMounted } from 'vue';
import categoriaService from "./../../services/categoria.service.js"
import { useToast } from 'primevue/usetoast';

    const toast = useToast();
    // variables o estados reactivos
    const categorias = ref([])
    const categoria = ref({nombre: '', detalle: ''})
    const visible = ref(false);

    // metodos o funciones
    onMounted(()=> {
        getCategorias()
    })
    async function getCategorias(){
        const datos = await categoriaService.listar();

        categorias.value = datos.data
    }
    async function guardarCategoria(){
        try {
            if(categoria.value.id){
                await categoriaService.modificar(categoria.value, categoria.value.id);
        
                getCategorias();
                visible.value = false;
                categoria.value = {nombre: '', detalle: ''};
                toast.add({ severity: 'success', summary: 'Categoria modificada', detail: 'Registro Modificada', life: 3000 });
            
            }else{

                await categoriaService.guardar(categoria.value);
        
                getCategorias();
                visible.value = false;
                categoria.value = {nombre: '', detalle: ''};
                toast.add({ severity: 'success', summary: 'Categoria Resgristro', detail: 'Registro Existoso', life: 3000 });
            }
            

        } catch (error) {
            alert(error);
        }
        
    }
    function editarCat(cat){
            categoria.value = cat;
            visible.value = true;
            
    }
    async function eliminarCat(id){
        if(confirm("¿Estas seguro de eliminar la categoria?")){
            await categoriaService.eliminar(id);
            getCategorias();
            toast.add({ severity: 'success', summary: 'Eliminar Categoria', detail: 'Registro Eliminado', life: 3000 });
        }
    }
    
</script>
<template>
    
    <div class="card">
       
        <h1>Gestion Categorias</h1>
        <Button label="NUEVA CATEGORIA" icon="pi pi-external-link" @click="visible = true" outlined />
        <Dialog v-model:visible="visible" modal header="REGISTRAR CATEGORIA" :style="{ width: '35vw' }" class="p-fluid">
        <div class="col-12">
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-6">
                        <label for="firstname2">INGRESAR NOMBRE</label>
                        <InputText id="firstname2" type="text" v-model="categoria.nombre"/>
                    </div>
                    
                    <div class="field col-12">
                        <label for="address">DETALLES</label>
                        <Textarea id="address" rows="4"  v-model="categoria.detalle" />
                    </div>
                </div>        
            
        </div>
        <template #footer>
            <Button label="Cancelar" severity="danger" outlined @click="hideDialog"  />
            <Button class="p-button-outlined" @click="guardarCategoria()" label="Guardar" outlined />
        </template>
        </Dialog>

        <DataTable :value="categorias" paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
            <Column field="id" header="ID" style="width: 25%"></Column>
            <Column field="nombre" header="NOMBRE" style="width: 25%"></Column>
            <Column field="detalle" header="DETALLE" style="width: 25%"></Column>
            <Column header="GESTION" style="width: 25%">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" @click="editarCat(slotProps.data)" severity="info" text raised rounded aria-label="Editar" />
                    <Button icon="pi pi-trash" @click="eliminarCat(slotProps.data.id)" severity="danger" text raised rounded aria-label="Eliminar" />
                    <!--Button @click="editarCat(slotProps.data)" label="Editar" severity="help" outlined />
                    <Button @click="eliminarCat(slotProps.data.id)" label="Eliminar" severity="danger" outlined /-->
                    
                </template>
            </Column>
        </DataTable>
        <!--pre>{{ categorias }}</pre-->
        <!--table border="1">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOMBRE</th>
                    <th>DETALLE</th>
                    <th>ACCION</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cat in categorias" :key="cat.id">
                    <td>{{ cat.id }}</td>
                    <td>{{ cat.nombre }}</td>
                    <td>{{ cat.detalle }}</td>
                    <td>
                        <button>Editar</button>
                        <button>Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table-->
        <Toast />
    </div>
</template>