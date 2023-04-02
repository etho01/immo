<template>
    <main class="w-full m-3">
        <TitlePage :title="'Contrat '+contrat_id"></TitlePage>
        <section class="grid grid-cols-2 sm:container mx-auto border-4 p-3 rounded bg-state-50">
            <Nav :labels="[{
                nom : 'test',
                id : 'dsq'
            },
            {
                nom : 'testsd',
                id : 'ddzssq'
            },
            ]">
            
            <div ref="dsq">
                ds
            </div>
            <div ref="ddzssq">
                dsfqs
            </div>
        
        </Nav>
        </section>
    </main>
</template>
<script>

    import userContrat from '../../services/contratServices.js';
import TitlePage from '../utils/TitlePage.vue';
import Nav from '../utils/component/nav/Nav.vue';

    const { contrat, getContrat } = userContrat()

    export default {
    data() {
        return {
            contrat_id: parseInt(this.$route.params.id),
            contrat
        };
    },
    mounted() {
        if (isNaN(this.contrat_id)) {
            this.$router.push({ name: "contrat.menu" });
        }
        this.getContrat(this.contrat_id);
    },
    methods: {
        getContrat
    },
    components: { TitlePage, Nav }
}

</script>