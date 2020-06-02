<template>
    <div>
        <Periode/>
    <p>Vos Journées favorites</p>
        <div class="row pl-5 mr-5">
        </div>
        <TreeTable  selectionMode="multiple" :value="favorites" :lazy="true" :paginator="true" :rows="rows" :loading="loading"
                   :totalRecords="totalRecords">
            <Column field="SaisieFavorite_moduleLibelle" header="SaisieFavorite_moduleLibelle" :expander="true"></Column>
            <Column field="SaisieFavorite_commentaire" header="SaisieFavorite_commentaire"></Column>
            <Column field="SaisieFavorite_charges" header="SaisieFavorite_charges"></Column>
        </TreeTable>
    </div>

</template>
<script>
  import { mapState } from 'vuex';
  import Periode from "./Periode";

  export default {
    computed:mapState( {
        journeesFavorites: state=> state.users.journeesFavorites,
        favorites: state=> state.users.favorites,
    }),

    created() {
      this.$store.dispatch('users/getAllFavorites');
    },
      data() {
          return {
              nodes: null,
              rows: 10,
              loading: false,
              totalRecords: 0
          }
      },
          mounted() {

          },
    name: 'InputJourneeFavorites',
      components: {Periode}
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
