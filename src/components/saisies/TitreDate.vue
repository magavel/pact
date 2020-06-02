<template>
    <div class="row mt-3" onclick="alert('je suis cliqué')">
        <span class="text-center titre" id="spanJour">{{moment(this.dateSelectionee).format('dddd D MMMM')}}</span>
        <span class="ml-1"><img style="height: 15px" src="../../assets/ic_favorite_border_24px.svg"></span>
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
        font-size: 1em;
    }


    /deep/ #divCalendar .p-datepicker table {
        font-size: 12px;
    }
</style>
