<template>

    <div class="flex">
        <div class="mr-2" v-for="label in labels" :key="label.id" @click="changeShow(label.id)">
            <div class="bg-gray-200 rounded-xl px-3 py-1">
                {{ label.nom }}
            </div>

        </div>
        <slot ></slot>

    </div>

</template>
<script>

    export default {

        props : [
            'labels'
        ],
        data () {
            return {
                activeItem : 0
            }
        },
        methods : {
            changeShow(idItem) {
                this.activeItem = idItem;
            }
        }

    }

</script>