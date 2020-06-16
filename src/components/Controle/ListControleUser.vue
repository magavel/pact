<template>
    <div>
        <Toast />
        <TreeTable :value="nodes"
                   :filters="filters"
                   filterMode="lenient" always-show-paginator
                   :paginator="true"
                   :rows="10" :key="componentKey">
            <Column field="username" header="Collaborateurs" :expander="true">
                <template #filter>
                    <InputText type="text" v-model="filters['username']" class="p-column-filter" placeholder="Filtrer par nom" />
                </template>
            </Column>
            <Column field="mission" header="Missions" ></Column>
            <Column field="activite" header="Activites"></Column>
            <Column v-for="col of columns" :key="col.field"
                     :header="col.header" :expander="col.expander">
                    <template #body="slotProps">

                        <div v-if="slotProps.node.data.username !== undefined">
                      <span class="d-inline-block" tabindex="0" >
                                                        <div id="charges">{{meth(col,slotProps)}}</div>

                        </span> </div>
                        <div v-else>
                        <div @dblclick="update(col,slotProps)">
                            <div v-if= "isUpdate(col,slotProps) === false">
                                <div class="popup" @click="myFunction(col,slotProps)">{{meth(col,slotProps)}}
                                    <span class="popuptext" :id="myPopupId(col,slotProps)"  @click="modifierSaisie(col,slotProps)">{{commentaire(col,slotProps)}}</span>
                                </div>
                        </div>
                            <div v-else>

                                <InputMask @keydown.enter.stop="miseAjour(col,slotProps)"
                                           class="p-field col-xs-2 inputcolumn"
                                           :value="meth(col,slotProps)" v-model="selectedCaseCharge" mask="9:99" placeholder="  :  "/>

                            </div>
                        </div>

                        </div>



                </template>
            </Column>
            <Column header="actions">
                <template #body="slotProps">
                    <div v-if="slotProps.node.data.username !== undefined">
                     <!--   <Button type="button" icon="pi pi-plus" class="p-button-secondary" @click.prevent="ajouterUneActiviteFavorite(slotProps)"></Button>-->
                    </div>
                    <div v-else>
                        <!--   je suis un fils -->
                        <Button type="button" icon="pi pi-upload" class="p-button-secondary"
                                @click="upload(slotProps.data.systeme_information_id)"></Button>

                        <!-- <Button type="button" icon="pi pi-briefcase" class="p-button-secondary"
                                @click="exportCSV($event,slotProps)"></Button> -->
                     </div>
                 </template>

             </Column>
         </TreeTable>
     </div>
 </template>

 <script>
     import { mapState } from 'vuex';
     export default {
         computed: mapState({
             controle: state => state.users.controle,
             loading: false,
         }),
             created() {

             let periode = new Object();
                 periode.dateDebut =     "2020-03-18T00:00:00.000Z";
                 periode.dateFin =     "2020-03-20T00:00:00.000Z";

             this.$store.dispatch('users/getControleSaisies', periode);
            if (this.controle.data === undefined) {
             if (localStorage.getItem('controles')) {
                 try {
                     this.local = JSON.parse(localStorage.getItem('controles'));
                     this.nodes = this.local.data;
                     this.columns = this.local.colunns;
                     this.constructor = this.$store.users.controle;
                 } catch(e) {
                     localStorage.removeItem('controles');
                 }
             } }  else {
                 this.$store.dispatch('users/getControleSaisies',periode);
                 this.test();
             }

         },
         data() {
             return {
                 filters: {},
                 nodes : null,
                 columns : null,
                 local: null,
                 selectedKey1:null,
                 periode:null,
                 selectedCase: null,
                 selectedCaseCharge:null,
                 componentKey:null,
                 selectedPopup: null,

             }
         },
         methods : {
             myPopupId(col,slotProps) {

                 return "".concat(eval("slotProps.node.key"),'-',col.field.toString());
             },
             test() {
                 this.nodes = this.controle.data;
                 this.columns = this.controle.colunns;
                 console.log(this.controle.data.length);
                 console.log(this.controle.data.length);
             },
             getColunnPere(col,slotProps) {
                return eval("this.controle.data[slotProps.node.key.split('-')[0]].data." +col.field.toString()+".charge")
             },
             meth(col,slotProps) {
                 let res = eval("slotProps.node.data."+col.field.toString()+".charge");
                 return res.toString();
             },
             commentaire(col,slotProps) {
                 return eval("slotProps.node.data."+col.field.toString()+".commentaire ") ;
             },
             modifierSaisie(col,slotProps) {
                 alert(eval("slotProps.node.data."+col.field.toString()+".saisieId"));
             },
             update(col,slotProps) {

                 if(this.selectedCase !== null) {
                     this.selectedCase.update = false;
                 }

                 eval("slotProps.node.data."+col.field.toString()+".update = !slotProps.node.data."+col.field.toString()+".update")
                 this.selectedCase = eval("slotProps.node.data."+col.field.toString());
             },
             isUpdate(col,slotProps) {
              return eval("slotProps.node.data."+col.field.toString()+".update");
             },
             miseAjourColunmValue(col,slotProps, value) {
                 eval("slotProps.node.data."+col.field.toString()+".charge = "+value);
             },
         forceRerender() {
             this.componentKey += 1;
         },             miseAjour(col,slotProps){

                 let uneSaisieCharge = 0;
                 if (this.selectedCase.saisieId !== -1) {

                     let uneSaisie = {
                         saisieId: this.selectedCase.saisieId,
                         saisie_charge: (parseInt(this.selectedCaseCharge.split(':')[0]*60) + parseInt(this.selectedCaseCharge.split(':')[1])),
                        // saisie_charge: this.selectedCaseCharge,
                     }
                     this.$store.dispatch('saisies/updateCharge', uneSaisie);
                     uneSaisieCharge = uneSaisie.saisie_charge;

                 } else {
                     //nouvelle saisie.
                    let uneSaisie = {
                         saisieId: this.selectedCase.saisieId,
                        saisie_charge: (parseInt(this.selectedCaseCharge.split(':')[0]*60) + parseInt(this.selectedCaseCharge.split(':')[1])),
                       //  saisie_charge: this.selectedCaseCharge,
                         saisie_phaseId : slotProps.node.data.phaseId,
                         activite_Id : slotProps.node.data.activiteId,
                         saisie_commentaire : "",
                         saisie_username : JSON.parse(localStorage.getItem('user')).username,
                         saisie_date : this.selectedCase.dateSaisie,
                        }

                     this.$store.dispatch('saisies/ajouterUneSaisie',  uneSaisie);
                     uneSaisieCharge = uneSaisie.saisie_charge;
                     ;

                 }

                 console.log(uneSaisieCharge);

                 let resColun = (this.getColunnPere(col,slotProps) + (uneSaisieCharge - this.selectedCase.charge));

                eval("this.$store.state.users.controle.data[slotProps.node.key.split('-')[0]].data."+col.field.toString()+".charge = "+ resColun.toString());
                eval("this.controle.data[slotProps.node.key.split('-')[0]].data."+col.field.toString()+".charge = "+ resColun.toString());
                eval("this.nodes[slotProps.node.key.split('-')[0]].data."+col.field.toString()+".charge = "+ resColun.toString());

                 this.miseAjourColunmValue (col,slotProps, uneSaisieCharge )

                 this.selectedCase.charge = uneSaisieCharge ;

                 this.selectedCase.update = false;

                 this.selectedCaseCharge = null;

                 this.$store.commit("users/UPDATE_TABLE_CONTROLE", this.node);

              // this.forceRerender();


             //    this.$forceUpdate();
             },
             exportCSV(event,slotProps) {
                 console.log(slotProps);
             },
             myFunction(col,slotProps) {

                 if (this.selectedPopup !== null) {
                     this.selectedPopup.style.display = "none";
                 }

                 this.selectedCase = eval("slotProps.node.data."+col.field.toString()); // recuperation de la case lu.

                 let popup = document.getElementById("".concat(eval("slotProps.node.key"),'-',col.field.toString()));
                 popup.classList.toggle("show");
                 this.selectedPopup = popup;

                 let uneSaisie = {
                     saisieId: this.selectedCase.saisieId,
                     saisie_charge: eval("slotProps.node.data."+col.field.toString()+".charge"),
                     //  saisie_charge: this.selectedCaseCharge,
                     saisie_phaseId : slotProps.node.data.phaseId,
                     activite_Id : slotProps.node.data.activiteId,
                     saisie_commentaire : "",
                     saisie_username : JSON.parse(localStorage.getItem('user')).username,
                     saisie_date : this.selectedCase.dateSaisie,
                 }

                 this.$store.commit('saisies/GET_SAISIE_UPDATE', uneSaisie);
                 this.$store.commit('saisies/UPDATE_AJOUT_ACTIVITE_KEY');
                 this.$store.commit('saisies/UPDATE_TABS_KEY');
     }
         }
     }

   </script>

 <style lang="scss" scoped>


     /* Popup container */
     .popup {
         position: relative;
         display: inline-block;
         cursor: pointer;
     }

     /* The actual popup (appears on top) */
     .popup .popuptext {
         visibility: hidden;
         width: 160px;
         background-color: #555;
         color: #fff;
         text-align: center;
         border-radius: 6px;
         padding: 8px 0;
         position: absolute;
         z-index: 1;
         bottom: 125%;
         left: 50%;
         margin-left: -80px;
     }

     /* Popup arrow */
     .popup .popuptext::after {
         content: "";
         position: absolute;
         top: 100%;
         left: 50%;
         margin-left: -5px;
         border-width: 5px;
         border-style: solid;
         border-color: #555 transparent transparent transparent;
     }

     /* Toggle this class when clicking on the popup container (hide and show the popup) */
     .popup .show {
         visibility: visible;
         -webkit-animation: fadeIn 1s;
         animation: fadeIn 1s
     }

     /* Add animation (fade in the popup) */
     @-webkit-keyframes fadeIn {
         from {opacity: 0;}
         to {opacity: 1;}
     }

     @keyframes fadeIn {
         from {opacity: 0;}
         to {opacity:1 ;}
     }


     .inputcolumn {
         width: 60px;
     }
     // style du bloc
     body .p-component {
         font-size: 12px;
         text-decoration: none;
         font-weight: 500;
     }

     .table-header {
         display: flex;
         justify-content: space-between;
     }

     /deep/ .p-datatable.p-datatable-customers {
         .p-datatable-header {
             padding: 1rem;
             text-align: left;
             font-size: 1.5rem;
         }
     }


     /deep/ .p-column-filter {
         width: 100%;
     }

     /* Responsive */
     .p-datatable-customers .p-datatable-tbody > tr > td .p-column-title {
         display: none;
     }

     @media screen and (max-width: 64em) {
         /deep/ .p-datatable {
             &.p-datatable-customers {
                 .p-datatable-thead > tr > th,
                 .p-datatable-tfoot > tr > td {
                     display: none !important;
                 }

                 .p-datatable-tbody > tr > td {
                     text-align: left;
                     display: block;
                     border: 0 none !important;
                     width: 100% !important;
                     float: left;
                     clear: left;
                     border: 0 none;

                     .p-column-title {
                         padding: .4rem;
                         min-width: 30%;
                         display: inline-block;
                         margin: -.4rem 1rem -.4rem -.4rem;
                         font-weight: bold;
                     }
                 }
             }
         }
     }


     .float{
         position:fixed;
         width:60px;
         height:60px;
         bottom:40px;
         right:40px;
         background-color:#0C9;
         color:#FFF;
         border-radius:50px;
         text-align:center;
         box-shadow: 2px 2px 3px #999;
     }

     .my-float{
         margin-top:22px;
     }
     a.float + div.label-container {
         visibility: hidden;
         opacity: 0;
         transition: visibility 0s, opacity 0.5s ease;
     }

     a.float:hover + div.label-container{
         visibility: visible;
         opacity: 1;
     }


 </style>


