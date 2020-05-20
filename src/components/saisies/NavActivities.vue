<template>
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
</template>
<script>
    export default {
        name: 'NavActivities'
    }
</script>