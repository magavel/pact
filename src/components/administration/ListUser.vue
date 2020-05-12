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
            <Column field="utilisateur_roles" header="Roles" :sortable="true" filterMatchMode="gte">
                <template #body="slotProps">
                        <span v-for="role in slotProps.data.utilisateur_roles">
                            {{role.name}}
                        </span>
                </template></Column>
            <Column field="utilisateur_equipes" header="Equipes" :sortable="true" filterMatchMode="gte"></Column>
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
      }
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

</style>


