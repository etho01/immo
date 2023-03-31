import { createRouter, createWebHistory } from "vue-router";

import ContratList from "../components/contrat/ContratList.vue";

const routes = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: ContratList
    },
    {
        path: '/contrat',
        name: 'paiement.retard',
        component: ContratList
    }
];

export default createRouter({
    history: createWebHistory(),
    routes
});