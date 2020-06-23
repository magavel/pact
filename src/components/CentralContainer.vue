<template>
    <div class="container-fluid">
        <div class="row ">
            <nav class=" navGauche col-md-2 d-none d-md-block">
                <div class="">
                    <ul class="nav flex-column">
                        <li class="nav-item ml-n4">
                            <router-link v-if="currentUser" to="/home" class="nav-link">
                                <font-awesome-icon icon="chalkboard"/>
                                Rapport
                            </router-link>
                        </li>
                        <li class="nav-item ml-n4">
                            <router-link v-if="currentUser" to="/activites/myActivities/dailyListing" class="nav-link">
                                <font-awesome-icon icon="pencil-alt"/>
                                saisie
                            </router-link>
                        </li>
                        <li class="nav-item ml-n4">
                            <router-link v-if="currentUser" to="/projects" class="nav-link">
                                <font-awesome-icon icon="pencil-alt"/>
                                Projets
                            </router-link>
                        </li>
                        <li v-if="showAdminBoard" class="nav-item ml-n4">
                            <router-link to="/user" class="nav-link">
                                <font-awesome-icon icon="cogs"/>
                                Administration
                            </router-link>
                        </li>
                        <li v-if="showModeratorBoard" class="nav-item ml-n4">
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
            height: 50px;
            margin-right: -15px;
            color: white;
            width: 149px;
        }

    }

    .dropdownWidth textarea {
        width: 90%;
    }


</style>
