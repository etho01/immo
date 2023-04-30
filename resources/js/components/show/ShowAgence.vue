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
                <InfoAgence ref-nav="infos_agence" :agenceBase="agence" deleteProps="true"/>
        
            </Nav>

            <InfoAgence v-else :agence_id="agence_id" />
        </section>
        
    </main>

</template>
<script>

    import useAgence from '../../services/agenceServices';
import InfoAgence from '../info/InfoAgence.vue';
import TitlePage from '../utils/TitlePage.vue';
import Nav from '../utils/component/nav/Nav.vue';
    const { agence, getAgence } = useAgence();

    export default {
    props: [],
    data() {
        return {
            agence_id: parseInt(this.$route.params.agence_id),
            agence
        };
    },
    methods: {
        getAgence
    },
    computed: {
        getNomAgence() {
            if (this.agence_id == "new") {
                return "Nouval agence";
            }
            return this.agence.nom;
        }
    },
    async mounted() {
        if (this.$route.params.agence_id == "new") {
            this.agence_id = "new";
        }
        else if (isNaN(this.agence_id)) {
            this.$router.push({ name: "agence.menu" });
        }
        else {
            if (!await this.getAgence(this.agence_id)) {
                this.$router.push({ name: "agence.menu" });
            }
        }
    },
    updated() {
        if (this.$route.params.agence_id != this.agence_id) {
            this.agence_id = this.$route.params.agence_id;
            this.getAgence(this.agence_id);
        }
    },
    components: { TitlePage, Nav, InfoAgence }
}

</script>