import el from "element-ui/src/locale/lang/el";

export default {
  addId(state,id){
    if (state.cartId.indexOf(id) == -1){
      state.cartId.push(id)
    }else {
      state.cartId.splice(state.cartId.indexOf(id),1)
    }
  },
  notAll(state){
    state.cartId=[]
  },
  selectAll(state,payload){
    state.cartId=[];
    state.cartId.push(...payload)
  },
  emptyId(state){
    state.cartId=[]
  }
}
