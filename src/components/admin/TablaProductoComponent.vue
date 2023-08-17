<template>
    
    <DataTable :value="props.data" tableStyle="min-width: 50rem">
        <Column field="id" header="ID" style="width: 5%" ></Column>
        <Column field="nombre" header="NOMBRE"></Column>
        <Column field="precio" header="PRECIO"></Column>
        <Column field="stock" header="STOCK"></Column>
        <Column headerStyle="min-width:10rem;">
            <template #body="slotProps">
                <Button icon="pi pi-plus"  severity="info" text raised rounded aria-label="Agregar" @click="agregar(slotProps.data)" />
            </template></Column>
    </DataTable>
    <!--h1>{{ props.data }}</h1-->
</template>
<script setup>
    const props = defineProps(['nombre', 'data']);
    const emit = defineEmits(['funCarrito']);


    function agregar( prod){
        emit("funCarrito", prod);
    }
    
</script>