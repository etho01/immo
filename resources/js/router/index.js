import { createRouter, createWebHistory } from "vue-router";

import ContratMenu from "../components/contrat/ContratMenu.vue";
import LocataireMenu from "../components/locataire/LocataireMenu.vue";
import AppartMenu from "../components/appart/AppartMenu.vue";
import ContratShow from "../components/contrat/ContratShow.vue";

const routes = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: ContratMenu
    },
    {
        path: '/contrat',
        name: 'contrat.menu',
        component: ContratMenu,
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
    },
    {
        path: '/contrat/:id',
        name: 'contrat.list',
        component: ContratShow,
    },
];

export default createRouter({
    history: createWebHistory(),
    routes
});