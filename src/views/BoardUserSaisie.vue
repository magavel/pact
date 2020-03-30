<template>
  <div class="col">
  <div class="row">
    <div class="col-4">
      <Calendar v-model="date12" :selectionMode="single || multiple || range"  :inline="true">
      </Calendar>
      </div>
    <div class="col-8">
      <H3 class="text-center">
        {{date12.getDate()+"/"+(date12.getMonth()+1)
        +"/"+date12.getFullYear()}}</H3>
  <div class="card text-center">
    <div class="card-header">
      <ul class="nav nav-pills card-header-pills">
        <li class="nav-item">
          <a class="nav-link active" href="#"> Liste des Activités</a>
        </li>
      </ul>
    </div>
    <div class="card-body">
  <DataTable v-model="missions" class="table table-bordered" :paginator="true" :rows="4">
    <template #empty>
      Aucune Activités trouvées.
    </template>
    <template #loading>
      Chargement des données en cours.
    </template>
    <Column field="missionId" header="missionId"></Column>
    <Column field="missionLibelle" header="missionLibelle"></Column>
    <Column field="missionCommentaire" header="Commentaire"></Column>
    <Column field="missionConsommation" header="Charge"></Column>
    <Column field="missionDateRealisation" header="Date"></Column>
  </DataTable>
    </div>
  </div>
    </div>
  </div>
  <div class="row">
    <div class="col">
    <div class="card text-center">
      <div class="card-header">
        <ul class="nav nav-pills card-header-pills">
          <li class="nav-item">
            <a class="nav-link active" href="#"> Créer</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="#"> Activité favorité</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="#"> Journée favorite</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="#"> Importer</a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <div class="container">
          <form v-on:submit="sub" action="#" method="post">
        <div class="row" >
          <h2 class="mx-auto" style="width: 200px;">Date</h2>
        </div>
        <div class="row">
          <div class="col">
          <Calendar v-model="dateDebut"/>
          </div>
          <div class="col">
          <Calendar v-model="dateFin"/>
          </div>
        </div>
        <div class="row">
          <div class="col">
          <h2>Commentaire</h2>
            <label>
              <Textarea v-model="commentaire" rows="5" cols="30" ></Textarea>
            </label>
          </div>
          <div class="col">
          </div>
        </div>
        <div class="row">
          <button type="submit" class="mx-lg-1" style="width: 200px;">Creer</button>
        </div>
    </form>
    </div>
  </div>
    </div>
  </div>
  </div>
  </div>
</template>

<script>

import MissionService from '../services/mission.service';

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
      date1: null,
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
      missions: null,
      listDate: [],
      dateAujourdhui: new Date(),
      commentaire: null,
      dateDebut: new Date(),
      dateFin: null,
    };
  },
  // missionService: null,
  /* created() {
    this.missionService = new MissionService();
  }, */
  mounted() {
    MissionService.getMissionServiceAllMissions().then(
      (response) => {
        console.log(response.data);
        this.missions = response.data;
        this.listDate = response.data.map(
          (x) => Number((x.missionDateRealisation).split('::')[0]),
        );
        console.log(this.listDate);
      },
    );
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
    sub(event) {
      MissionService.postMission(this.dateDebut, this.commentaire);
      this.reloadMission();
      event.preventDefault();
    },
  },
};
</script>


<style scoped>

</style>
