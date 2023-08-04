<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Administracion',
        items: [{ label: 'admin', icon: 'pi pi-fw pi-home', to: '/' },
        { label: 'perfil', icon: 'pi pi-fw pi-user', to: '/about' }]
    },
    {
        label: 'Gestion Productos',
        items: [
            { label: 'Categorias', icon: 'pi pi-fw pi-id-card', to: '/categoria' },
            { label: 'Productos', icon: 'pi pi-fw pi-check-square', to: '/producto' }
        ]
    },
    {
        label: 'Gestion Pedidos',
        items: [
            { label: 'Clientes', icon: 'pi pi-fw pi-id-card', to: '/cliente' },
            { label: 'Pedidos', icon: 'pi pi-fw pi-check-square', to: '/pedido' },
            { label: 'Nuevo Pedido', icon: 'pi pi-fw pi-check-square', to: '/pedido/nuevo' }
        ]
    },
    {
        label: 'Gestion Usuarios',
        items: [
            { label: 'Usuarios', icon: 'pi pi-fw pi-id-card', to: '/cliente' }
        ]
    },
   
   
   
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
        
    </ul>
</template>

<style lang="scss" scoped></style>
