<template>
    <div id="listingActivities" class="shadow-sm card m-3">
        premier bloc
        <div class="card-body">
            <div class="row">
                <div class="col-md-3 bg-primary">
                    calendrier
                </div>
                <div class="col-md-9 bg-light">
                    <router-view></router-view>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'ListingActivities'
    }
</script>
