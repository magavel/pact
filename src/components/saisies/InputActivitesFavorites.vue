<template>
    <div>
        <div id="periode" class="ml-n3">
                            <span class="mr-2 ml-1">
                                <img src="../../assets/event-24px.svg">
                            </span>
            <Calendar v-model="date2" :locale="fr" dateFormat="dd/mm/yy"/>
            <span class="ml-3 mr-3"> au </span>
            <Calendar :locale="fr" dateFormat="dd/mm/yy"/>
        </div>
    <p>Vos activites</p>
        <div class="row pl-5 mr-5">
    <DataTable v-model="favorites"
               class="p-datatable-responsive p-datatable-customers"
               :rows="4">
        <template #empty>
            Aucune Activités trouvées.
        </template>
        <template #loading>
            Chargement des données en cours.
        </template>
        <Column field="name"
                header="Missions/ Modules">
            <template #body="slotProps">
                <div :class="slotProps.data.SaisieFavorite_moduleLibelle" class="pl-3">
                    {{ slotProps.data.SaisieFavorite_moduleLibelle}}
                </div>
            </template>
        </Column>
        <Column field="activite"
                header="Type d'activités">
            <template #body="slotProps">
                <div :class="slotProps.data.SaisieFavorite_activite_libelle" class="pl-3">
                    {{ slotProps.data.SaisieFavorite_activite_libelle}}
                </div>
            </template>

        </Column>
        <Column field="commentaire"
                header="Commentaires">
            <template #body="slotProps">
                <div :class="slotProps.data.SaisieFavorite_commentaire" class="pl-3">
                    {{ slotProps.data.SaisieFavorite_commentaire}}
                </div>
            </template>
        </Column>
        <Column field="charges"
                header="Charges (h:m)" body-class="pl-4">
            <template #body="slotProps">
                <div :class="slotProps.data.SaisieFavorite_charges" class="pl-3">
                    {{ slotProps.data.SaisieFavorite_charges}}
                </div>
            </template>
        </Column>
        <Column header="Actions">
            <template #body>
                <Button type="button" icon="pi pi-plus" class="p-button-secondary"></Button>
                <Button type="button" icon="pi pi-times" class="p-button-secondary"></Button>
            </template>
        </Column>
    </DataTable>
        </div>
        <div class="row">
        </div>
    </div>
</template>
<script>
  import { mapState } from 'vuex';
  export default {
    computed:mapState( {
      favorites: state=> state.users.favorites,
      loading: false,
    }),
    created() {
      this.$store.dispatch('users/getAllFavorites');
    },
    name: 'InputActivitesFavorites',
  }

    </script>

<style lang="scss" scoped>
    #periode {
        background-color: #ffca7a;
        height: 70px;
        padding: 5px;
        width: 368px;
        border-radius: 0px 30px 30px 0px;
        &::before{
            content:"\A";
            border-style: solid;
            border-width: 10px 15px 10px 0;
            border-color: transparent #FFCA7A transparent transparent;
            position: relative;
            left: -5px;
            top: -29px;
        }
    }

    /deep/ .p-datatable.p-datatable-customers {
        .p-datatable-header {
            border: 0 none;
            padding: 12px;
            text-align: left;
            font-size: 10px;
        }

        .p-datatable-thead{
            background-color: #E6DFDF85;
            border-radius: 10px;
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
        }

        .p-dropdown-label:not(.p-placeholder) {
            text-transform: uppercase;
        }
    }

    .testBg1{
        background-color: #069F90;
        border-radius: 8px;
        color: white;
    }

    .testBg2{
        background-color: #AA2393;
        border-radius: 8px;
        color: white;
    }
    .testBg3{
        background-color: #4028A7;
        border-radius: 8px;
        color: white;
    }


    </style>
