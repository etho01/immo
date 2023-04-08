<template>

    <div class="mx-auto sm:container">
        s
    </div>

</template>
<script>

    import userContrat from '../../services/contratServices';
    const { getContrat, contrat } = userContrat();

    export default {
        props: ['contrat_id'],
        data() {
            return {
                contrat
            }
        },
        methods : {
            getContrat
        }

    }

</script>