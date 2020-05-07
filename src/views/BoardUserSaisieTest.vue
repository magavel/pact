<template>
    <div id="principal">
        <div id="lien">
            <a href="#" class="titre">Mes Activités</a>
            <a href="#" class="titre">Saisir à la place de</a>
        </div>
        <div id="saisie">
            <div class="container" id="container-saisie">
                <div class="row">
                    <div class="col-4" id="divCalendar">
                        <Calendar v-model="date12"
                                  :inline="true"
                                  :locale="fr"
                                  v-on:date-select="clickCalendar"
                                  dateFormat="dd/mm/yy">
                        </Calendar>
                    </div>
                    <div class="col mr-n5">
                        <div class="row mt-3">
                            <span class="text-center titre" id="spanJour">
                            {{`${formaterJour(date12.getDay())} ${date12.getDate()} ${formaterMois(date12.getMonth())}`}}
                            </span>
                            <span class="ml-1"><img style="height: 15px" src="../assets/ic_favorite_border_24px.svg"></span>
                        </div>
                        <div class="row">
                            <div class="card text-center">
                                <div class="card-body">
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
                                                header="Missions/ Modules"></Column>
                                        <Column field="activite"
                                                header="Type d'activités"></Column>
                                        <Column field="commentaire"
                                                header="Commentaires"></Column>
                                        <Column field="charges"
                                                header="Charges (h:m)"></Column>
                                        <Column header="Actions">
                                            <template #body>
                                                <a class="pi pi-times"></a>
                                                <a class="pi pi-star-o"></a>
                                                <a class="pi pi-pencil"></a>
                                            </template>
                                        </Column>
                                    </DataTable>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-around" v-bind:class="divClassCharges">
                            <div><span >TOTAL CHARGES</span></div>
                            <div><span id="sommes-charges" v-bind:class="classeCharges">{{ this.chargesTotalJour }}</span></div>
                            <div><span v-bind:class="classeCharges">{{ this.messageCharge }}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="formulaire">
                <Tabs>
                    <Tab name="Nouvelle activité" :selected="true">
                        <AjouterActivitee :charges="charges" :click-valider="clickValider" :commentaire="commentaire" :date2="date2"
                                          :fr="fr" :missions-data="missionsData" :selected-activite="selectedActivite"
                                          :selected-mission="selectedMission" :tab-activite="tabActivite"/>
                    </Tab>
                    <Tab name="Activités favorites">
                        <h1>How much we do it for</h1>
                    </Tab>
                    <Tab name="Journées types">
                        <h1>Why we do it</h1>
                    </Tab>
                </Tabs>
            <!--<form v-on:submit="sub" action="#" > -->
        </div>
    </div>
</template>

<script>
    import MissionService from '../services/mission.service';
    import SaisieService from '../services/saisie.service';
    import Tabs from "../components/saisies/Tabs";
    import Tab from "../components/saisies/Tab";
    import AjouterActivitee from "../components/saisies/AjouterActivitee";

    export default {
    components: {AjouterActivitee, Tabs, Tab},
    created() {
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
  },
  data() {
    return {
      date1: new Date(2020, 3, 1),
      date2: null,
      date3: null,
      date4: null,
      date5: null,
      date6: null,
      date7: null,
      date8: null,
      date9: null,
      date10: null,
      date11: null,
      date12: new Date(),
      date13: null,
      date14: null,
      dates1: null,
      dates2: null,
      missionsJour: [],
        charges: "0:0",
      chargesTotalJour: "0:0",
      messageCharge : null,
      tabActivite: ['Récupération', 'Conception', 'Activité sportive', 'Analyse'],
      missions: [
        {
          name: 'Permissions et congés',
          activite: 'Récupération',
          commentaire: 'Test1',
          charges: '4:15',
          date: '2/4/2020',
        },
        {
          name: 'PACT NG',
          activite: 'Conception',
          commentaire: 'Test2',
          charges: '4:15',
          date: '2/4/2020',
        },
        {
          name: 'PACT NG',
          activite: 'Conception',
          commentaire: 'Test3',
          charges: '4:15',
          date: '1/4/2020',
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
      missionsData: ['Permissions et congés', 'PACT NG', 'Soutien'],
      selectedMission: null,
      selectedActivite: null,
      heure: 0,
      minute: 0,
      missionAdd: null,
      classeCharges: null,
      divClassCharges : null,
    };
  },
  // missionService: null,
   created() {
    /* this.missionService = new MissionService(); */

  },
  mounted() {
    /* MissionService.getMissionServiceAllMissions().then(
      (response) => {
        console.log(response.data);
        this.missions = response.data;
        this.listDate = response.data.map(
          (x) => Number((x.missionDateRealisation).split('::')[0]),
        );
        console.log(this.listDate);
      },
    ); */
    // toISOString()
    SaisieService.getSaisie('2020-03-18T08:00:08.566Z', '2020-03-18T08:00:08.566Z').then(
        (response) => {
            // console.log(response.data);
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
        name: this.selectedMission,
        activite: this.selectedActivite,
        commentaire: this.commentaire,
        charges: this.charges,
        date: `${this.date2.getDate()}/${this.date2.getMonth() + 1}/${this.date2.getFullYear()}`,
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
    filterMissionDuJour() {
      console.log(`mission du jour : ${this.missions.filter((mission) => mission.date === this.date12)}`);
      return this.missions.filter((mission) => mission.date === this.date12);
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
        .forEach((mission) => this.missionsJour.push(mission));
      this.chargesTotalJour = this.calculerChargesTotalJour();
      this.messageCharge = this.editerMessageCharges();
    },
    formaterJour(numberJour) {
      let stringJour;
      switch (numberJour) {
        case 1: stringJour = 'lundi';
          break;
        case 2: stringJour = 'mardi';
          break;
        case 3: stringJour = 'mercredi';
          break;
        case 4: stringJour = 'jeudi';
          break;
        case 5: stringJour = 'vendredi';
          break;
        case 6: stringJour = 'samedi';
          break;
        default: stringJour = 'dimanche';
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

<style scoped>

    a{
        padding: 10px;
    }

    #saisie{
        background-color: white;
        margin-bottom: 2em;
    }
    #divCalendar{
        background-color: #ffca7a;
        border-radius: 0px 30px 30px 0px;
    }
    #container-saisie{
        margin-left: 0;
        background-image: url("/src/assets/Trace-82.png");
        background-size: cover;
        z-index: 1;
    }

    #spanJour{
        margin-left: 40%;
    }

    .charges-valide{
        color: #1F9E02;
    }
    .charges-supp{
        color: #DC0007;
    }
    .charges-manquante{
        color: #E67504;
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


</style>
