<template>
    <div class=" row m-5">

        Ici le stepper ==> étape: {{ step }}

                <div class=" mt-4">
                    <ul class="progressBar">
                        <li v-bind:class="{ active: step }">
                            <img src="../assets/logo.png"/>
                            <p>Initialisation</p>
                        </li>
                        <li class="">
                            <img src="../assets/logo.png"/>
                            <p>Besoins</p>
                        </li>
                        <li>
                            <img src="../assets/logo.png"/>
                            <p>Equipes</p>
                        </li>
                        <li>
                            <img src="../assets/logo.png"/>
                            <p>Planification</p>
                        </li>
                    </ul>
                </div>
    </div>
</template>
<script>
    export default {
        name: 'Stepper',
        props: {
            step: {}
        },

    }
</script>
<style scoped>
    .active {
        color: blue;
    }
    .progressBar img {
        width: 60px;
    }
    ul {
        text-align: center;
    }
    ul li{
        display: inline-block;
        width: 150px;
        position: relative;
    }
    ul li::after{
        content: '';
        background: #ccc;
        height: 5px;
        width: 100px;
        display: block;
        position: absolute;
        left: 100px;
        top: 30px

    }


</style>
