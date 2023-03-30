<template>

<div class="col-span-1 bg-neutral-900 h-screen justify-items-stretch">
    <div class="flex-wrap justify-between flex px-6 pt-5">
        <div class="text-neutral-200 text-4xl self-center">
            Immo
        </div>
        <div>
            <button class="bg-slate-600 border-slate-500 rounded-xl border-2 aspect-square px-3 py-2">ds</button>
        </div>
    </div>
    <div class="my-4 grid px-4">
        <router-link v-for="page in pages" :to="{name: page.name}" class="text-xl text-neutral-400 my-2 px-1 border-slate-500 hover:bg-neutral-700 rounded-xl border-2 w-full">{{ page.nom }}</router-link>
    </div>
</div>

</template>
<script>

    export default {
        data () {
            return {
                pages: [ 
                    {
                        nom: 'Dashboard',
                        name: 'paiement.retard'
                    },
                    {
                        nom: 'Autre',
                        name: 'paiement.retard'
                    },
                ]
            }
        }
    }

</script>
