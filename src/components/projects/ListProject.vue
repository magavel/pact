<template>
    <div>
        <div class="m-3 text-align">
            <h3>Liste de vos fiches projets</h3>
        </div>
        <DataTable class="p-datatable-responsive p-datatable-projet" ref="dt" :value="projects" :paginator="true"
                   :rows="10" selectionMode="single"
                   dataKey="systeme_information_id"
                   @page="onPage($event)"
                   :lazy="true"
                   :total-records="nombre_de_lignes_totales"
                   :loading="loading"
                   :reorderableColumns="true">
            <template #loading>
                Loading records, please wait...
            </template>
            <Column field="systeme_information_libelle_court" header="Projets" :sortable="true"
                    filterMatchMode="gte"></Column>
            <Column field="systeme_information_nombre_modules" header="Nbre de modules" :sortable="true"
                    filterMatchMode="gte"></Column>
            <Column field="systeme_information_etatDuSi" header="Statut de la fiche" :sortable="true"
                    filterMatchMode="gte">
                <template #body="slotProps">
                    <span :class="'statut-fiche status-' + slotProps.data.systeme_information_etatDuSi">{{slotProps.data.systeme_information_etatDuSi}}</span>
                </template>
            </Column>
            <Column field="systeme_information_niveau_completion" header="Niveau de complétion" :sortable="true"
                    filterMatchMode="gte">
                <template #body="slotProps">
                    <ProgressBar :value="slotProps.data.systeme_information_niveau_completion * 100"
                                 :showValue="false"/>
                </template>
            </Column>
            <Column field="systeme_information_dispo_saisie" header="Saisie des activités" :sortable="true"
                    filterMatchMode="gte">
                <template #body="slotProps">
                    <span v-if="slotProps.data.systeme_information_dispo_saisie">Oui</span>
                    <span v-else>Non</span>
                </template>
            </Column>
            <Column field="systeme_information_created_date" header="Créé le" :sortable="true">
                <template #body="slotProps">
                    {{ slotProps.data.systeme_information_created_date | dateFrancaise()}}
                </template>
            </Column>
            <Column field="systeme_information_last_modified_date" header="Dernière modification" :sortable="true">
                <template #body="slotProps">
                    {{moment(slotProps.data.systeme_information_last_modified_date).fromNow()}}
                    par
                    <a class="bulle">
                        {{ slotProps.data.systeme_information_last_modified_by  }}
                        <span>
              {{ slotProps.data.systeme_information_last_modified_by }}
            </span>
                    </a>
                </template>
            </Column>
            <Column field="" header="Actions">
                <template #body="slotProps">
                    <div class="d-flex flex-nowrap">
                        <Button type="button" icon="pi pi-upload" class="p-button-secondary"
                                @click="upload(slotProps.data.systeme_information_id)"></Button>
                        <Button type="button" icon="pi pi-pencil" class="p-button-secondary"></Button>
                        <Button type="button" icon="pi pi-briefcase" class="p-button-secondary"
                                @click="exportCSV($event)"></Button>
                    </div>
                </template>
            </Column>
            <!--      <template #footer>
                    <span v-if="projects.length ===0 ">Il n'y a pas de projet.</span>
                    <span v-if="projects.length ===1 ">Il y a au totale:  {{projects ? projects.length : 0 }} projet.</span>
                    <span v-if="projects.length >1 ">Il y a au totale:  {{projects ? projects.length : 0 }} projets.</span>
                  </template>-->

        </DataTable>

        <!--        {{ projects }}-->

    </div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        data() {
            return {
                filters: {},
              loading: false,
            }
        },
        name: 'ListProject',
        computed: mapState({
          projects: state => state.projects.projects,
          nombre_de_lignes_totales: state => state.projects.projetsMetaData.nombre_de_lignes_totales,
          nombre_de_pages_totales: state => state.projects.projetsMetaData.nombre_de_pages_totales,
        }),
        created() {
          let pagination = {
            last : 0,
            size : 10,
          }
            this.$store.dispatch('projects/getAllProjects',pagination);
        },
        methods: {
            exportCSV() {
                this.$refs.dt.exportCSV();
            },
            upload(id) {
                // TODO
                console.log('ds upload', id);

            },
          onPage(event) {
            this.loading = true;

            setTimeout(() => {
              console.log('event', event);
              let pagination = {
                last : event.page,
                size : 10,
              }
              this.$store.dispatch('projects/getAllProjects',pagination)
              this.loading = false;
            }, 1000);
          }
        },
    };
</script>

<style lang="scss" scoped>
    // style du bloc
    body .p-component {
        font-size: 12px;
        text-decoration: none;
        font-weight: 500;
        // border: 0 none;
        background-color: white;
    }

    .statut-fiche {
        border-radius: 2px;
        padding: .25em .5em;
        //text-transform: uppercase;
        font-weight: 500;
        font-size: 12px;
        letter-spacing: .2px;

        &.status-Initialisation {
            background-color: #C8E6C9;
            color: #256029;
        }

        &.status-Besoins {
            background-color: #FFCDD2;
            color: #C63737;
        }

        &.status-negotiation {
            background-color: #FEEDAF;
            color: #8A5340;
        }

        &.status-new {
            background-color: #B3E5FC;
            color: #23547B;
        }

        &.status-renewal {
            background-color: #ECCFFF;
            color: #694382;
        }

        &.status-proposal {
            background-color: #FFD8B2;
            color: #805B36;
        }
    }

    .p-multiselect-representative-option {
        display: inline-block;
        vertical-align: middle;

        img {
            vertical-align: middle;
            width: 24px;
        }

        span {
            margin-top: .125em;
        }
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

    /deep/ .p-datatable.p-datatable-projet {
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
        }

        .p-dropdown-label:not(.p-placeholder) {
            text-transform: uppercase;
        }
    }

    /* Responsive */
    .p-datatable-projet .p-datatable-tbody > tr > td .p-column-title {
        display: none;
    }

    a.bulle {
        position: relative;
        color: black;
        text-decoration: none;
        text-align: center;

        & span {
            display: none;
        }

        &:hover {
            background: none;
            z-index: 50;

            & span {
                display: block;
                position: absolute;
                text-align: center;
                color: #00ACAD;
                background: white;
                padding: 5px;
                //border: #62c0f4 solid 1px ;
                border-radius: 10px;
            }
        }
    }


    @media screen and (max-width: 64em) {
        /deep/ .p-datatable {
            &.p-datatable-projet {
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

    p-datatable-header {
        height: 50px;
    }

</style>
