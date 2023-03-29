<template>
    <div>
        ceci est un testdd 
        <div v-text="contrat.id">

        </div>
    <button @click="getContrat(1)">d</button>

    </div>
</template>

<script>

    import userContrat from '../../services/contratServices.js';

    export default {
        setup(){
            const {contrat, getContrat} = userContrat();

            return {
                getContrat,
                contrat
            }
        }
    }
</script>