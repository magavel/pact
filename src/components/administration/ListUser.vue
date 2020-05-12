<template>
    <div>
        <DataTable ref="dt" :value="users" :paginator="true" :rows="10" selectionMode="single"  dataKey="systeme_information_id" :reorderableColumns="true" >
            <template #loading>
                Loading records, please wait...
            </template>
            <template #header>
                Liste des utilisateurs
            </template>
            <Column field="utilisateur_id" header="ID" :sortable="true" filterMatchMode="gte"></Column>
            <Column field="utilisateur_username" header="username" :sortable="true" filterMatchMode="gte"></Column>
            <Column field="utilisateur_email" header="Email" :sortable="true" filterMatchMode="gte"> </Column>
            <Column field="utilisateur_roles" header="Roles" :sortable="true" filterMatchMode="gte">
                <template #body="slotProps">
                    <ul>
                        <li v-for="role in slotProps.data.utilisateur_roles">
                            {{role.name}}
                        </li>
                    </ul>
                </template></Column>
            <Column field="utilisateur_equipes" header="Equipes" :sortable="true" filterMatchMode="gte"></Column>
            <Column field="utilisateur_created_date" header="Créé le" :sortable="true" >

                <template #body="slotProps">
                    {{moment(slotProps.data.utilisateur_created_date).format('DD/MM/YYYY')}}
                </template>
            </Column>
            <Column field="utilisateur_last_modified_date" header="Dernière modification">
                <template #body="slotProps">
                    le {{moment(slotProps.data.utilisateur_last_modified_date).format('DD/MM/YYYY')}} par {{ slotProps.data.utilisateur_last_modified_by}}
                </template>
            </Column>
            <Column field="" header="Actions">
                <template #body="slotProps">
                    <div class="d-flex flex-nowrap">
                        <Button type="button" icon="pi pi-upload" class="p-button-secondary" @click="upload(slotProps.data.systeme_information_id)"></Button>
                        <Button type="button" icon="pi pi-pencil" class="p-button-secondary"></Button>
                        <Button type="button" icon="pi pi-briefcase" class="p-button-secondary" @click="exportCSV($event)" ></Button>
                    </div>
                </template>
            </Column>
        </DataTable>

        <!--        {{ projects }}-->

    </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    computed:mapState( {
      users: state=> state.users.users,
    }),
    created() {
      this.$store.dispatch('users/getAllUsers');
    },
    data() {
      return {
        filters: {},
      }
    },
    name: 'ListUser'
  }
  </script>
