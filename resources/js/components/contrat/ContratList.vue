<template>
    <main class="w-full">
        <TitlePage title="Liste des Contrats"/>
        <section class="block sm:container mx-auto">
            <div class="border-4 p-3 border rounded bg-state-50">

            </div>
        </section>

        <section class="mx-3 block liste-element">
            <div class="mt-6 mx-auto border-4 rounded bg-state-50 sm:container ">
                <table>
                    <thead class="bg-gray-200">
                        <tr class="grid grid-cols-4 my-3">
                            <th>
                                Nom du locataire
                            </th>
                            <th>
                                Adresse du bien
                            </th>
                            <th>
                                Loyer du bien
                            </th>
                            <th>
                                Charge du bien
                            </th>
                        </tr>
                    </thead>
                    <tbody class="mx-3">
                        <tr class="grid border grid-cols-4" :key="contrat.id" @click="test(contrat)" v-for="contrat in contrats">
                            <td>
                                {{ contrat.locataire.nom }} {{ contrat.locataire.prenom }}
                            </td>
                            <td>
                                {{ contrat.appart.adresse }}
                            </td>
                            <td>
                                {{ contrat.appart.loyer }} €
                            </td>
                            <td>
                                {{ contrat.appart.charge }} €
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

    </main>

</template>

<script>

    import userContrat from '../../services/contratServices.js';
    import TitlePage from '../utils/TitlePage.vue';

    const { contrats, getContrats } = userContrat();

    export default {
        data() {
            return {
                contrats
            }
        },
        mounted() {
            getContrats();
        },
        methods: {
            test(contrat) {
                console.log(contrat)
            }
        },
        components: { TitlePage }
}
</script>