<template>
    <div ref="CreateUser">
        <div class="card">
            <div class="card-title">Création d'un utilisateur</div>
            <form class="grid"  @submit.prevent="createUser" >
                             <div class="form-group">
                    <label  for="lastname">Nom</label>
                    <input v-model="lastname" type="text" id="lastname" name="lastname" class="form-control">
                </div>
                <div class="form-group">
                    <label  for="firstname">Prénom</label>
                    <input v-model="firstname" type="text" id="firstname" name="firstname" class="form-control">
                </div>
                <div class="form-group">
                    <label for="email">email</label>
                    <input v-model="email" type="text" id="email" name="email" class="form-control">
                </div>
                <div class="form-group">
                    <label for="password">Mot de passe</label>
                    <input v-model="password" type="text" id="password" name="password" class="form-control">
                </div>
                <div class="form-group">
                    <label for="roles">Roles</label>
                    <MultiSelect name="roles" v-model="selectedRole" :options="roles" optionLabel="type" placeholder="Selection les rôles" />
                </div>
                <div class="form-group">
                    <label for="equipes">Equipes</label>
                    <MultiSelect name="equipes" v-model="selectedEquipe" :options="equipes" optionLabel="equipe_libelleEquipe" placeholder="Selection les equipes" />
                </div>
                <div class="form-group" v-if="errors_form.length">
                    <strong>Corriger les erreurs suivantes:</strong>
                    <ul>
                        <li v-for="error in errors_form">{{ error }}</li>
                    </ul>
                </div>
                <div class="full flex flex-end">
                    <button class="btn btn-primary"  @click.prevent="createUser">Enregistrer l'utilisateur</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex';
  import UserExtended from '../../models/userExtended';
  export default {
    computed:mapState( {
      users: state=> state.users.users,
        equipes: state=> state.equipes.equipes,
        loading: false,
    }),
    created() {
      this.$store.dispatch('users/getAllUsers');
      this.$store.dispatch('equipes/getAllEquipes');
    },
    data() {
      return {
        errors_form: [],
        filters: {},
        lastname: null,
        firstname: null,
        email:null,
        password:null,
        checked: true,
          selectedRole: null,
        roles: [
          { type: "ROLE_USER", value: "ROLE_USER" },
          { type: "ROLE_PILOTE", value: "ROLE_PILOTE" },
          { type: "ROLE_ADMIN", value: "ROLE_ADMIN" },
        ],
          selectedEquipe:null,
      }
    },
    methods: {
      activation(props) {
        this.users[props.index].utilisateur_actif = !this.users[props.index].utilisateur_actif;
        this.$store.dispatch('users/updateUser', this.users[props.index]);

      },
      checkForm: function (e) {
        if (this.lastname && this.firstname) {
          return true;
        }

        this.errors_form = [];

        if (!this.lastname) {
          this.errors_form.push('Nom requis');
        }
        if (!this.firstname) {
          this.errors_form.push('Prenom requis');
        }

        e.preventDefault();
      },
      createUser: function(e) {
        if (this.checkForm(e)) {
          this.errors_form = [];
          let unUser = new UserExtended(this.email.split('@')[0],this.email,this.password);
          unUser.utilisateur_nom = this.lastname;
          unUser.utilisateur_prenom = this.firstname;
            this.selectedRole.forEach(function(y)
                {
                    unUser.utilisateur_roles.push(y.value)
                }
            );
            this.selectedEquipe.forEach((x) => {
                unUser.utilisateur_equipes.push(x.equipe_libelleEquipe)
            })

          this.$store.dispatch('users/createUser', unUser);
          this.$toast.add({severity:'success', summary: 'Success Message', detail:'Utilisateur crée', life: 3000});


        }
      }
    },
    name: 'CreateUser'
  }
  </script>

<style lang="scss" scoped>
    // style du bloc
    body .p-component {
        font-size: 12px;
        text-decoration: none;
        font-weight: 500;
    }

    .card {
        border-radius: 4px;
        width: 1028px;
        max-width: calc(100% - 20px);
        margin-left: auto;
        margin-right: auto;
        padding: 40px;
        background-color: #FFF;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    }

    .card-title {
        font-size: 24px;
        font-weight: bold;
        color: #000;
        padding-bottom: 8px;
        border-bottom: 1px solid #D7DBDF;
        margin-bottom: 30px;
    }

    /**
     * Flex
     */
    .flex {
        display: flex;
    }
    .flex > * + * {
        margin-left: 8px;
    }
    .flex-end {
        justify-content: flex-end;
    }

    /**
     * Grille
     */
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(297px, 1fr));
        grid-gap: 24px;
        align-items: stretch;
    }

    @media only screen and (max-width: 600px) {
        .grid {
            grid-template-columns: 1fr;
        }
        .card {
            padding: 24px;
        }
    }

    .grid .full {
        grid-column:1 / -1;
    }

    .grid .form-group-textarea {
        grid-row-end: span 2;
        height: 100%;
        align-content: stretch;
    }

    .grid .btn-primary {
        justify-self: flex-end;
        grid-column-end: -1;
    }

    /**
     * Style générique des formulaires
     */
    .form-group {
        display: grid;
        grid-template-columns: 1fr;
        align-content: flex-start;
        grid-template-rows: min-content;
        grid-gap: 8px;
    }

    .form-control {
        display: block;
        width: 100%;
        border: 1px solid #D2D6DB;
        border-radius: 6px;
        font-size: 16px;
        padding: 14px 10px;
    }

    .form-check {
        cursor: pointer;
        display: flex;
        align-items: center;
    }

    .form-check-label {
        cursor: pointer;
    }

    .form-check-input {
        margin-right: 8px;
    }

    .btn {
        border: none;
        color: #FFF;
        font-weight: 500;
        padding: 15px 25px;
        border-radius: 6px;
        font-size: 16px;
        cursor: pointer;
    }

    .form-checkboxes {
        display: flex;
        flex-direction: column;
        margin-left: -16px;
        margin-top: -16px;
    }

    .form-checkboxes > * {
        margin-top: 16px;
        margin-left: 16px;
    }

    @media only screen and (min-width: 760px) {
        .form-checkboxes {
            flex-direction: row;
        }
    }


</style>


