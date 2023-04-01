import { createRouter, createWebHistory } from "vue-router";

import ContratMenu from "../components/contrat/ContratMenu.vue";

const routes = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: ContratMenu
    },
    {
        path: '/contrat',
        name: 'paiement.retard',
        component: ContratMenu
    }
];

export default createRouter({
    history: createWebHistory(),
    routes
});