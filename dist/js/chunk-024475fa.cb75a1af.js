(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-024475fa","chunk-152713d8"],{"36dc":function(e,t,o){"use strict";o.r(t);var n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("form",[o("div",{staticClass:"form-row"},[o("div",{staticClass:"form-group col-md-6"},[o("label",{attrs:{for:"authoriteClient"}},[e._v(" Authorité client ")]),o("input",{directives:[{name:"model",rawName:"v-model",value:e.besoins.autoriteClient,expression:"besoins.autoriteClient"}],staticClass:"form-control",attrs:{type:"text",id:"authoriteClient",placeholder:"?????"},domProps:{value:e.besoins.autoriteClient},on:{input:function(t){t.target.composing||e.$set(e.besoins,"autoriteClient",t.target.value)}}})]),o("div",{staticClass:"form-group col-md-6"},[o("label",{attrs:{for:"beneficiaire"}},[e._v(" Bénéficiaire(s) ")]),o("input",{directives:[{name:"model",rawName:"v-model",value:e.besoins.beneficiaire,expression:"besoins.beneficiaire"}],staticClass:"form-control",attrs:{type:"text",id:"beneficiaire",placeholder:"?????"},domProps:{value:e.besoins.beneficiaire},on:{input:function(t){t.target.composing||e.$set(e.besoins,"beneficiaire",t.target.value)}}})])]),o("div",{staticClass:"form-row"},[o("div",{staticClass:"form-group col-md-6"},[o("label",{attrs:{for:"zoneFonctionnelle"}},[e._v(" Zone(s) fonctionnelle(s) ")]),o("input",{directives:[{name:"model",rawName:"v-model",value:e.besoins.zoneFonctionnelle,expression:"besoins.zoneFonctionnelle"}],staticClass:"form-control",attrs:{type:"text",id:"zoneFonctionnelle",placeholder:"?????"},domProps:{value:e.besoins.zoneFonctionnelle},on:{input:function(t){t.target.composing||e.$set(e.besoins,"zoneFonctionnelle",t.target.value)}}})]),o("div",{staticClass:"form-group col-md-6"},[o("label",{attrs:{for:"quartierFonctionnel"}},[e._v(" Quartier(s) fonctionnel(s) ")]),o("input",{directives:[{name:"model",rawName:"v-model",value:e.besoins.quartierFonctionnel,expression:"besoins.quartierFonctionnel"}],staticClass:"form-control",attrs:{type:"text",id:"quartierFonctionnel",placeholder:"?????"},domProps:{value:e.besoins.quartierFonctionnel},on:{input:function(t){t.target.composing||e.$set(e.besoins,"quartierFonctionnel",t.target.value)}}})])]),o("div",{staticClass:"form-row"},[o("div",{staticClass:"form-group col-md-6"},[o("label",{attrs:{for:"descriptionProjet"}},[e._v(" Description du projet ")]),o("textarea",{directives:[{name:"model",rawName:"v-model",value:e.besoins.descriptionProjet,expression:"besoins.descriptionProjet"}],staticClass:"form-control",attrs:{id:"descriptionProjet",rows:"5"},domProps:{value:e.besoins.descriptionProjet},on:{input:function(t){t.target.composing||e.$set(e.besoins,"descriptionProjet",t.target.value)}}})]),o("div",{staticClass:"form-group col-md-6"},[o("div",{staticClass:"row mt-4 ml-4"},[o("label",{attrs:{for:"dateMiseService"}},[e._v(" Date de mise en service souhaitée par le client ")]),o("Calendar",{attrs:{id:"dateMiseService",numberOfMonths:1},model:{value:e.besoins.dateMiseEnServiceSouhaite,callback:function(t){e.$set(e.besoins,"dateMiseEnServiceSouhaite",t)},expression:"besoins.dateMiseEnServiceSouhaite"}}),o("div",{staticClass:"col"},[o("label",[e._v(" Enjeux du projet ")]),o("InputNumber",{attrs:{mode:"decimal",showButtons:"",min:1,max:4},model:{value:e.besoins.enjeuxProjet,callback:function(t){e.$set(e.besoins,"enjeuxProjet",t)},expression:"besoins.enjeuxProjet"}})],1)],1)])]),o("div",{staticClass:"mt-5"},[o("h5",[e._v("Prérequis techniques")]),o("div",{staticClass:"form-row"},[o("div",{staticClass:"form-group col-md-4"},[o("label",{attrs:{for:"typeSI"}},[e._v("Type de SI")]),e._v(" "),o("br"),o("MultiSelect",{attrs:{id:"typeSI",options:e.typeSI,optionLabel:"value"},model:{value:e.besoins.typeSI,callback:function(t){e.$set(e.besoins,"typeSI",t)},expression:"besoins.typeSI"}})],1),o("div",{staticClass:"col-md-4"},[o("label",{attrs:{for:"commission"}},[e._v("Commission")]),o("br"),o("MultiSelect",{attrs:{id:"commission",options:e.value,optionLabel:"value"},model:{value:e.besoins.commissions,callback:function(t){e.$set(e.besoins,"commissions",t)},expression:"besoins.commissions"}})],1),o("div",{staticClass:"col-md-4"},[o("label",{attrs:{for:"reseauSupport"}},[e._v("Réseaux support")]),o("br"),o("MultiSelect",{attrs:{id:"reseauSupport",options:e.reseauSupport,optionLabel:"value"},model:{value:e.besoins.typeSI,callback:function(t){e.$set(e.besoins,"typeSI",t)},expression:"besoins.typeSI"}})],1)]),o("div",{staticClass:"bg-gris-module arrondi pb-3 mb-3"},e._l(e.systeme_information_modules,(function(t){return o("InfogerenceModule",{key:t.module_Id,attrs:{infogerence:e.infogerence,"niveau-hebergement":e.niveauHebergement,systeme_information_module:t}})})),1)]),o("div",{staticClass:"d-flex justify-content-between"},[o("button",{staticClass:"btn rounded-pill btn-primary",on:{click:function(t){return t.preventDefault(),e.prevStep(t)}}},[e._v(" Revenir à l'étape précedente ")]),o("button",{staticClass:"btn rounded-pill btn-primary float-right",on:{click:function(t){return t.preventDefault(),e.nextStep(t)}}},[e._v(" Enregistrer et passer à l'étape suivant ")])])]),e._v(" gitt ")])},i=[],s=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:" mx-n3 px-3 mb-2 pt-2 pb-4"},[o("h5",[e._v(" "+e._s(e.systeme_information_module.module_libelle))]),o("div",{staticClass:"form-row"},[o("div",{staticClass:"form-group col-md-4"},[o("label",{attrs:{for:"infoGerant"}},[e._v("Infogérant")]),e._v(" "),o("br"),o("input",{directives:[{name:"model",rawName:"v-model",value:e.infogerence.infogerant,expression:"infogerence.infogerant"}],staticClass:"form-control",attrs:{type:"text",id:"infoGerant"},domProps:{value:e.infogerence.infogerant},on:{input:function(t){t.target.composing||e.$set(e.infogerence,"infogerant",t.target.value)}}})]),o("div",{staticClass:"col-md-4"},[o("label",{attrs:{for:"hebergement"}},[e._v("Hébergement")]),o("br"),o("input",{directives:[{name:"model",rawName:"v-model",value:e.infogerence.hebergement,expression:"infogerence.hebergement"}],staticClass:"form-control",attrs:{type:"text",id:"hebergement"},domProps:{value:e.infogerence.hebergement},on:{input:function(t){t.target.composing||e.$set(e.infogerence,"hebergement",t.target.value)}}})]),o("div",{staticClass:"col-md-4"},[o("label",{attrs:{for:"niveauHerbergement"}},[e._v("Niveau d'hébergement")]),o("br"),o("MultiSelect",{attrs:{id:"niveauHerbergement",options:e.niveauHebergement,optionLabel:"value"},model:{value:e.infogerence.niveauHebergement,callback:function(t){e.$set(e.infogerence,"niveauHebergement",t)},expression:"infogerence.niveauHebergement"}})],1)])])},l=[],r={name:"InfogerenceModule",props:{infogerence:{},niveauHebergement:{},systeme_information_module:{}}},a=r,u=(o("d1c8"),o("2877")),c=Object(u["a"])(a,s,l,!1,null,"5fd792ad",null),m=c.exports,d={name:"Besoins",components:{InfogerenceModule:m},methods:{nextStep:function(){this.$router.push({name:"equipe"})},prevStep:function(){this.$router.push("")}},data:function(){return{systeme_information_modules:[{module_Id:2,module_libelle:"test projet module"},{module_Id:4,module_libelle:"Autre module encore"}],infoGerencesTableaux:[],infogerence:{infogerant:"",hebergement:"",niveauHebergement:[]},besoins:{autoriteClient:null,beneficiaire:null,zoneFonctionnelle:null,quartierFonctionnel:null,descriptionProjet:null,dateMiseEnServiceSouhaite:null,enjeuxProjet:null,typeSI:null,commissions:[],reseauxSupports:{},besoinsModules:[]},typeSI:[{value:"SIAG"},{value:"SIOC"},{value:"SIST"}],commissions:[{value:"Commision untel"},{value:"Commision bidule"},{value:"Commision truc"}],besoinModule:{infogerant:null,hebergement:null,niveauHebergement:null},niveauHebergement:[{value:"Or"},{value:"Argent"},{value:"Bronze"}],reseauSupport:[{value:"INTERNET"},{value:"INTRADEF"},{value:"INTRACED"}]}}},p=d,v=(o("93d0"),Object(u["a"])(p,n,i,!1,null,"5556b0bd",null));t["default"]=v.exports},"6b5b":function(e,t,o){},7081:function(e,t,o){},"8ce0":function(e,t,o){},9016:function(e,t,o){"use strict";o.r(t);var n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("form",{on:{submit:function(t){return t.preventDefault(),e.createProject(t)}}},[o("div",[o("Initialisation",{attrs:{list_libelle_fiche_siclade:e.list_libelle_fiche_siclade,"maturite-client":e.maturiteClient,"module-s-i":e.moduleSI,"number-of-module":e.numberOfModule,"priorite-pole":e.prioritePole,project:e.project,projects:e.projects,"remove-module-s-i":e.removeModuleSI,"type-module":e.typeModule}}),o("div",{staticClass:"pt-3"},[o("button",{staticClass:"btn rounded-pill btn-primary float-right",on:{click:function(t){return t.preventDefault(),e.nextStep(t)}}},[e._v(" Passer à l'étape suivant ")]),o("button",{staticClass:"btn rounded-pill btn-primary mr-3",on:{click:function(t){return t.preventDefault(),e.createProject(t)}}},[e._v(" Enregistrer le projet ")])])],1)])])},i=[],s=o("e6de"),l=o("36dc"),r=(o("f817"),{name:"InitialisationProject",components:{Besoins:l["default"],Initialisation:s["a"]},data:function(){return{steps:[{value:"Initialisation",icon:"init"},{value:"Besoins",icon:""},{value:"Equipe",icon:"people-fill"},{value:"Planification",icon:"plan"}],step:1,numberOfModule:1,maturiteClient:[{value:"M1"},{value:"M2"},{value:"M3"},{value:"M4"},{value:"M5"}],typeModule:[{value:"1"},{value:"2"},{value:"3"},{value:"4"},{value:"5"}],prioritePole:[{value:"P1"},{value:"P2"},{value:"P3"},{value:"P4"},{value:"P5"}],projects:[{type:"PMV",value:"PMV"},{type:"Fab Num",value:"Fab Num"},{type:"POC",value:"POC"},{type:"Interne",value:"Interne"}],list_libelle_fiche_siclade:[{value:"SERENA"},{value:"SERENA2"},{value:"SERENA3"},{value:"SERENA4"}],project:{systeme_information_libelle:"",systeme_information_libelle_fiche_siclade:[],systeme_information_libelle_court:"",systeme_information_tag_projet:[],systeme_information_list_module:[]},moduleSI:{module_libelle:"",module_libelle_court:"",module_type:"",module_maturite_client:{},module_priorisation_client:"",module_priorite_pole:{},module_commentaire_pole:""}}},methods:{nextStep:function(){this.step++,this.$router.push({name:"besoins"})},addModule:function(){console.log("ds addModule"),this.numberOfModule+=1,console.log(this.numberOfModule)},removeModuleSI:function(){console.log("ds le remove")},createProject:function(){this.project.systeme_information_list_module.push(this.moduleSI),console.log("le projet",this.project),this.$store.dispatch("projects/createProject",this.project)}}}),a=r,u=(o("da37"),o("2877")),c=Object(u["a"])(a,n,i,!1,null,"6ce2e477",null);t["default"]=c.exports},"93d0":function(e,t,o){"use strict";var n=o("7081"),i=o.n(n);i.a},d1c8:function(e,t,o){"use strict";var n=o("8ce0"),i=o.n(n);i.a},da37:function(e,t,o){"use strict";var n=o("6b5b"),i=o.n(n);i.a}}]);
//# sourceMappingURL=chunk-024475fa.cb75a1af.js.map