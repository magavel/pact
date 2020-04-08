export default class SystemeInformation {
  constructor(id,
    libelle,
    libelleSiclade,
    autoriteClient,
    zoneFonctionnelle,
    quartierFonctionnelle,
    typeSI,
    commission,
    reseauSupport,
    etatFiche,
    descriptionSI,
    enjeuxSI,
    modules,
    listCentre,
    versionEntity) {
    /**
     *
     * version de l'entité.
     */
    this.versionEntity = versionEntity;
    /**
     * identifiant.
     */
    this.id = id;
    /**
     * libelle du système d'information.
     */
    this.libelle = libelle;
    /**
     * libelle dans Sicl@de.
     */
    this.libelleSiclade = libelleSiclade;
    /**
     * Autorité client du SI.
     */
    this.autoriteClient = autoriteClient;
    /**
     * Version en cours du SI.
     */
    this.version = null;
    /**
     * zone fonctionnelle du SI.
     */
    this.zoneFonctionnelle = zoneFonctionnelle;
    /**
     * Quartier fonctionnel du SI.
     */
    this.quartierFonctionnelle = quartierFonctionnelle;

    /**
     * type de SI.
     */
    this.typeSI = typeSI;

    /**
     * type de commission de gouvernace du SI.
     */
    this.commission = commission;

    /**
     * réseau hébergeant le SI.
     */
    this.reseauSupport = reseauSupport;
    /**
     * Etat de la fiche.
     */
    this.etatFiche = etatFiche;
    /**
     * Description du SI.
     */
    this.descriptionSI = descriptionSI;
    /**
     * Enjeux du SI.
     */
    this.enjeuxSI = enjeuxSI;
    /**
     * liste des modules.
     */
    this.modules = modules;
    /**
     * liste des centres.
     */
    this.listCentre = listCentre;
  }
}
