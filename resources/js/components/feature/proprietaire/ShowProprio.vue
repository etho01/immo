<template>

    <main class="w-full">
        <TitlePage :title="getTitlePage" />
        <section class="sm:container mx-auto p-3 bg-state-50">

            <Nav v-if="!proprietaire.isNewProprietaire"
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
                <InfoPropio ref-nav="info_proprio" :proprietaire="proprietaire" deleteProps="true"/>
                <ListeAppart ref-nav="liste_apparts" :appart="proprietaire.appart"/>
            </Nav>

            <InfoPropio :proprietaire="proprietaire" v-else />

        </section>

    </main>

</template>
<script>
import InfoPropio from '../proprietaire/InfoPropio.vue';
import TitlePage from '../../utils/TitlePage.vue';
import Nav from '../../utils/component/nav/Nav.vue';
import ListeAppart from '../appart/ListeAppart.vue';

import { useProprietaireStore } from './proprioStore';
const proprietaire = useProprietaireStore();

    export default {
        data() {
            return {
                proprio_id: parseInt(this.$route.params.proprio_id),
                proprietaire,
            }
        },
        async mounted() {
            if (this.$route.params.proprio_id == 'new'){
                this.proprietaire.setNewProprietaire()
            } else if (isNaN(this.proprio_id)) {
                this.$router.push({ name: "proprio.menu" });
            } else {
                if (!await this.proprietaire.getProprietaireById(this.proprio_id)){
                    this.$router.push({ name: "proprio.menu" });
                }
            }
        },
        async updated(){
            if (this.proprio_id != this.$route.params.proprio_id){
                this.proprio_id = parseInt(this.$route.params.proprio_id)
                if (this.$route.params.proprio_id == 'new'){
                    this.proprietaire.setNewProprietaire()
                } else if (isNaN(this.proprio_id)) {
                    this.$router.push({ name: "proprio.menu" });
                } else {
                    if (!await this.proprietaire.getProprietaireById(this.proprio_id)){
                        this.$router.push({ name: "proprio.menu" });
                    }
                }
            }
        },
        computed: {
            getTitlePage() {
                if (this.proprietaire.isNewProprietaire) {
                    return 'Nouveau proprietaire'
                }
                return 'Proprietaire ' + this.proprietaire.getNomProprietaire
            }
        },
    components: { TitlePage, Nav, InfoPropio, ListeAppart }
}

</script>