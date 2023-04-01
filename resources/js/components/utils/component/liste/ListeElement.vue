<template>

    <section class="mx-3 block liste-element">
        <div class="mt-6 mx-auto border-4 rounded bg-state-50 sm:container ">
            <table>
                <thead class="bg-gray-200">
                    <tr class="grid my-3" :class="'grid-cols-'+getAllSize">
                        <th v-for="col in getCols" :key="col.id" :class="'col-span-'+col.size">
                            {{ col.nom }}
                        </th>
                    </tr>
                </thead>
                <tbody class="mx-3">
                    <tr class="grid border" :class="'grid-cols-'+getAllSize" :key="element.id" v-for="element in elements">
                        <td v-for="col in getCols" :class="getClassColonne">
                            <span v-for="action in col.param.actions">
                                <span v-if="action.type == 'fonc'" :class="getClassAction(action)">
                                    {{ action.fonc(element) }} 
                                </span>
                                <div v-else-if="action.type == 'button'" :class="getClassAction(action)" @click="$emit(action.event, element.id)">
                                    
                                </div>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>

</template>

<script>
    export default {
    props: [
        "elements",
        "cols",
        "disabledCol"
    ],
    computed: {
        getAllSize() {
            let size = 0;
            if (this.getCols != undefined) {
                this.getCols.forEach((col) => {
                    size += col.size;
                });
            }
            return size;
        },
        getCols() {
            if (this.cols == undefined)
                return [];
            return this.cols.filter((contrat) => {
                if (this.disabledCol == undefined) {
                    return true;
                }
                return !this.disabledCol.includes(contrat.id);
            });
        },
    },
    methods: {
        getClassColonne(col) {
            let classColonne = 'col-span-'+col.size;
            if (col.param.class != undefined) classColonne = classColonne + ' ' + col.param.class
            return classColonne
        },
        getClassAction(action){
            if (action.class != undefined) return action.class;
            return '';
        },
    },
}

</script>