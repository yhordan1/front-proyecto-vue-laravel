<template>
    <h1>Tabla Componente de Producto</h1>
    <DataTable :value="props.data" tableStyle="min-width: 50rem">
        <Column field="id" header="ID" style="width: 5%" ></Column>
        <Column field="nombre" header="NOMBRE"></Column>
        <Column field="precio" header="PRECIO"></Column>
        <Column field="stock" header="STOCK"></Column>
    </DataTable>
    <!--h1>{{ props.data }}</h1-->
</template>
<script setup>
    const props = defineProps(['nombre', 'data']);

</script>