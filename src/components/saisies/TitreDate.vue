<template>
    <div>
        <Toast/>
    <div class="row mt-3" @click="ajouterJourneeFavorite">
        <span class="text-center titre" id="spanJour">Mes saisies du {{moment(this.dateSelectionee[0]).format('dddd D MMMM')}}</span>
        <span class="ml-3"><img alt='' style="height: 15px" src="../../assets/ic_favorite_border_24px.svg"></span>
    </div>
    </div>
</template>
<script>
    export default {
        name: 'TitreDate',
        computed: {
            dateSelectionee(){
                return this.$store.state.saisies.dateSelectionee;
            }
        },
        data() {
            return {
                message:[],
            }
        },
        methods: {
            ajouterJourneeFavorite(e) {
                let uneJourneeFavorite = new Object();
                 uneJourneeFavorite.JourneeTypeDTO_journeeTypeLibelle = this.moment(this.dateSelectionee[0]).format('dddd D MMMM');
                uneJourneeFavorite.JourneeTypeDTO_listSaisie = [];

              if ( Array.isArray(this.$store.state.saisies.saisies) && this.$store.state.saisies.saisies.length ) {
                this.$store.state.saisies.saisies.forEach(saisie => {
                  uneJourneeFavorite.JourneeTypeDTO_listSaisie.push(saisie.SaisieFavorite_saisieId);
                });
                this.$store.dispatch('users/ajouterJourneeFavorites', uneJourneeFavorite);
                this.$toast.add({
                  severity: 'success',
                  summary: 'Succes',
                  detail: 'L\'activité a bien été ajoutée à vos favoris',
                  life: 3000
                });
              } else {
                this.$toast.add({
                  severity: 'warm',
                  summary: 'Attention',
                  detail: 'Journée favorite selectionnée vide ',
                  life: 3000
                });
              }
            }
        }
    }
</script>
<style lang="scss" scoped>

    a {
        padding: 10px;
    }

    #spanJour {
        margin-left: 40%;
    }

    .titre {
        font-weight: bold;
        font-size: medium;
    }


    /deep/ #divCalendar .p-datepicker table {
        font-size: 12px;
    }
</style>
