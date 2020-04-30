import projectService from '../../services/project.service';

// initial state
const state = {
  projects: [], // un tableau de l'ensemble des projets
  errors: [], // log des erreurs
  success: [], // log des success
};


const mutations = {
  GET_ALL_PROJECTS(state, projects) {
    state.projects = projects;
  },
  CREATE_PROJECT(state, project) {
    state.projects = [ project, ...state.project ];
  },
  CREATE_ERROR(state, error) {
    state.errors = [ error, ...state.errors ];
  },
  CREATE_SUCCESS(state, succes) {
    state.success = [ succes, ...state.success ];
  },
};


const actions = {
  createProject({ commit }, project) {
    projectService.createProject(project)
        .then((response) => {
          if(response.status === 201) {
            console.log('data', response.data);
            console.log('les routes', this.$route , this.$router)
            this.$router.push('test');
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
        }
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
