<template>
    <div>
        <div>
            <nav class="navbar navbar-expand-sm navbar-light">
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item m-3">
                            <router-link :to="{ name: 'weekly', params: { userId: 123 }}">Mes activités</router-link>
                        </li>
                        <li class="nav-item m-3">
                            <router-link :to="{ name: 'weekly', params: { userId: 123 }}">Saisir à la place de</router-link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div id="listingActivities" class="shadow-sm card m-3">
            premier bloc
            <div class="card-body">
                <div class="row">

                    <div class="col-md-3 bg-primary">
                        calendrier
                    </div>
                    <div class="col-md-9 bg-light">
                        <router-view></router-view>
                    </div>

                </div>
            </div>
        </div>

        <div id="InputActivities" class="shadow-sm card m-3">
            2eme bloc
            <div class="card-body">
                <nav class="navbar navbar-expand-lg navbar-light">
                    <div class="collapse navbar-collapse" id="navbarNavSaisie">
                        <ul class="navbar-nav">
                            <li class="nav-item m-3">
                                <router-link :to="{ name: 'weekly', params: { userId: 123 }}">Mes activités</router-link>
                            </li>
                            <li class="nav-item m-3">
                                <router-link :to="{ name: 'weekly', params: { userId: 123 }}">Saisir à la place de</router-link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <router-view></router-view>
        </div>

    </div>
</template>

<script>
    export default {
        name: "BoardActivities"
    }
</script>

<style lang="scss" scoped>

</style>
