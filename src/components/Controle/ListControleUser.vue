<template>
    <div>
        <TreeTable :value="nodes" selectionMode="checkbox" >
            <Column field="mission" header="mission" :expander="true"></Column>
            <Column field="activite" header="activite"></Column>
            <Column v-for="col of columns" :key="col.field"
                     :header="col.header" :expander="col.expander">
                    <template #body="slotProps">
                        <span class="d-inline-block" tabindex="0" data-toggle="tooltip" :title="commentaire(col,slotProps)">
                       <div > {{meth(col,slotProps)}}</div>
                        </span>
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

            this.$store.dispatch('users/getControleSaisies');

            if (this.controle.data === undefined) {
            if (localStorage.getItem('controles')) {
                try {
                    this.local = JSON.parse(localStorage.getItem('controles'));
                    this.nodes = this.local.data;
                    this.columns = this.local.colunns;
                } catch(e) {
                    localStorage.removeItem('controles');
                }
            } }  else {
                this.$store.dispatch('users/getControleSaisies');
                this.test();
            }

        },
        data() {
            return {
                nodes : null,
                columns : null,
                local: null,

            }
        },
        methods : {
            test() {
                this.nodes = this.controle.data;
                this.columns = this.controle.colunns;
                console.log(this.controle.data.length);
                console.log(this.controle.data.length);
            },
            meth(col,slotProps) {
                return eval("slotProps.node.data."+col.field.toString()+".charge");
            },
            commentaire(col,slotProps) {
                return eval("slotProps.node.data."+col.field.toString()+".commentaire");
            }
        }
    }

  </script>

<style lang="scss" scoped>
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


