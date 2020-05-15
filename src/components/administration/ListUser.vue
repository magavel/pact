<template>
    <div>
        <DataTable ref="dt" :value="users" :paginator="true"
                   :rows="10" selectionMode="single"
                   dataKey="systeme_information_id" :reorderableColumns="true"
                   :resizableColumns="true" columnResizeMode="fit | expand" >
            <template #loading>
                Loading records, please wait...
            </template>
            <template #header>
                Liste des utilisateurs
            </template>
            <Column field="utilisateur_id" header="ID" :sortable="true" filterMatchMode="gte"></Column>
            <Column field="utilisateur_username" header="username" :sortable="true" filterMatchMode="gte"></Column>
            <Column field="utilisateur_email" header="Email" :sortable="true" filterMatchMode="gte"> </Column>
            <Column field="utilisateur_actif" header="Active" :sortable="true" filterMatchMode="gte">
             <template #body="slotProps">
                 <div class="d-flex justify-content-center">
                <Inputswitch v-model="slotProps.data.utilisateur_actif"
                              href @click.prevent="activation(slotProps)" />
                 </div>
                </template>

            </Column>
            <Column field="utilisateur_roles" header="Roles" :sortable="true" filterMatchMode="gte">
                <template #body="slotProps">
                  <span v-for="role in slotProps.data.utilisateur_roles">
                            {{role}}
                        </span>
                </template>
              </Column>
            <Column field="utilisateur_equipes" header="Equipes" :sortable="true" filterMatchMode="gte">
                <template #body="slotProps">
                        <span v-for="equipe in slotProps.data.utilisateur_equipes">
                            {{equipe}}
                        </span>
                </template>
            </Column>
            <Column field="utilisateur_created_date" header="Créé le" :sortable="true" >

                <template #body="slotProps">
                    {{moment(slotProps.data.utilisateur_created_date).format('DD/MM/YYYY')}}
                </template>
            </Column>
            <Column field="utilisateur_last_modified_date" header="Dernière modification">
                <template #body="slotProps">
                    le {{moment(slotProps.data.utilisateur_last_modified_date).format('DD/MM/YYYY')}} par {{ slotProps.data.utilisateur_last_modified_by}}
                </template>
            </Column>
            <Column field="" header="Actions">
                <template #body="slotProps">
                    <div class="d-flex flex-nowrap">
                        <Button type="button" icon="pi pi-upload" class="p-button-secondary" @click="upload(slotProps.data.systeme_information_id)"></Button>
                        <Button type="button" icon="pi pi-pencil" class="p-button-secondary"></Button>
                        <Button type="button" icon="pi pi-briefcase" class="p-button-secondary" @click="exportCSV($event)" ></Button>
                    </div>
                </template>
            </Column>
        </DataTable>

        <!--        {{ projects }}-->


        <a href="#" class="float">
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
        this.$store.dispatch('users/updateUser', this.users[props.index]);

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

    /deep/ .p-paginator {
        .p-dropdown {
            float: left;
        }

        .p-paginator-current {
            float: right;
        }
    }

    /deep/ .p-progressbar {
        height: 8px;
        background-color: #D8DADC;

        .p-progressbar-value {
            background-color: #00ACAD;
        }
    }

    /deep/ .p-column-filter {
        display: block;

        input {
            width: 100%;
        }
    }

    .p-datatable-globalfilter-container {
        float: right;

        input {
            width: 200px;
        }
    }

    /deep/ .p-datepicker {
        min-width: 25em;

        td {
            font-weight: 400;
        }
    }

    /deep/ .p-datatable.p-datatable-customers {
        .p-datatable-header {
            border: 0 none;
            padding: 12px;
            text-align: left;
            font-size: 10px;
        }

        .p-paginator {
            border: 0 none;
            padding: 1em;
        }

        .p-datatable-thead > tr > th {
            border: 0 none;
            text-align: left;

            &.p-filter-column {
                border-top: 1px solid #c8c8c8;
            }
        }
        p-column-title {
            font-size: 10px;
        }

        .p-datatable-tbody > tr > td {
            border: 0 none;
            cursor: auto;
            align-items: center;
        }

        .p-dropdown-label:not(.p-placeholder) {
            text-transform: uppercase;
        }
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

                    .p-column-title {
                        padding: .4em;
                        min-width: 30%;
                        display: inline-block;
                        margin: -.4em 1em -.4em -.4em;
                        font-weight: bold;
                    }
                }
            }
        }
    }
    p-datatable-header{
        height: 50px;
    }

    .label-container{
        position:fixed;
        bottom:48px;
        right:105px;
        display:table;
        visibility: hidden;
    }

    .label-text{
        color:#FFF;
        background:rgba(51,51,51,0.5);
        display:table-cell;
        vertical-align:middle;
        padding:10px;
        border-radius:3px;
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


