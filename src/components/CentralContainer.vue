<template>
    <div class="container-fluid">
        <div class="row ">
            <nav class=" navGauche col-md-2 d-none d-md-block">
                <div>
                    <h2 class="text-secondary mb-5">
                        PACT NG
                    </h2>
                </div>
                <div class=" mt-n3">
                    <ul class="nav flex-column">
                        <li class="nav-item ml-n4 mb-3">
                            <router-link v-if="currentUser" to="/home" class="nav-link">
                                <span class="pr-3">

                                    <i class="pi pi-chart-line"></i>

                                </span>
                                Rapports
                            </router-link>
                        </li>
                        <li class="nav-item ml-n4 mb-3">
                            <router-link v-if="currentUser" to="/activites/myActivities/dailyListing" class="nav-link">
                                <span class="pr-3">
                                    <font-awesome-icon icon="pencil-alt"/>
                                </span>
                                Saisies
                            </router-link>
                        </li>
                        <li class="nav-item ml-n4 mb-3">
                            <router-link v-if="currentUser" to="/projects" class="nav-link">
                                <span class="pr-3">
                                    <i class="pi pi-list"></i>
                                </span>
                                Projets
                            </router-link>
                        </li>
                        <li v-if="showAdminBoard" class="nav-item ml-n4 mb-3">
                            <router-link to="/user" class="nav-link">
                                <span class="pr-3">
                               <i class="pi pi-cog"></i>
                                </span>
                                Administration
                            </router-link>
                        </li>
                        <li v-if="showModeratorBoard" class="nav-item ml-n4 mb-3">
                            <router-link to="/mod" class="nav-link"> Board Pilote</router-link>
                        </li>
                    </ul>


                </div>
            </nav>


            <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                <router-view/>
            </main>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'NavigationGauche',
        props: {
            currentUser: {},
            showAdminBoard: {},
            showModeratorBoard: {}
        }
    }
</script>
<style lang="scss" scoped>
    @import "../assets/custom";
    @import "../../node_modules/bootstrap/scss/bootstrap";
    .navGauche {

    }
    body {
        background-color: $background;

        & a {
            font-weight: bold;
            font-size: medium;
            height: 50px;
            margin-right: -15px;
            color: white;
            width: 212px;
        }

    }

    .dropdownWidth textarea {
        width: 90%;
    }


</style>
