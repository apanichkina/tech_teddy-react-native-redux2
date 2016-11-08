

const initialState = {
  count: 0
};

export default function counter(state = initialState, action = {}) {

  console.log("Reducer: ", state, action);

  switch (action.type) {
    case "INCREMENT":
      console.log("do increment", state,
          {
            ...state,
            count: state.count + 1
          }
      );

      return {
        ...state,
        count: state.count + 1
      };
    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1
      };
    default:
      return state;
  }
}
