import projectService from '../../services/project.service';
import router from '../../router';


// initial state
const state = {
  projects: [], // un tableau de l'ensemble des projets
    projetsMetaData: {},
  projet: {},
  errors: [], // log des erreurs
  success: [], // log des success
  step: null
};


const mutations = {
  UPDATE_PROJET(state, project) {
    state.projet = project.data;
  },
  GET_ALL_PROJECTS(state, projects) {
    state.projects = projects.data;
    state.projetsMetaData = projects.metadata;
  },
  CREATE_PROJECT(state, project) {
    state.project =  project;
  },
  CREATE_ERROR(state, error) {
    state.errors = [ error, ...state.errors ];
  },
  CREATE_SUCCESS(state, succes) {
    state.success = [ succes, ...state.success ];
  },
    UPDATE_STEP (state, value) {
        state.step= value;
    },
};


const actions = {
    getProjectById({commit}, id) {
        projectService.getProjectById(id)
            .then((response) =>{
                console.log('resp dans action getProjectById ',response)
            })
            .catch(err => {
                console.error(err);
            })
    },
  updateProject({commit}, project) {
    projectService.updateProjet(project)
        .then((response)=> {
          commit('UPDATE_PROJET', projet);
        });
  },
  createProject({ commit }, project) {
    projectService.createProject(project)
        .then((response) => {
          if(response.status === 201) {
            console.log('data', response.data);
            //this.$toast.add({severity:'success', summary: 'Succes', detail:'Fiche projet créé en BDD', life: 3000});
            router.push({ name: 'besoins', params:response.data });
          }
          else {
            console.log('pas de status 201, pb avec le serveur', response.status)
          }
        })
      .then(() => {
        commit('CREATE_PROJECT', project);
      });
  },
  getAllProjects({ commit }, pagination) {
    projectService.getAllProjects(pagination)
      .then((res) => {
        const succes = {
          date: new Date(),
          message: 'lecture de tous les projets',
        };
        commit('GET_ALL_PROJECTS', res.data);
        commit('CREATE_SUCCESS', succes);

      })
      .catch((err) => {
        const error = {
          date: new Date(),
          message: `echec sur la récuperation 
            des projets dans la méthode 
            getAllProjects: ${err.message}`,
        };
        commit('CREATE_ERROR', error);
      });
  },
};


export default {
  namespaced: true,
  state,
  actions,
  mutations
}
