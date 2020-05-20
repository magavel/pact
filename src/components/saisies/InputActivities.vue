<template>
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
                            <router-link :to="{ name: 'weekly', params: { userId: 123 }}">Saisir à la place de
                            </router-link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>

    </div>
</template>
<script>
    export default {
        name: 'InputActivities'
    }
</script>
