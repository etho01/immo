import { createRouter, createWebHistory } from "vue-router";

import ShowAppart from '../components/show/ShowAppart.vue';
import ShowContrat from '../components/show/ShowContrat.vue';
import ShowLocataire from '../components/show/ShowLocataire.vue';

import MenuContrat from "../components/menu/MenuContrat.vue";
import MenuAppart from "../components/menu/MenuAppart.vue";
import MenuLocataire from "../components/menu/MenuLocataire.vue";

import Login from '../components/Login.vue';

const routes = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: MenuContrat
    },
    {
        path: '/contrat',
        name: 'contrat.menu',
        component: MenuContrat,
    },
    {
        path: '/locataire',
        name: 'locataire.menu',
        component: MenuLocataire
    },
    {
        path: '/appartement',
        name: 'appart.menu',
        component: MenuAppart
    },
    {
        path: '/contrat/:contrat_id',
        name: 'contrat.show',
        component: ShowContrat,
    },
    {
        path: '/locataire/:locataire_id',
        name: 'locataire.show',
        component: ShowLocataire,
    },
    {
        path: '/appartement/:appart_id',
        name: 'appart.show',
        component: ShowAppart,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    }
];

export default createRouter({
    history: createWebHistory(),
    routes
});