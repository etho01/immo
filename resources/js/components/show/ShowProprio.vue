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
                <InfoPropio ref-nav="info_proprio" :proprietaire="proprietaire" deleteProps="true"/>
                <ListeAppart ref-nav="liste_apparts" :appart="proprietaire.appart"/>
            </Nav>

            <InfoPropio :proprietaire="proprietaire" v-else />

        </section>

    </main>

</template>
<script>
import InfoPropio from '../info/InfoPropio.vue';
import TitlePage from '../utils/TitlePage.vue';
import Nav from '../utils/component/nav/Nav.vue';
import ListeAppart from '../liste/ListeAppart.vue';

import { useProprietaireStore } from '../../store/proprioStore';
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
        },
    components: { TitlePage, Nav, InfoPropio, ListeAppart }
}

</script>