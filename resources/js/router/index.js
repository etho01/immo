import { createRouter, createWebHistory } from "vue-router";

import Dashboard from '../components/Dashboard.vue'

import ShowAppart from '../components/feature/appart/ShowAppart.vue';
import ShowContrat from '../components/feature/contrat/ShowContrat.vue';
import ShowLocataire from '../components/feature/locataire/ShowLocataire.vue';
import ShowProprio from "../components/feature/proprietaire/ShowProprio.vue";
import ShowAgence from '../components/feature/agence/ShowAgence.vue'
import ShowUser from '../components/feature/user/ShowUser.vue';

import MenuContrat from "../components/feature/contrat/MenuContrat.vue";
import MenuAppart from "../components/feature/appart/MenuAppart.vue";
import MenuLocataire from "../components/feature/locataire/MenuLocataire.vue";
import MenuProprio from "../components/feature/proprietaire/MenuPropio.vue";
import MenuAgence from "../components/feature/agence/MenuAgence.vue";
import MenuUser from "../components/feature/user/MenuUser.vue";



import Login from '../components/Login.vue';

const routes = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
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
        path: '/proprietaire',
        name: 'proprio.menu',
        component: MenuProprio
    },
    {
        path: '/agence',
        name: 'agence.menu',
        component: MenuAgence
    },
    {
        path: '/user',
        name: 'user.menu',
        component: MenuUser
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
        path: '/proprietaire/:proprio_id',
        name: 'proprio.show',
        component: ShowProprio
    },
    {
        path: '/agence/:agence_id',
        name: 'agence.show',
        component: ShowAgence
    },
    {
        path: '/user/:user_id',
        name: 'user.show',
        component: ShowUser
    },
    {
        path: '/me',
        name: 'me',
        component: ShowUser
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