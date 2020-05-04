<template>
    <div class=" mx-n3 px-3 mb-2 pt-2 pb-4" >


        <h5> {{ systeme_information_module.module_libelle}}</h5>

        <div class="form-row">
            <div class="form-group col-md-4">
                <label for="infoGerant">Infogérant</label> <br>
                <input
                        type="text"
                        class="form-control"
                        id="infoGerant"
                        v-model="infogerence.infogerant"
                />
            </div>

            <div class="col-md-4">
                <label for="hebergement">Hébergement</label><br>
                <input
                        type="text"
                        class="form-control"
                        id="hebergement"
                        v-model="infogerence.hebergement"

                />
            </div>

            <div class="col-md-4">
                <label for="niveauHerbergement">Niveau d'hébergement</label><br>
                <MultiSelect
                        id="niveauHerbergement"
                        v-model="infogerence.niveauHebergement"
                        :options="niveauHebergement"
                        optionLabel="value"
                />
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'InfogerenceModule',
        props: {
            infogerence: {},
            niveauHebergement: {},
            systeme_information_module: {}
        }
    }
</script>
<style scoped>
    .bg-grey {
        background-color: #e6dfdf85;
    }

    .arrondi {
        border-radius: 0 120px 0 120px / 0 50px 0 50px;
    }
    p-multiselect-label-container {
        height: 38px;
    }

    .p-multiselect-typeProject-token img {
        width: 20px;
        vertical-align: middle;
        margin-right: 0.5em;
    }

</style>
