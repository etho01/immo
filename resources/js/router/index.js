import { createRouter, createWebHistory } from "vue-router";

import ContratMenu from "../components/contrat/ContratMenu.vue";
import LocataireMenu from "../components/locataire/LocataireMenu.vue";
import AppartMenu from "../components/appart/AppartMenu.vue";
import ContratShow from "../components/contrat/ContratShow.vue";
import LocataireShow from '../components/locataire/LocataireShow.vue';
import AppartShow from '../components/appart/AppartShow.vue';

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
        path: '/contrat/:contrat_id',
        name: 'contrat.show',
        component: ContratShow,
    },
    {
        path: '/locataire/:locataire_id',
        name: 'locataire.show',
        component: LocataireShow,
    },
    {
        path: '/appartement/:appart_id',
        name: 'appart.show',
        component: AppartShow,
    },
];

export default createRouter({
    history: createWebHistory(),
    routes
});