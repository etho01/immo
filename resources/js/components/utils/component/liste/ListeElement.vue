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
                        <td v-for="col in getCols" :class="getClassColonne(col)">
                            <span v-for="action in col.param.actions">
                                <span v-if="action.type == 'fonc'" :class="getClassAction(action)">
                                    {{ action.fonc(element) }} 
                                </span>
                                <div v-else-if="action.type == 'button'" 
                                :class="getClassAction(action)" 
                                @click="$emit(action.event.nomEvent, action.event.data(element))">
                                    <font-awesome-icon :icon="action.icone.icone" style="color: #401f51;" />
                                </div>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
            <!--- more free and premium Tailwind CSS components at https://tailwinduikit.com/ --->

            <div class="lg:w-3/5 w-full  flex items-center justify-between border-t border-gray-200">
                <div class="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer"
                    @click="pagePrev()">
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.1665 4H12.8332" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M1.1665 4L4.49984 7.33333" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M1.1665 4.00002L4.49984 0.666687" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    <p class="text-sm ml-3 font-medium leading-none ">Precedant</p>                    
                </div>
                <div class="sm:flex hidden">
                    <p 
                        class="text-sm font-medium leading-none cursor-pointer pt-3 mr-4 px-2"
                        v-for="pagePaginator in getPagePaginator"
                        :key="pagePaginator"
                        :class="[pagePaginator == page ? 'text-indigo-700 border-t border-indigo-400' : 'text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400']"
                        @click="$emit('gotoPage', pagePaginator)"
                    >
                        {{ pagePaginator }}
                    </p>
                </div>
                <div class="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer"
                    @click="pageNext()">
                    <p class="text-sm font-medium leading-none mr-3">Suivant</p>
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.1665 4H12.8332" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9.5 7.33333L12.8333 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9.5 0.666687L12.8333 4.00002" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        
                </div>
            </div>
        </div>
    </section>

</template>

<script>
    export default {
    props: [
        "elements",
        "cols",
        "disabledCol",
        'page',
        'nbPage'
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
        getPagePaginator() {
            return this.getPagePaginatorPossible.filter((element) => {
                return 1 <= element && element <= this.nbPage
            } )
        },
        getPagePaginatorPossible() {
            let tab_paginate_possible = [1,2,3, this.page-1, this.page, this.page+1, this.nbPage -2, this.nbPage -1 , this.nbPage];
            let tab_paginate = [] // fait sorte qu'il n'y ait pas de doublon
            tab_paginate_possible.forEach((element) => {
                if (tab_paginate.includes(element) == false){
                    tab_paginate.push(element);
                }
            })
            return tab_paginate;
        }
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
        pageNext(){
            if (this.page < this.nbPage){
                this.$emit('gotoPage', this.page + 1);
            }
        },
        pagePrev() {
            if (1 < this.page){
                this.$emit('gotoPage', this.page - 1);
            }
        }
    },
}

</script>