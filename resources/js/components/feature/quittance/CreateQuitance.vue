<template>
    <div>
        <Error :erreurTab="erreurTab" />
        <Title title="Date" />
        <div class="grid grid-cols-2 mt-3">
            <Text type="date" label="Date de debut de quittance"/>
            <Text type="date" label="Date de fin de quittance"/>
        </div>
        <div class="mt-5 flex justify-end">
            <div class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md cursor-pointer" @click="downloadQuittanceClick">
                Telecharger une quittance
            </div>
            <div class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md ml-2 cursor-pointer" @click="sendMailQuittanceClick">
                Envoyer la quittance par mail
            </div>
        </div>
    </div>
</template>
<script>
import Error from '../../utils/Error.vue';
import Text from '../../utils/input/Text.vue';
import Title from '../../utils/title/Title.vue';
import useQuittance from './quittanceServices';
const { downloadQuittance, sendMailQuittance, erreurTab } = useQuittance();

    export default {
        props: ['contrat_id'],
        data() {
            return {
                erreurTab,
                data: {
                    date_debut: undefined,
                    date_fin: undefined
                }
            }
        },
        methods: {
            downloadQuittanceClick() {
                downloadQuittance(this.contrat_id, this.data)
            },
            sendMailQuittanceClick() {
                sendMailQuittance(this.contrat_id, this.data)
            },
            changeDateDebut(value) {
                this.data = {...this.data, date_debut: value}
            },
            changeDateFin(value) {
                this.data = {...this.data, date_fin: value}
            },
        },
        components: { Error, Title, Text }
    }

</script>