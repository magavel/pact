<template>
    <div style="background-color: white">
        <div class="tabs">
            <span class="titre mt-5 ml-3">Ajouter une activité</span>
            <ul class="d-flex justify-content-center" style="list-style: none">
                <li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }" class="onglet pt-3">
                    <a :href="tab.href" @click="selectTab(tab)"><i v-bind:class="tab.icon" class="mr-1"></i>{{ tab.name }}</a>
                </li>
            </ul>
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
            return {tabs: [] };
        },

        created() {

            this.tabs = this.$children;

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
</style>