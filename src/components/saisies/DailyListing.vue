<template>
    <div style="width: 100%">
        <TitreDate/>
        <DataTableSaisies :key="tableauSaisieKey" />
        <TotalCharges/>
    </div>
</template>
<script>
    import DataTableSaisies from "./DataTableSaisies"
    import TitreDate from "./TitreDate"
    import TotalCharges from "./TotalCharges"

    export default {
        name: 'DailyListing',
        components: {DataTableSaisies, TitreDate, TotalCharges},
        computed: {
            tableauSaisieKey(){
                return this.$store.state.saisies.tableauSaisieKey;
            }
        },
    }
</script>
