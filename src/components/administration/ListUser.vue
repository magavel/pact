<template>
    <div>
        <DataTable :value="users" :paginator="true" class="p-datatable-responsive p-datatable-customers" :rows="10"
                   dataKey="utilisateur_id" :rowHover="true" :selection.sync="selectedUser" :filters="filters" :loading="loading"
                   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[10,25,50]"
                   :lazy="true">

        <template #header>
            <div class="table-header">
                Liste des utilisateurs
                <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global']" placeholder="Global Search" />
                    </span>
            </div>
        </template>
        <template #empty>
           Pas d'utilisateurs trouvés
        </template>
        <template #loading>
            chargement des utilisateurs.
        </template>
            <Column  selectionMode="multiple" headerStyle="width: 3em"></Column>
            <Column field="utilisateur_prenom" header="Prenom" :sortable="true" filterMatchMode="contains">
                <template #body="slotProps">
                    <span class="p-column-title">Prenom</span>
                    {{slotProps.data.utilisateur_prenom}}
                </template>
                <template #filter>
                    <InputText type="text" v-model="filters['utilisateur_prenom']" class="p-column-filter" placeholder="Recherche par prenom"/>
                </template>
            </Column>
            <Column field="utilisateur_nom" header="Nom" :sortable="true" filterMatchMode="contains">
                <template #body="slotProps">
                    <span class="p-column-title">Nom</span>
                    {{slotProps.data.utilisateur_nom}}
                </template>
                <template #filter>
                    <InputText type="text" v-model="filters['utilisateur_nom']" class="p-column-filter" placeholder="Recherche par nom"/>
                </template>
            </Column>
            <Column field="utilisateur_email" header="Email" :sortable="true" filterMatchMode="contains">
                <template #body="slotProps">
                    <span class="p-column-title">Email</span>
                    {{slotProps.data.utilisateur_email}}
                </template>
                <template #filter>
                    <InputText type="text" v-model="filters['utilisateur_email']" class="p-column-filter" placeholder="Recherche par nom"/>
                </template>
            </Column>
            <Column field="utilisateur_roles" header="Roles" :sortable="true" filterMatchMode="contains">
                <template #body="slotProps">
                    <span class="p-column-title">Roles</span>
                    <span v-for="role in slotProps.data.utilisateur_roles">
                            {{role}}
                        </span>
                </template>
                <template #filter>
                    <InputText type="text" v-model="filters['utilisateur_roles']" class="p-column-filter" placeholder="Recherche par nom"/>
                </template>
            </Column>
            <Column field="utilisateur_equipes" header="Equipes" :sortable="true" filterMatchMode="contains">
                <template #body="slotProps">
                    <span class="p-column-title">Equipes</span>
                    <span v-for="role in slotProps.data.utilisateur_equipes">
                            {{role}}
                        </span>
                </template>
                <template #filter>
                    <InputText type="text" v-model="filters['utilisateur_equipes']" class="p-column-filter" placeholder="Recherche par nom"/>
                </template>
            </Column>
            <Column field="utilisateur_last_modified_date" header="Date de modification" :sortable="true" filterMatchMode="contains">
                <template #body="slotProps">
                    <span class="p-column-title">Email</span>
                    le {{moment(slotProps.data.utilisateur_last_modified_date).format('DD/MM/YYYY')}} par {{ slotProps.data.utilisateur_last_modified_by}}
                </template>
                <template #filter>
                    <InputText type="text" v-model="filters['utilisateur_last_modified_date']" class="p-column-filter" placeholder="date de modification"/>
                </template>
            </Column>
            <Column field="" header="Actions">
                <template #body="slotProps">
                    <div class="d-flex flex-nowrap">
                        <Button type="button" icon="pi pi-upload" class="p-button-secondary" @click="upload(slotProps.data.utilisateur_id)"></Button>

                        <Button type="button" icon="pi pi-briefcase" class="p-button-secondary" @click="exportCSV($event)" ></Button>
                        <div v-if="slotProps.data.utilisateur_actif">
                            <Button type="button" icon="pi pi-unlock" class="p-button-secondary" @click="activation(slotProps)"></Button>
                        </div>
                        <div v-else>
                            <Button type="button" icon="pi pi-lock" class="p-button-secondary" @click="activation(slotProps)"></Button>
                        </div>
                    </div>
                </template>
            </Column>
        </DataTable>

        <!--        {{ projects }}-->

        <a ref="plus" class="float"  to="#CreateUser" @click="scrollMeTo('CreateUser')">
                     <font-awesome-icon icon="plus" class="my-float"/>
        </a>


        <div class="label-container">
            <div class="label-text">Ajouter un utilisateur</div>

        </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    computed:mapState( {
      users: state=> state.users.users,
      loading: false,
    }),
    created() {
      this.$store.dispatch('users/getAllUsers');
    },
    data() {
      return {
          selectedUser: null,
          filters: {},
        checked: true,
        roles: [
          { type: "ROLE_USER", value: "ROLE_USER" },
          { type: "ROLE_PILOTE", value: "ROLE_USER" },
          { type: "ROLE_ADMIN", value: "ROLE_ADMIN" },
        ],
      }
    },
    methods: {
      activation(props) {
        this.users[props.index].utilisateur_actif = !this.users[props.index].utilisateur_actif;
        this.$store.dispatch('users/updateUser', this.users[props.index]);

      },
      scrollMeTo(refName) {
        var element = this.$parent.$refs[refName];
        var top = element.offsetTop;
        this.$refs["plus"].style.display = "none";
        window.scrollTo(0, top);
      },
    },
    name: 'ListUser'
  }
  </script>

<style lang="scss" scoped>
    // style du bloc
    body .p-component {
        font-size: 12px;
        text-decoration: none;
        font-weight: 500;
    }

    .table-header {
        display: flex;
        justify-content: space-between;
    }

    /deep/ .p-datatable.p-datatable-customers {
        .p-datatable-header {
            padding: 1rem;
            text-align: left;
            font-size: 1.5rem;
        }
    }


    /deep/ .p-column-filter {
        width: 100%;
    }

    /* Responsive */
    .p-datatable-customers .p-datatable-tbody > tr > td .p-column-title {
        display: none;
    }

    @media screen and (max-width: 64em) {
        /deep/ .p-datatable {
            &.p-datatable-customers {
                .p-datatable-thead > tr > th,
                .p-datatable-tfoot > tr > td {
                    display: none !important;
                }

                .p-datatable-tbody > tr > td {
                    text-align: left;
                    display: block;
                    border: 0 none !important;
                    width: 100% !important;
                    float: left;
                    clear: left;
                    border: 0 none;

                    .p-column-title {
                        padding: .4rem;
                        min-width: 30%;
                        display: inline-block;
                        margin: -.4rem 1rem -.4rem -.4rem;
                        font-weight: bold;
                    }
                }
            }
        }
    }


    .float{
        position:fixed;
        width:60px;
        height:60px;
        bottom:40px;
        right:40px;
        background-color:#0C9;
        color:#FFF;
        border-radius:50px;
        text-align:center;
        box-shadow: 2px 2px 3px #999;
    }

    .my-float{
        margin-top:22px;
    }
    a.float + div.label-container {
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.5s ease;
    }

    a.float:hover + div.label-container{
        visibility: visible;
        opacity: 1;
    }


</style>


