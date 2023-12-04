export default {
  state: {
    arr: [10, 20, 30]
  },
  actions: {
    arr_push(newState: { arr: number[] }, action: { type: string, val: number }) {
      newState.arr.push(action.val)
    },
    arr_pop(newState: { arr: number[] }, action: { type: string, val: number }) {
      newState.arr = newState.arr.filter(value => value != action.val)
    }
  }
}
