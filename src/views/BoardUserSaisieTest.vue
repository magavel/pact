<template>
    <div id="principal">
        <div id="lien">
            <a href="#">Mes Activités</a>
            <a href="#">Saisir à la place de</a>
        </div>
        <div id="saisie">
            <div class="container">
                <div class="row">
                    <div class="col" id="divCalendar">
                        <Calendar v-model="date12"
                                  :inline="true"
                                  :locale="fr"
                                  v-on:date-select="clickCalendar"
                                  dateFormat="dd/mm/yy">
                        </Calendar>
                    </div>
                    <div class="col-8">
                        <div class="row">
                            <span class="text-center">
                            {{`${formaterJour(date12.getDay())} ${date12.getDate()} ${formaterMois(date12.getMonth())}`}}
                            </span>
                            <span class="pi pi-heart"></span>
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
                                        <Column selectionMode="multiple" headerStyle="width: 3em"></Column>
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
                    </div>
                </div>
            </div>
        </div>
        <div id="test">
            <div class="container">
                <div class="row">
                    <span>Nouvelle(s) saisie(s)</span>
                </div>
                <div class="row">
                    <div class="col">
                        <Button label="Créer" icon="pi pi-plus-circle" class="p-button-secondary">
                        </Button>
                    </div>
                    <div class="col">
                        <Button label="Activités favorites"
                                icon="pi pi-star"
                                class="p-button-secondary">
                        </Button>
                    </div>
                    <div class="col">
                        <Button label="Journées types"
                                icon="pi pi-heart"
                                class="p-button-secondary">
                        </Button>
                    </div>
                    <div class="col">
                        <Button label="Imports"
                                icon="pi pi-cloud-download"
                                class="p-button-secondary">
                        </Button>
                    </div>
                </div>
                <!--<form v-on:submit="sub" action="#" > -->
                <div class="row">
                    <span>Dates</span>
                </div>
                <div class="row">
                    <Calendar v-model="date2" :locale="fr" dateFormat="dd/mm/yy" />
                </div>
                <div class="row">
                    <div class="col">
                        <div class="row">
                            <span>Missions / Sous-missions</span>
                        </div>
                        <div class="row">
                            <Dropdown v-model="selectedMission" :options="missionsData" />
                        </div>
                        <div class="row">
                            <span>Commentaire</span>
                        </div>
                        <div class="row">
                            <Textarea v-model="commentaire" rows="5" cols="30" ></Textarea>
                        </div>
                    </div>
                    <div class="col">
                        <div class="row">
                            <span>Type d'activités</span>
                        </div>
                        <div class="row">
                            <Dropdown v-model="selectedActivite" :options="tabActivite"/>
                        </div>
                        <div class="row">
                            <span>Charges</span>
                        </div>
                        <div class="row">
                            <Spinner v-model="heure" :min="0" :max="24"/> H <Spinner v-model="minute" :min="0" :max="59" /> Min
                        </div>
                    </div>
                </div>
                <div class="row">
                    <Button type="submit" label="Valider" class="p-button-secondary" v-on:click="clickValider"></Button>
                </div>
                <!-- </form> -->
            </div>
        </div>
    </div>
</template>

<script>
import MissionService from '../services/mission.service';
import SaisieService from '../services/saisie.service';

export default {
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
      heure: null,
      minute: null,
      missionAdd: null,

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
            console.log(response.data);
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
        charges: `${this.heure}:${this.minute}`,
        date: `${this.date2.getDate()}/${this.date2.getMonth() + 1}/${this.date2.getFullYear()}`,
      };
      this.missions.push(this.missionAdd);
      this.missions.forEach((m) => console.log(m.commentaire));
      this.missionsJour = [];
      this.missions.forEach((m) => console.log(m.date));
      this.missions.filter((mission) => mission.date === `${this.date12.getDate()}/${this.date12.getMonth() + 1}/${this.date12.getFullYear()}`)
        .forEach((mission) => this.missionsJour.push(mission));
      /*SaisieService.postSaisie(1, `${this.heure}.${this.minute}`, )*/
    },
    filterMissionDuJour() {
      console.log(`mission du jour : ${this.missions.filter((mission) => mission.date === this.date12)}`);
      return this.missions.filter((mission) => mission.date === this.date12);
    },
    clickCalendar() {
      this.missionsJour = [];
      this.missions.filter((mission) => mission.date === `${this.date12.getDate()}/${this.date12.getMonth() + 1}/${this.date12.getFullYear()}`)
        .forEach((mission) => this.missionsJour.push(mission));
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
    #test{
        background-color: white;
    }

    #saisie{
        background-color: white;
        margin-bottom: 2em;
    }
    #divCalendar{
        background-color: #ffca7a;
        border-top-right-radius: 1em 5em;
        border-bottom-right-radius: 5em 12em;
    }

    /deep/ .p-datatable.p-datatable-customers {

        .p-datatable-header {
            border: 0 none;
            padding: 12px;
            text-align: left;
            font-size: 20px;
        }

        .p-paginator {
            border: 0 none;
            padding: 1em;
        }

        .p-datatable-thead > tr > th {
            border: 0 none;
            text-align: left;
        }

        .p-datatable-tbody > tr > td {
            border: 0 none;
            cursor: auto;
        }

    }

</style>
