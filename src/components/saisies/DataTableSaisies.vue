<template>
    <div class="row mt-3 mr-auto">
        <DataTable v-model="saisies"
                   class="p-datatable-responsive p-datatable-customers"
                   :rows="4"
                   dataKey="saisie_Id" :rowHover="true" :selection.sync="selectedSaisies">
            <template #empty>
                Aucune Activités trouvées.
            </template>
            <template #loading>
                Chargement des données en cours.
            </template>
            <Column  selectionMode="multiple" headerStyle="width: 3em"></Column>
            <Column field="name" header="Missions" :sortable="true" filterMatchMode="contains">
                <template #body="slotProps">
                    <span class="p-column-title">Missions/ Modules</span>
                    {{ slotProps.data.name}}
                </template>
            </Column>
            <Column field="activite" header="activite" :sortable="true" filterMatchMode="contains">
                <template #body="slotProps">
                    <span class="p-column-title">Type d'activités</span>
                    {{ slotProps.data.activite}}
                </template>
            </Column>
            <Column field="commentaire" header="commentaire" :sortable="true" filterMatchMode="contains">
                <template #body="slotProps">
                    <span class="p-column-title">Commentaire</span>
                    {{ slotProps.data.commentaire}}
                </template>
            </Column>
            <Column field="charges" header="charges" :sortable="true" filterMatchMode="contains">
                <template #body="slotProps">
                    <span class="p-column-title">Charges (h:m)</span>
                    {{ slotProps.data.charges}}
                </template>
            </Column>
            <Column header="Actions">
                <template #body>
                    <Button type="button" icon="pi pi-times" class="p-button-secondary"></Button>
                    <Button type="button" icon="pi pi-star-o" class="p-button-secondary"></Button>
                    <Button type="button" icon="pi pi-pencil" class="p-button-secondary"></Button>
                </template>
            </Column>
        </DataTable>
    </div>
</template>
<script>
    import SaisieService from "../../services/saisie.service";

    export default {
        name: 'DataTableSaisies',
        data() {
            return {
                selectedSaisies: null,
                saisies: this.$store.state.saisies.saisies,
            }
        },
        computed: {
           /* saisies(){
                return this.$store.state.saisies.saisies;
            },*/
            dateSelectionee(){
                return this.$store.state.saisies.dateSelectionee;
            }
        },
        created() {
            /*SaisieService.getSaisie('2020-03-18T08:00:08.566Z', '2020-03-18T08:00:08.566Z').then(
                (response) => {
                    console.log(response.data);
                    const donnees = response.data.data;
                    console.log("donnees : " + donnees);
                    donnees.forEach((s)=> console.log(s));
                    for(let saisie of donnees){
                        let dateSaisie = saisie.saisie_date.split("::");
                        let newSaisie = {
                            name: saisie.saisie_Id,
                            activite: saisie.activite_Id,
                            commentaire: saisie.saisie_commentaire,
                            charges: saisie.saisie_charge+":00",
                            date: dateSaisie[0]+"/"+parseInt(dateSaisie[1])+"/"+dateSaisie[2]
                        };
                        this.missions.push(newSaisie);
                    }
                    this.missions.forEach((m) => console.log("mission : " + m.date));
                }
            );*/
            this.$store.dispatch('saisies/getSaisies', ['2020-03-18T08:00:08.566Z', '2020-03-18T08:00:08.566Z']);
            console.log("saisies : " +this.$store.state.saisies);
        }
    }
</script>

<style lang="scss" scoped>
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
