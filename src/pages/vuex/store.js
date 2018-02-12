import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

import userModule from './modules/userModule'
import emailModule from './modules/emailModule'

export default new Vuex.Store({
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
    modules: {
        userModule: userModule,
        emailModule: emailModule
    }
})