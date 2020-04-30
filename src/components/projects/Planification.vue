<template>
    <div>
        Ici la planification
        <form >

            <div v-for="module in systemeInformation.systeme_information_modules">

                <h5>{{ module.module_libelle}}</h5>
                <!-- debut init -->
                <div class="form-row d-flex align-items-end">
                    <div class="form-group col-md-4">
                        <label for="">Niveau de maturité</label>
                        <input class="bg-light" type="text" :placeholder=" module.module_maturite_client " readonly/>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="">Niveau de priorité </label>
                        <input class="bg-light" type="text" :placeholder=" module.module_priorite_pole " readonly/>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="">Date de mise en service souhaitée par le client</label>
                        <input class="bg-light" type="text" :placeholder=" module.module_dateSouhaite " readonly />
                    </div>
                </div>
                <!-- fin init -->
                <!-- phase conception -->

                <h6 class="ml-5">Phase conception</h6>
<!--                <div v-for="phaseProjet in module.module_listPhase" :key="phaseProjet.phase_id" class="form-row">-->
                <div class="pb-5 form-row d-flex align-items-end">
                    <div class="col-md-3">
                        <label for="chargePrevi">Charge prévisionnelle (j/h)</label>
                        <input class="bg-light" id="chargePrevi" type="text" />
                    </div>

                    <div class="col-md-3">
                        <label for="datePrevi">Date prévisionnelle</label>
                        <input class="bg-light" id="datePrevi" type="text" />
                    </div>

                    <div class=" col-md-3">
                        <label for="capacitePreviN">Capacité prévisionnelle (j/h) Année N</label>
                        <input class="bg-light" id="capacitePreviN" type="text" />
                    </div>

                    <div class="col-md-3">
                        <label for="capacitePreviN1">Capacité prévisionnelle (j/h) Année N+1</label>
                        <input class="bg-light" id="capacitePreviN1" type="text" />
                    </div>


                </div>
                <!-- fin conception -->

                <!-- phase mco -->

                <h6 class="ml-5">Phase MCO</h6>
                <!--                <div v-for="phaseProjet in module.module_listPhase" :key="phaseProjet.phase_id" class="form-row">-->
                <div class=" pb-5 form-row d-flex align-items-end">
                    <div class="col-md-3">
                        <label for="chargePrevi">Charge prévisionnelle (j/h)</label>
                        <input class="bg-light" id="chargePrevi" type="text" />
                    </div>

                    <div class="col-md-3">
                        <label for="datePrevi">Date prévisionnelle</label>
                        <input class="bg-light" id="datePrevi" type="text" />
                    </div>

                    <div class=" col-md-3">
                        <label for="capacitePreviN">Capacité prévisionnelle (j/h) Année N</label>
                        <input class="bg-light" id="capacitePreviN" type="text" />
                    </div>

                    <div class="col-md-3">
                        <label for="capacitePreviN1">Capacité prévisionnelle (j/h) Année N+1</label>
                        <input class="bg-light" id="capacitePreviN1" type="text" />
                    </div>


                </div>
                <!-- fin mco -->

            </div>

            <div class="d-flex justify-content-between">
                <button
                        @click.prevent="prevStep"
                        class="btn rounded-pill btn-primary"
                >
                    Revenir à l'étape précedente
                </button>
                <button
                        @click.prevent="validationForm"
                        class="btn rounded-pill btn-primary "
                >
                    Enregistrer et terminer la saisie
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Planification",
        data() {
            return {
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
                            "module_dateSouhaite": "10/12/2020",
                            "module_maturite_client": "M3",
                            "module_priorite_pole": "P2",
                            "module_priorisation_client": null,
                            // TODO ajouter un champs ????
                            module_list_CDAD: [
                                "CDADT",
                                "CDADB"
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
            prevStep() {
                // TODO mettre a jour dans le store le step
                this.$router.push({name: 'equipe'})
            },
            validationForm() {
                // TODO mettre a jour dans le store le step
                this.$router.push('')
            },
        },
    }
</script>

<style scoped>
    .bg-grey {
        background-color: #e6dfdf85;
    }

    .arrondi {
        border-radius: 0 120px 0 120px / 0 50px 0 50px;
    }

</style>
