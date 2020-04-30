<template>
    <div>
        equipe
        <form >

            <div v-for="module in systemeInformation.systeme_information_modules" :key="module.module_Id">
                <h4>{{ module.module_libelle}}</h4>
                <p> Liste des CDAD</p>
                <span v-for="cdad in module.module_list_CDAD">
                    {{ cdad}},
                </span>

                <div class="fond">
                    {{ module.module_equipe.libelleEquipe}}
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
                            "module_dateSouhaite": null,
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

<style scoped>

    .fond{
        background-color: #cccccc;
    }

</style>
