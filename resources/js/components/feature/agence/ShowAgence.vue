<template>

    <main class="w-full">
        <TitlePage :title="getNomAgence" />
        <section class="sm:container mx-auto p-3 bg-state-50">
            <Nav v-if="agence_id != 'new'"
                :labels="[
                    {
                        nom: 'Informations agence',
                        id: 'infos_agence'
                    },
                ]"
                activeItemDefault="infos_agence"
            >
                <InfoAgence ref-nav="infos_agence" :agence="agence" deleteProps="true"/>
        
            </Nav>

            <InfoAgence v-else :agence="agence" />
        </section>
        
    </main>

</template>
<script>

import InfoAgence from './InfoAgence.vue';
import TitlePage from '../../utils/TitlePage.vue';
import Nav from '../../utils/component/nav/Nav.vue';

import { useAgenceStore } from './agenceStore';
const agence = useAgenceStore()

    export default {
    props: [],
    data() {
        return {
            agence_id: parseInt(this.$route.params.agence_id),
            agence
        };
    },
    async mounted() {
        if (this.$route.params.agence_id == "new") {
            this.agence.setNewAgence()
        }
        else if (isNaN(this.agence_id)) {
            this.$router.push({ name: "agence.menu" });
        }
        else {
            if (!await this.agence.getAgenceById(this.agence_id)) {
                this.$router.push({ name: "agence.menu" });
            }
        }
    },
    async updated() {
        this.agence_id = parseInt(this.$route.params.agence_id);
        if (this.$route.params.agence_id == "new") {
            this.agence.setNewAgence()
        }
        else if (isNaN(this.agence_id)) {
            this.$router.push({ name: "agence.menu" });
        }
        else {
            if (!await this.agence.getAgenceById(this.agence_id)) {
                this.$router.push({ name: "agence.menu" });
            }
        }
    },
    components: { TitlePage, Nav, InfoAgence }
}

</script>