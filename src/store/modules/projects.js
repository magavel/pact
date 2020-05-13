import projectService from '../../services/project.service';
import router from '../../router'

// initial state
const state = {
  projects: [], // un tableau de l'ensemble des projets
  projet: {},
  errors: [], // log des erreurs
  success: [], // log des success
  step: 1
};


const mutations = {
  UPDATE_PROJET(state, project) {
    state.projet = project.data;
  },
  GET_ALL_PROJECTS(state, projects) {
    state.projects = projects.data;
  },
  CREATE_PROJECT(state, project) {
    state.project = [ project, ...state.project ];
  },
  CREATE_ERROR(state, error) {
    state.errors = [ error, ...state.errors ];
  },
  CREATE_SUCCESS(state, succes) {
    state.success = [ succes, ...state.success ];
  },
    UPDATE_STEP (state, value) {
      state.steps= value;
    }
};


const actions = {
  updateProject({commit}, project) {
    projectService.updateProjet(project)
        .then((response)=> {
          console.log(response);
          commit('UPDATE_PROJET', projet);
        });
  },
  createProject({ commit }, project) {
    projectService.createProject(project)
        .then((response) => {
          if(response.status === 201) {
            console.log('data', response.data);
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
  getAllProjects({ commit }) {
    projectService.getAllProjects()
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
