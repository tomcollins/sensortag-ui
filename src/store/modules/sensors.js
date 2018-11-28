// import shop from '../../api/shop'

// initial state
const state = {
  isConnected: false,
  sensorIds: []
}

// getters
const getters = {
  // sensors: () => {
  //   return state.sensors;
  // }
}

// actions
const actions = {
//   checkout ({ commit, state }, products) {
//     const savedCartItems = [...state.items]
//     commit('setCheckoutStatus', null)
//     // empty cart
//     commit('setCartItems', { items: [] })
//     shop.buyProducts(
//       products,
//       () => commit('setCheckoutStatus', 'successful'),
//       () => {
//         commit('setCheckoutStatus', 'failed')
//         // rollback to the cart saved before sending the request
//         commit('setCartItems', { items: savedCartItems })
//       }
//     )
//   },

//   addProductToCart ({ state, commit }, product) {
//     commit('setCheckoutStatus', null)
//     if (product.inventory > 0) {
//       const cartItem = state.items.find(item => item.id === product.id)
//       if (!cartItem) {
//         commit('pushProductToCart', { id: product.id })
//       } else {
//         commit('incrementItemQuantity', cartItem)
//       }
//       // remove 1 item from stock
//       commit('products/decrementProductInventory', { id: product.id }, { root: true })
//     }
//   }
}

// mutations
const mutations = {
    SOCKET_CONNECT(state, { client }) {
      console.log('sensors.SOCKET_CONNECT');
      // state.isConnected = true;
    },
    SOCKET_DISCONNECT(state) {
        console.log('sensors.SOCKET_DISCONNECT');
        // state.isConnected = false;
        // state.sensorIds = [];
    },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}