<template>
    <div id="principal">
        <div id="lien">
            <span><a href="#" class="titre">Mes Activités</a></span>
            <span><a href="#" class="titre">Saisir à la place de</a></span>
        </div>
        <div id="saisie">
            <div id="container-saisie">
                <div class="row w-100 ml-0">
                    <Calendrier :click-calendar="clickCalendar" :date12="date12" :fr="fr"/>
                    <div class="col-8">
                        <div class="row mt-3">
                          <span class="text-center titre" id="spanJour">
                          {{`${formaterJour(date12.getDay())} ${date12.getDate()} ${formaterMois(date12.getMonth())}`}}
                          </span>
                            <span class="ml-1"><img style="height: 15px" src="../assets/ic_favorite_border_24px.svg"></span>
                        </div>
                        <div class="row mt-3 mr-3">
                            <DataTable v-model="missionsJour"
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
                                        <div :class="slotProps.data.classe" class="pl-3">
                                            {{ slotProps.data.name}}
                                        </div>
                                    </template>
                                </Column>
                                <Column field="activite"
                                        header="Type d'activités"></Column>
                                <Column field="commentaire"
                                        header="Commentaires"></Column>
                                <Column field="charges"
                                        header="Charges (h:m)" body-class="pl-4"></Column>
                                <Column header="Actions">
                                    <template #body>
                                        <Button type="button" icon="pi pi-times" class="p-button-secondary"></Button>
                                        <Button type="button" icon="pi pi-star-o" class="p-button-secondary"></Button>
                                        <Button type="button" icon="pi pi-pencil" class="p-button-secondary"></Button>
                                    </template>
                                </Column>
                            </DataTable>
                        </div>
                        <div class="d-flex justify-content-around total pt-2 mr-3" v-bind:class="divClassCharges" style="margin-left: 39%">
                            <div><span >TOTAL CHARGES</span></div>
                            <div><span id="sommes-charges" v-bind:class="classeCharges">{{ this.chargesTotalJour }}</span></div>
                            <!-- <div><span v-bind:class="classeCharges">{{ this.messageCharge }}</span></div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="formulaire">
                <Tabs>
                    <Tab name="Nouvelle activité" :selected="true">
                        <div id="ajoutActivite" class="">
                            <div id="periode" class="ml-n3">
                            <span class="mr-2 ml-1">
                                <img src="../assets/event-24px.svg">
                            </span>
                                <Calendar v-model="date2" :locale="fr" dateFormat="dd/mm/yy"/>
                                <span class="ml-3 mr-3"> au </span>
                                <Calendar :locale="fr" dateFormat="dd/mm/yy"/>
                            </div>
                            <div class="row pl-5">
                                <div class="col">
                                    <div class="row">
                                        <span>Missions / Modules</span>
                                    </div>
                                    <div class="row dropdownWidth">
                                        <Dropdown v-model="selectedMission" :options="missionsData" option-label="name"/>
                                    </div>
                                    <div class="row mt-4">
                                        <span>Commentaire (max 100 caractères)</span>
                                    </div>
                                    <div class="row dropdownWidth">
                                        <Textarea v-model="commentaire" rows="5" cols="30"></Textarea>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="row">
                                        <span>Type d'activités</span>
                                    </div>
                                    <div class="row dropdownWidth">
                                        <Dropdown v-model="selectedActivite" :options="tabActivite"/>
                                    </div>
                                    <div class="row mt-4">
                                        <span>Charges(hh:mm)</span>
                                    </div>
                                    <div class="row">
                                        <div id="charges">
                                            <InputMask v-model="charges" mask="9:99" placeholder="  :  "/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row justify-content-end mr-3" style="margin-left: 39%">
                                <Button id="btnAjouter" type="submit" label="Ajouter" class="p-button-secondary"
                                        v-on:click="clickValider"></Button>
                            </div>
                            <!-- </form> -->
                        </div>
                    </Tab>
                    <Tab name="Activités favorites">
                        <h1>Activités favorites</h1>
                        <InputActivitesFavorites />
                    </Tab>
                    <Tab name="Journées types">
                        <h1>Journées types</h1>
                    </Tab>
                </Tabs>
            <!--<form v-on:submit="sub" action="#" > -->
        </div>
    </div>
</template>

<script>
    import SaisieService from '../services/saisie.service';
    import Tabs from "../components/saisies/Tabs";
    import Tab from "../components/saisies/Tab";
    import Calendrier from "../components/saisies/Calendrier";
    import TitreDate from "../components/saisies/TitreDate";
    import InputActivitesFavorites from '../components/saisies/InputActivitesFavorites';

    export default {
    components: {TitreDate, Calendrier, Tabs, Tab, InputActivitesFavorites},
    /* created() {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const prevMonth = (month === 0) ? 11 : month - 1;
    const prevYear = (prevMonth === 11) ? year - 1 : year;
    const nextMonth = (month === 11) ? 0 : month + 1;
    const nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);
    const invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today, invalidDate];
  }, */
  data() {
    return {
      date12: new Date(),
      missionsJour: [],
        cloneDate: null,
      charges: "0:0",
      chargesTotalJour: "0:0",
      messageCharge : null,
      tabActivite: ['Analyse',
        'AMOA', 'Appui technique',
        'Conduite', 'Design_UX/UI',
        'Implementation', 'Test'],
      missions: [
        {
          name: 'PACT NG',
          activite: 'Analyse',
          commentaire: 'Feature analyses',
          charges: '4:15',
          date: '2/4/2020',
            classe: 'testBg1'
        },
        {
          name: 'PACT NG',
          activite: 'Implementation',
          commentaire: 'Implementation "saisir activité"',
          charges: '4:15',
          date: '2/4/2020',
            classe: 'testBg2'
        },
        {
          name: 'PACT NG',
          activite: 'Conception',
          commentaire: 'Test3',
          charges: '4:15',
          date: '1/4/2020',
            classe: 'testBg2'
        },
      ],
      listDate: [],
      dateAujourdhui: new Date(),
      commentaire: null,
      dateDebut: new Date(),
      dateFin: null,
      fr: {
        firstDayOfWeek: 1,
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        dayNamesMin: ['D', 'L', 'Ma', 'Me', 'J', 'V', 'S'],
        monthNames: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jui', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
        today: 'Aujourd\'hui',
        clear: 'Effacer',
        weekHeader: 'Sm',
      },
      missionsData: [
          {
              id: 1,
              name : 'SERENA NG/MODULE PMV'
          },
          {
            id : 2,
            name: 'PACT NG/MODULE PMV'
          },
          {
              id: 3,
              name: 'MYADJ/MODULE V3'
          }],
      selectedMission: null,
      selectedActivite: null,
      heure: 0,
      minute: 0,
      missionAdd: null,
      classeCharges: null,
      divClassCharges : null,
      refTypeActivite : []
    };
  },
    computed : {
        saisies: state => state.saisies.saisies,
        dateSelectionee(){
            return this.$store.state.saisies.dateSelectionee;
        }
    },

  // missionService: null,
   created() {
    this.$store.dispatch('saisies/getSaisies', '2020-03-18T08:00:08.566Z', '2020-03-18T08:00:08.566Z');
  },
  mounted() {
    // toISOString()
      SaisieService.getRefTypeActivite().then(
          (response) => {
              response.data.data.forEach((d)=> this.refTypeActivite.push({
                  id : d.refTypeId,
                  libelle : d.refTypeLibelleCourt
              }));
              console.log("refTypeActivité : " +  this.refTypeActivite);
          }
      );



    SaisieService.getSaisie('2020-05-26T08:00:08.566Z', '2020-05-26T08:00:08.566Z').then(
        (response) => {
             console.log(response.data);
             const donnees = response.data.data;
             console.log("donnees : " + donnees);
             donnees.forEach((s)=> console.log(s));
             /*for(let saisie of donnees){
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
             this.missions.forEach((m) => console.log("mission : " + m.date));*/
        }
    );

    this.missions.filter((mission) => mission.date === `${this.date12.getDate()}/${this.date12.getMonth() + 1}/${this.date12.getFullYear()}`)
      .forEach((mission) => this.missionsJour.push(mission));
  },
  methods: {
    reloadMission() {
      MissionService.getMissionServiceAllMissions()
        .then(
          (response) => {
            this.missions = response.data;
            this.listDate = response.data.map(
              (x) => Number((x.missionDateRealisation).split('::')[0]),
            );
          },
        );
    },
    /* sub(event) {
      MissionService.postMission(this.dateDebut, this.commentaire);
      this.reloadMission();
      event.preventDefault();
    }, */
    /*getSaisies(){
        this.$store.dispatch('saisies/getSaisies', this.saisies)
    },*/
    clickValider() {
      this.missionAdd = {
        name: this.selectedMission.name,
        activite: this.selectedActivite,
        commentaire: this.commentaire,
        charges: this.charges,
        date: `${this.date2.getDate()}/${this.date2.getMonth() + 1}/${this.date2.getFullYear()}`,
          classe: `testBg${this.selectedMission.id}`
      };
      this.missions.push(this.missionAdd);
      this.missions.forEach((m) => console.log(m.commentaire));
      this.missionsJour = [];
      this.missions.forEach((m) => console.log(m.date));
      this.missions.filter((mission) => mission.date === `${this.date12.getDate()}/${this.date12.getMonth() + 1}/${this.date12.getFullYear()}`)
        .forEach((mission) => this.missionsJour.push(mission));
        this.chargesTotalJour = this.calculerChargesTotalJour();
        this.messageCharge = this.editerMessageCharges();
      /*SaisieService.postSaisie(1, `${this.heure}.${this.minute}`, )*/
    },
    calculerChargesTotalJour(){
          let heures = 0;
          let minutes = 0;
          for(let mission of this.missionsJour){
              let charges = mission.charges.split(":");
              heures += parseInt(charges[0]);
              minutes += parseInt(charges[1]);
          }
          let totalMinutes = minutes % 60;
          let totalHeures = Math.trunc(minutes/60) + heures;
        return `${totalHeures}:${totalMinutes}`;
     },
      editerMessageCharges(){
        let messageReturn;
        let charges = this.chargesTotalJour.split(":");
        let heures = parseInt(charges[0]);
        let minutes = parseInt(charges[1])
        if(heures * 60 + minutes < 500){
            this.classeCharges = "charges-manquante";
            this.divClassCharges = "div-charges-manquante";
            let tempsManquant = 510 - (heures * 60 + minutes);
            let heureManquante = Math.trunc(tempsManquant / 60);
            let minutesManquantes = tempsManquant % 60;
            messageReturn = heureManquante + "h" + minutesManquantes + " manquantes";
        }
        if(heures * 60 + minutes <= 520 && heures * 60 + minutes >= 500){
            this.divClassCharges = "div-charges-valide";
            this.classeCharges = "charges-valide";
            messageReturn = "Valide à +/- 10 minutes";
        }
        if(heures * 60 + minutes > 520 ){
            this.divClassCharges = "div-charges-supp";
            this.classeCharges = "charges-supp";
            let tempsSupp = (heures * 60 + minutes) - 510;
            let heureSupp = Math.trunc(tempsSupp / 60);
            let minutesSupp = tempsSupp % 60;
            messageReturn = heureSupp + "h"+ minutesSupp + " supplémentaire(s)";
        }
        return messageReturn;
      },
    clickCalendar() {
      this.missionsJour = [];
        this.missions.filter((mission) => mission.date === `${this.date12.getDate()}/${this.date12.getMonth() + 1}/${this.date12.getFullYear()}`)
            .forEach((mission) => console.log(mission));
      this.missions.filter((mission) => mission.date === `${this.date12.getDate()}/${this.date12.getMonth() + 1}/${this.date12.getFullYear()}`)
        .forEach((mission) => this.missionsJour.push(mission));
      this.chargesTotalJour = this.calculerChargesTotalJour();
      this.messageCharge = this.editerMessageCharges();
    },
    correspondreActivite(activiteId){
        let libelleActivite;
        for(let ref of this.refTypeActivite){
            if(ref.id === activiteId){
                libelleActivite = ref.libelle;
            }
        }
        return libelleActivite;
    },
    formaterJour(numberJour) {
      let stringJour;
      switch (numberJour) {
        case 1: stringJour = 'Lundi';
          break;
        case 2: stringJour = 'Mardi';
          break;
        case 3: stringJour = 'Mercredi';
          break;
        case 4: stringJour = 'Jeudi';
          break;
        case 5: stringJour = 'Vendredi';
          break;
        case 6: stringJour = 'Samedi';
          break;
        default: stringJour = 'Dimanche';
          break;
      }
      return stringJour;
    },
    formaterMois(mois) {
      let stringMois;
      switch (mois) {
        case 0: stringMois = 'janvier';
          break;
        case 1: stringMois = 'février';
          break;
        case 2: stringMois = 'mars';
          break;
        case 3: stringMois = 'avril';
          break;
        case 4: stringMois = 'mai';
          break;
        case 5: stringMois = 'juin';
          break;
        case 6: stringMois = 'juillet';
          break;
        case 7: stringMois = 'aout';
          break;
        case 8: stringMois = 'septembre';
          break;
        case 9: stringMois = 'octobre';
          break;
        case 10: stringMois = 'novembre';
          break;
        default: stringMois = 'decembre';
          break;
      }
      return stringMois;
    },
  },
};

</script>

<style lang="scss" scoped>

    a{
        padding: 10px;
    }

    #saisie{
        background-color: white;
        margin-bottom: 2em;
    }

    #container-saisie{
            margin-left: 0;
            /*background-image: url("../assets/Trace-82.svg");*/
        /*background-size: 800px;
        background-repeat: no-repeat;*/
        z-index: 1;
    }

    .charges-valide{
        color: #1F9E02;
        margin-right: 34px;
    }
    .charges-supp{
        color: #DC0007;
        margin-right: 33px;
    }
    .charges-manquante{
        color: #E67504;
        margin-right: 50px;
    }
    .div-charges-manquante{
        background-color: #FBE3BF;
    }
    .div-charges-valide{
        background-color: #E1EBE0;
    }
    .div-charges-supp{
        background-color: #F3D6D6;
    }

    .titre{
        font-weight: bold;
        font-size: 1em;
    }

    #test .row{
        margin-bottom: 10px;
    }


    #btnAjouter {
        background: #154194 0% 0% no-repeat padding-box;
        border-radius: 30px;
        opacity: 1;
        font: Regular 18px/22px Myriad Pro;
        letter-spacing: 0px;
        color: #FFFBFB;
        width: 100px;
        height: 50px;
        margin-right: 1%;
    }
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

    #ajoutActivite{
        background-color: white;
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
    .total{
        border-radius: 10px;
        height: 40px;
    }

    /deep/  .p-datepicker .p-datepicker-header .p-datepicker-title{
        font-weight: 900;
    }


    /deep/ #divCalendar .p-datepicker table {
        font-size: 12px;
    }
</style>
