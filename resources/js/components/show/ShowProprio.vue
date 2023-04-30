<template>

    <main class="w-full">
        <TitlePage :title="getTitreProprio" />
        <section class="sm:container mx-auto p-3 bg-state-50">

            <Nav v-if="proprio_id != 'new'"
                :labels="[
                    {
                        nom: 'Informations proprietaire',
                        id: 'info_proprio'
                    },
                    {
                        nom: 'Liste des appartements',
                        id : 'liste_apparts'
                    }
                ]" 
                activeItemDefault="info_proprio"
            >
                <InfoPropio ref-nav="info_proprio" :proprietaireBase="proprietaire" deleteProps="true"/>
                <ListeAppart ref-nav="liste_apparts" />
            </Nav>

            <InfoPropio ref-nav="info_loc" :proprietaire_id="proprio_id" v-else />

        </section>

    </main>

</template>
<script>
import InfoPropio from '../info/InfoPropio.vue';
import TitlePage from '../utils/TitlePage.vue';
import Nav from '../utils/component/nav/Nav.vue';

import useProprietaire from '../../services/proprietaireServices';
import ListeAppart from '../liste/ListeAppart.vue';
const { proprietaire, getProprietaire } = useProprietaire();

    export default {
        data() {
            return {
                proprio_id: parseInt(this.$route.params.proprio_id),
                proprietaire,
            }
        },
        methods: {
            getProprietaire
        },
        computed: {
            getNomProprio() {
                return this.proprietaire.nom + ' ' + this.proprietaire.prenom;
            },
            getTitreProprio() {
            if (this.proprio_id == "new") {
                return "Nouveau locataire"
            }
            return this.getNomProprio
        }
        },
        async mounted() {
            if (this.$route.params.proprio_id == 'new'){
                this.proprio_id = "new"
            } else if (isNaN(this.proprio_id)) {
                this.$router.push({ name: "proprio.menu" });
            } else {
                if (!await this.getProprietaire(this.proprio_id)){
                    this.$router.push({ name: "proprio.menu" });
                }
            }
        },
        updated(){
            if (this.$route.params.proprio_id != this.proprio_id){
                this.proprio_id = this.$route.params.proprio_id
                this.getProprietaire(this.proprio_id)
            }
        },
    components: { TitlePage, Nav, InfoPropio, ListeAppart }
}

</script>