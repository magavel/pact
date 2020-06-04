<template>
    <div>
        <TitreDate/>
        <DataTableSaisies/>
        <TotalCharges/>
    </div>
</template>
<script>
    import DataTableSaisies from "./DataTableSaisies"
    import TitreDate from "./TitreDate"
    import TotalCharges from "./TotalCharges"

    export default {
        name: 'DailyListing',
        components: {DataTableSaisies, TitreDate, TotalCharges}
    }
</script>
