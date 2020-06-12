const state = {
  deleteDialog: false,
  editDialog: false,
};

const getters = {
  getEditItem: (state) => state.editItem
};

const mutations = {
  OPEN_DIALOG: (state, dialogType) => {
    state[dialogType] = true;
  },
  CLOSE_DIALOG: (state, dialogType) => {
    state[dialogType] = false;
  }
};

const actions = {
  openDeleteDialog: ({ commit }) => {
    commit("OPEN_DIALOG", "deleteDialog");
  },
  openEditDialog: ({ commit }) => {
    commit("OPEN_DIALOG", "editDialog");
  },
  closeDeleteDialog: ({ commit }) => {
    commit("CLOSE_DIALOG", "deleteDialog");
  },
  closeEditDialog: ({ commit }) => {
    commit("CLOSE_DIALOG", "editDialog");
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
