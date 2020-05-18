<template>
    <div>
        <div>
            <nav class="navbar navbar-expand-lg navbar-light">
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item m-3">
                            <a class="nav-link">Mes activités</a>
                        </li>
                        <li class="nav-item m-3">
                            <a class="nav-link">Saisir à la place de</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div id="listingActivities" class="card m-3">
            premier bloc
            <div class="card-body">
                <div class="row">

                    <div class="col-md-4 bg-primary">
    test
                    </div>
                    <div class="col-md-8 bg-light">
                        <router-view></router-view>
                    </div>

                </div>
            </div>
        </div>

        <div id="InputActivities" class="card m-3">
            2eme bloc
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
