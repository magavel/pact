<template>
    <nav class="navbar  navbar-expand-lg navbar-dark sticky-top flex-md-nowrap p-0">
        <div v-if="!currentUser" class="navbar-nav ml-auto">
            <ul class="navbar-nav px-3 ">
                <li class="nav-item text-primary">
                    <router-link to="/login" class="nav-link">
                        <font-awesome-icon icon="sign-in-alt"/>
                        Connexion
                    </router-link>
                </li>
            </ul>
        </div>
        <div v-if="currentUser" class="navbar-nav ml-auto">
            <ul class="navbar-nav px-3">
                <li class="nav-item">
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <font-awesome-icon icon="user"/>
                            {{ currentUser.username }} ({{ currentUser.username | getTrigramme }})
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">

                            <router-link to="/profile" class="dropdown-item">
                                <font-awesome-icon icon="user"/>
                                Profile
                            </router-link>
                            <router-link to="/updatePassword" class="dropdown-item">
                                <!--<font-awesome-icon icon="user"/>-->
                                <span class="ml-3"><img alt='' class="ml-n3" style="height: 18px; width: 14px" src="../assets/icons/ic_vpn_key_24px.svg"></span>
                                Changer son mot de passe
                            </router-link>

                            <a class="dropdown-item" href @click.prevent="logOut">
                                <font-awesome-icon icon="sign-out-alt"/>
                                Deconnexion
                            </a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</template>
<script>
    export default {
        name: 'Navigation',
        props: {
            currentUser: {},
            logOut: {}
        }
    }
</script>
<style lang="scss">
    @import "../assets/custom";
    @import "../../node_modules/bootstrap/scss/bootstrap";

    body {
        background-color: $background;

        & a {
            font-weight: bold;
            height: 50px;
            margin-right: -15px;
            color: white;

            &:hover {
                color: $secondary;
            }
        }

    }

    .dropdown div {
        left: -150px;
    }

    .dropdownWidth textarea {
        width: 90%;
    }


</style>
