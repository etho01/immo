import { createRouter, createWebHistory } from "vue-router";

import ContratMenu from "../components/contrat/ContratMenu.vue";
import LocataireMenu from "../components/locataire/LocataireMenu.vue";
import AppartMenu from "../components/appart/AppartMenu.vue";

const routes = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: ContratMenu
    },
    {
        path: '/contrat',
        name: 'contrat.menu',
        component: ContratMenu
    },
    {
        path: '/locataire',
        name: 'locataire.menu',
        component: LocataireMenu
    },
    {
        path: '/appartement',
        name: 'appart.menu',
        component: AppartMenu
    }
];

export default createRouter({
    history: createWebHistory(),
    routes
});