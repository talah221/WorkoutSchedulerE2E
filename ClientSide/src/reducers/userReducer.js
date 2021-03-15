let localLoggedinUser = null;
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

const initialState = {
  loggedInUser: localLoggedinUser,
};

export default function (state = initialState, action = {}) {
  window.gUser = state.loggedInUser
  switch (action.type) {
    case 'SET_USER':
      return { ...state, loggedInUser: action.user };
    case 'USER_REMOVE':
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.userId),
      };
    default:
      return state;
  }
}
