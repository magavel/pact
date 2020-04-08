export default class Module {
  constructor(moduleId,
    versionEntity,
    moduleLibelle,
    moduleType,
    moduleVersion,
    moduleEtat,
    centre,
    dateMiseEnServiceSouhaite,
    niveauMaturite,
    niveauPriorite,
    commentaire,
    listPhase,
    unSystemeInformation,
    uneEquipe) {
    /**
     * identifiant du module.
     * @type {null}
     */
    this.moduleId = moduleId;
    /**
     *
     * version de l'entité.
     */
    this.versionEntity = versionEntity;

    /**
     * Libelle du sous système.
     */
    this.moduleLibelle = moduleLibelle;
    /**
     * type de module (Infocentre, projet, module...).
     */
    this.moduleType = moduleType;

    /**
     * Version du module.
     */
    this.moduleVersion = moduleVersion;

    /**
     * Etat du module.
     */
    this.moduleEtat = moduleEtat;

    /**
     * Centre qui develope le module.
     */
    this.centre = centre;

    /**
     * Date de mise en service souhaité du module.
     */
    this.dateMiseEnServiceSouhaite = dateMiseEnServiceSouhaite;
    /**
     * niveau de maturité de la ligne de activité.
     *
     * */
    this.niveauMaturite = niveauMaturite;

    /**
     * niveau de priorité de la ligne de activité.
     */
    this.niveauPriorite = niveauPriorite;

    /**
     * Commentaire sur le module.
     */
    this.commentaire = commentaire;

    /**
     * Liste des phases rattachées à un module.
     */
    this.listPhase = listPhase;

    /**
     * fiche projet de rattachement du modules.
     */
    this.unSystemeInformation = unSystemeInformation;
    /**
     * Equipe en charge du module.
     */
    this.uneEquipe = uneEquipe;
  }
}
