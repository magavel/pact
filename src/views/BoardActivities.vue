<template>
    <div>
        <NavActivities/>
        <ListingActivities/>
        <InputActivities/>
    </div>
</template>

<script>
    import ListingActivities from "../components/saisies/ListingActivities";
    import InputActivities from "../components/saisies/InputActivities";
    import NavActivities from "../components/saisies/NavActivities";

    export default {
        name: "BoardActivities",
        components: {NavActivities, InputActivities, ListingActivities}
    }
</script>

