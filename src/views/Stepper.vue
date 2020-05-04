<template>
    <div class="d-flex justify-content-center row m-5">
        <div class="  mt-4">
            <ul class="progressBar">
                <li>
                    <img src="../assets/icons/initialisation.svg"/>
                    <p>Initialisation</p>
                </li>
                <li class="">
                    <img src="../assets/icons/besoins.svg"/>
                    <p>Besoins</p>
                </li>
                <li>
                    <img src="../assets/icons/equipes.svg"/>
                    <p>Equipes</p>
                </li>
                <li>
                    <img src="../assets/icons/planification.svg"/>
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
            steps: ''
        },

    }
</script>
<style lang="scss" scoped>
    // longuer trait
    $longueurTrait: 70px;

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
        height: 2px;
        width: $longueurTrait;
        display: block;
        position: absolute;
        left: 115px;
        top: 30px

    }

    ul li:last-child::after{
        content: '';
        background: #ccc;
        height: 2px;
        width: $longueurTrait;
        display: block;
        position: absolute;
        left: 115px;
        top: 39px

    }
    ul li:first-child::before{
        content: '';
        background: #ccc;
        height: 2px;
        width: $longueurTrait;
        display: block;
        position: absolute;
        right:100px;
        top: 30px
    }


</style>
