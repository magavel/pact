<template>
    <div style="background-color: white">
        <div class="tabs">
            <!--<span v-if="isAjout" class="titre mt-5 ml-3">AJOUTER UNE ACTIVITE</span>-->
            <!--<span v-else class="titre mt-5 ml-3">MODIFIER UNE ACTIVITE</span>-->
            <ul v-if="isAjout"class="d-flex justify-content-center" style="list-style: none">
                <li v-if="isAjout" class="titre li-titre"><em class="pi pi-plus-circle mr-3" style="font-size: 1em"></em>AJOUTER UNE ACTIVITE</li>
                <li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }" class="onglet pt-3">
                    <a :href="tab.href" @click="selectTab(tab)"><i v-bind:class="tab.icon" class="mr-1"></i>{{ tab.name }}</a>
                </li>
            </ul>
            <div v-else class="mt-2">

                <span class="titre ml-5" style="font-weight: 600"><em class="pi pi-pencil mr-3"></em>MODIFIER UNE ACTIVITE</span>
            </div>
        </div>
        <div class="tabs-details">
            <slot></slot>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Tabs",
        data() {
            return {
                tabs: [],
                isAjout : true
            };
        },

        created() {

            this.tabs = this.$children;
            this.isAjout = true;
            if(this.$store.state.saisies.saisieUpdate !== null && this.$store.state.saisies.saisieUpdate !== undefined){
                this.isAjout = false;
            }

        },
        methods: {
            selectTab(selectedTab) {
                this.tabs.forEach(tab => {
                    tab.isActive = (tab.name == selectedTab.name);
                });
            }
        }
    }
</script>

<style scoped>

    .tabs{
        background-color: #5172AF;
        margin-bottom: 15px;
        height: 60px;
        padding-top: 10px;
    }
    .titre{
        color: white;
        height: 50px;
        font-size: 1.3em;
    }

    .onglet{
        background-color: #E6DFDF;
        border-radius: 10px 10px 0px 0px;
        width: 175px;
        height: 50px;
        margin-right: 10px;
        text-align: center;
    }

    .onglet a{
        color: #535353;
        margin-right: 0px;
    }

    .is-active{
        background-color: white;

    }

    .is-active a{
        color: #154194;
    }

    .li-titre{
        margin-top: 10px;
        margin-left: -250px;
        margin-right: 170px;
        font-weight: 600;
    }
</style>
