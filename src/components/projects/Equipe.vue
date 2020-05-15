<template>
    <div>
        <form>


            <div v-for="module in systemeInformation.systeme_information_modules" :key="module.module_Id">
                <h4>Equipe : Module PMV</h4>
                <div class="form-group col-md-12">
                <label for="cdadChoose">
                    CDAD : <font-awesome-icon icon="question-circle" />
                </label>
                          <MultiSelect id="cdadChoose" v-model="module.module_list_CDAD"
                                 :options="cdad"

                                       optionLabel="type"
                                 placeholder="Sélectionner un CDAD"
                                 optionDisabled="true"
                >
                    <template #value="slotProps">
                        <div
                                class="p-multiselect-car-option"
                                v-for="option of slotProps.value"
                                :key="option.value"
                        >
              <span>
                {{ option.value }}
              </span>
                        </div>
                        <div
                                class="p-multiselect-empty-typeProject-token"
                                v-if="!slotProps.value || slotProps.value.length === 0"
                        >
                            Sélectionner un CDAD
                        </div>
                    </template>


                </MultiSelect>
                </div>

                   <!-- <span v-for="cdad in module.module_list_CDAD">
                        <span  class="bg-primary p-2 text-white rounded mx-2" >{{ cdad }}</span>
                    </span> -->
                    <div class="row d-flex justify-content-center">
                        <div class="card text-center bg-gris-module  m-3" style="width: 12rem;">
                            <div class="d-flex justify-content-end pr-1">
                                <button type="button" class="close" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <img src="../../assets/images/tournesol.jpg" class="card-img-top p-1 rounded-circle  mx-auto"
                                 alt="...">
                            <div class="card-body d-flex flex-column justify-content-end">
                                <h5 class="card-title">Lead développeur</h5>
                                <p>Tryphon Tournesol</p>
                                <input class="form-control" value="t.tournesol@rg.fr">

                            </div>
                        </div>
                        <div class="card text-center bg-gris-module  m-3" style="width: 12rem;">
                            <div class="d-flex justify-content-end pr-1">
                                <button type="button" class="close" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <img src="../../assets/images/haddok.jpg" class="card-img-top p-1 rounded-circle  mx-auto"
                                 alt="...">
                            <div class="card-body d-flex flex-column justify-content-end ">
                                <h5 class="card-title">Product Owner</h5>
                                <p>Archibald Haddock</p>
                                <input class="form-control" value="a.haddok@rg.fr">
                            </div>
                        </div>
                        <div class="card text-center bg-gris-module  m-3" style="width: 12rem;">
                            <div class="d-flex justify-content-end pr-1">
                                <button type="button" class="close" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <img src="../../assets/images/tintin.jpg" class="card-img-top p-1 rounded-circle  mx-auto"
                                 alt="...">
                            <div class="card-body d-flex flex-column justify-content-end">
                                <h5 class="card-title">Développeur</h5>
                                <p>Tintin</p>
                                <input class="form-control" value="tintin@rg.fr">
                            </div>
                        </div>
                        <div class="card text-center bg-gris-module  m-3" style="width: 12rem;">
                            <div class="d-flex justify-content-end pr-1">
                                <button type="button" class="close" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>

                            </div>
                            <img src="../../assets/images/nestor.jpg" class="card-img-top p-1 rounded-circle  mx-auto"
                                 alt="...">
                            <div class="card-body d-flex flex-column justify-content-end ">
                                <h5 class="card-title">Scrum Master</h5>
                                <p>Nestor</p>
                                <input class="form-control" value="nestor@rg.fr">

                            </div>
                        </div>


                        <div class="card text-center bg-gris-module  m-3" style="width: 12rem;">
                            <div class="d-flex justify-content-end pr-1">
                                <button type="button" class="close" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>

                            </div>
                            <img src="../../assets/images/bianca-castafiore.png" class="card-img-top p-1 rounded-circle mx-auto"
                                 alt="...">
                            <div class="card-body d-flex flex-column justify-content-end">
                                <h5 class="card-title">Graphiste</h5>
                                <p>Bianca Castafiore</p>
                                <input class="form-control" value="b.castafiore@rg.fr">


                            </div>
                        </div>


                            <div class="bg-gris-module  my-auto addMember rounded-lg position-relative align-middle d-flex flex-column justify-content-center" @click.prevent="addMember">
                                +
                            </div>

                    </div>

            </div>


            <div class="d-flex justify-content-between">

                <button
                        @click.prevent="prevStep"
                        class="btn rounded-pill btn-primary"
                >
                    Revenir à l'étape précedente
                </button>

                <button
                        @click.prevent="nextStep"
                        class="btn rounded-pill btn-primary float-right"
                >
                    Enregistrer et passer à l'étape suivant
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Equipe",
        created() {
            this.majStep()
        },
        computed: {
            step() {
                return this.$store.state.projects.step;
            }
        },
        data() {
            return {
                nbreEquipiers: 0,
              cdad: [
                {type: 'CDAD-T', value: 'CDAD-T'},
                {type: 'CDAD-R', value: 'CDAD-R'},
                {type: 'CDAD-B', value: 'CDAD-B'},
                {type: 'CDAD-BDX', value: 'CDAD-BDX'},
              ],
                roles: [
                    {value: 'leadDeveloppeur', title: 'Lead développeur'},
                    {value: 'deveoppeur', title: 'Développeur'},
                    {value: 'scrumMaster', title: 'Scrum Master'},
                    {value: 'productOwner', title: 'Product owner'},
                    {value: 'respConduiteProjet', title: 'Responsable conduite de projet (RCP)'},
                    {value: 'UxDesigner', title: 'UX designer'},
                ],
                users: [
                    {prenom: 'Paul', nom: 'Lefebvre', email: 'malotru@jj.fr', id: 697665433},
                    {prenom: 'Marina', nom: 'Loiseau', email: 'Rocambole@jj.fr', id: 697665433},
                    {prenom: 'Henri', nom: 'Duflot', email: 'Socrate@jj.fr', id: 697665433},
                ],
                systemeInformation: {
                    "systemeInformation_versionEntity": 0,
                    "systemeInformation_Id": 2,
                    "systeme_information_libelle": "test projet ",
                    "systeme_information_libelle_fiche_siclade": [
                        "SERENA",
                        "SERENA2",
                        "SERENA3",
                        "SERENA4"
                    ],
                    systeme_information_autoriteclient: null,
                    "systeme_information_beneficiaire": [],
                    "version": null,
                    "systeme_information_zoneFonctionnelle": [],
                    "systeme_information_quartierFonctionnel": [],
                    "systeme_information_typeSI": null,
                    "systeme_information_commission": [],
                    "systeme_information_reseauSupport": [],
                    "systeme_information_etatDuSi": "Initialisation",
                    "systeme_information_description": null,
                    "systeme_information_enjeuxSI": null,
                    "systeme_information_modules": [
                        {
                            "module_Id": 2,
                            "module_versionEntity": 1,
                            "module_libelle": " libellé test projet module",
                            "module_libelle_court": "test projet module",
                            "moduleType": "1",
                            "module_Version": null,
                            "module_Etat": null,
                            "module_centreId": null,
                            "module_dateSouhaite": null,
                            "module_maturite_client": "M3",
                            "module_priorite_pole": "P2",
                            "module_priorisation_client": null,
                            // TODO ajouter un champs ????
                            module_list_CDAD: [
                                "CDAD-T",
                                "CDAD-B"
                            ],
                            "module_commentaire_pole": "test projet module\ntest projet module\ntest projet module\n",
                            "module_listPhase": [
                                {
                                    "phase_id": 2,
                                    "active": null,
                                    "listChargeMensuel": [],
                                    "phase_versionEntity": 0,
                                    "phase_libelle": "test projet _V1_Réalisation",
                                    "phase_libelle_court": null,
                                    "phase_type": "Réalisation",
                                    "phase_dateDebutPrevisionnelle": "31::12::9999",
                                    "phase_dateFinPrevisionnelle": "31::12::9999",
                                    "phase_datefinActualise": null,
                                    "phase_dateDebutReelle": null,
                                    "phase_dateFinReelle": null,
                                    "phase_etat": "non_demarre",
                                    "phase_chargeTotalEstimee": null,
                                    "phase_chargeTotalActualisee": null,
                                    "phase_chargeGarantie": null,
                                    "phase_listChargeMensuelle": [],
                                    "phase_commentaire": null,
                                    "phase_module": 2,
                                    "phase_listSaisie": [],
                                    "phase_isActive": null,
                                    "phase_createdDate": "2020-04-29T08:58:50.081",
                                    "phase_last_modified_date": "2020-04-29T08:58:50.081",
                                    "phase_last_modified_by": null,
                                    "phase_created_by": null,
                                    "chemin": "test projet /test projet module/test projet _V1_Réalisation"
                                },
                                {
                                    "phase_id": 3,
                                    "active": null,
                                    "listChargeMensuel": [],
                                    "phase_versionEntity": 0,
                                    "phase_libelle": "test projet _V1_Garantie",
                                    "phase_libelle_court": null,
                                    "phase_type": "Garantie",
                                    "phase_dateDebutPrevisionnelle": "31::12::9999",
                                    "phase_dateFinPrevisionnelle": "31::12::9999",
                                    "phase_datefinActualise": null,
                                    "phase_dateDebutReelle": null,
                                    "phase_dateFinReelle": null,
                                    "phase_etat": "non_demarre",
                                    "phase_chargeTotalEstimee": null,
                                    "phase_chargeTotalActualisee": null,
                                    "phase_chargeGarantie": null,
                                    "phase_listChargeMensuelle": [],
                                    "phase_commentaire": null,
                                    "phase_module": 2,
                                    "phase_listSaisie": [],
                                    "phase_isActive": null,
                                    "phase_createdDate": "2020-04-29T08:58:50.163",
                                    "phase_last_modified_date": "2020-04-29T08:58:50.163",
                                    "phase_last_modified_by": null,
                                    "phase_created_by": null,
                                    "chemin": "test projet /test projet module/test projet _V1_Garantie"
                                },
                                {
                                    "phase_id": 4,
                                    "active": null,
                                    "listChargeMensuel": [],
                                    "phase_versionEntity": 0,
                                    "phase_libelle": "test projet _V1_MCO",
                                    "phase_libelle_court": null,
                                    "phase_type": "MCO",
                                    "phase_dateDebutPrevisionnelle": "31::12::9999",
                                    "phase_dateFinPrevisionnelle": "31::12::9999",
                                    "phase_datefinActualise": null,
                                    "phase_dateDebutReelle": null,
                                    "phase_dateFinReelle": null,
                                    "phase_etat": "non_demarre",
                                    "phase_chargeTotalEstimee": null,
                                    "phase_chargeTotalActualisee": null,
                                    "phase_chargeGarantie": null,
                                    "phase_listChargeMensuelle": [],
                                    "phase_commentaire": null,
                                    "phase_module": 2,
                                    "phase_listSaisie": [],
                                    "phase_isActive": null,
                                    "phase_createdDate": "2020-04-29T08:58:50.214",
                                    "phase_last_modified_date": "2020-04-29T08:58:50.214",
                                    "phase_last_modified_by": null,
                                    "phase_created_by": null,
                                    "chemin": "test projet /test projet module/test projet _V1_MCO"
                                }
                            ],
                            "module_unSystemeInformation": 2,
                            "module_equipe": {
                                "equipeId": 2,
                                "libelleEquipe": "test projet module",
                                "listModule": [
                                    2
                                ],
                                "listUtilisateur": []
                            },
                            "module_FicheDeclic": [
                                "SERENA"
                            ]
                        }
                    ],
                    "systeme_information_listCentreId": [],
                    "systeme_information_libelle_court": "test projet ",
                    "systeme_information_tag_projet": [
                        "PMV",
                        "Fab Num",
                        "POC",
                        "Interne"
                    ],
                    "systeme_information_created_by": null,
                    "systeme_information_created_date": "2020-04-29T08:58:49.918",
                    "systeme_information_last_modified_by": null,
                    "systeme_information_last_modified_date": "2020-04-29T08:58:49.918"
                }
            }
        },
        methods: {
            majStep(){
                this.$store.commit('projects/UPDATE_STEP', 3)
            },
            addMember() {
                this.nbreEquipiers++;
            },
            nextStep() {
                // TODO mettre a jour dans le store le step
                this.$router.push({name: 'planification'})
            },
            prevStep() {
                // TODO mettre a jour dans le store le step
                this.$router.push({name: 'besoins'})
            },

        },
    }
</script>

<style lang="scss" scoped>

    .addMember {
        width: 80px;
        height: 70px;
        line-height: 70px;
        cursor: pointer;
        text-align: center;
        font-size: 50px;
        color: #535353;
    }

    .card {
        & img {
           width: 70px;
           height: 70px;
        }
    }

    .p-multiselect-car-option {
        display: inline-block;
        vertical-align: middle;

        img {
            vertical-align: middle;
            margin-right: .5em;
            width: 24px;
        }

        span {
            margin-top: .125em;
        }
    }

    .p-multiselect-car-token,
    .p-multiselect-empty-car-token {
        padding: 2px 4px;
        margin: 0 0.286em 0 0;
        display: inline-block;
        vertical-align: middle;
        height: 1.857em;
        border-radius: 3px;
    }


</style>
