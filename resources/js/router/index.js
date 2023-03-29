import { createRouter, createWebHistory } from "vue-router";

import PaiementRetard from "../components/paiement/PaiementRetard.vue";

const routes = [
    {
        path: '/dashboard',
        name: 'paiement.retard',
        component: PaiementRetard
    }
];

export default createRouter({
    history: createWebHistory(),
    routes
});