export const INITIAL_STATE = {
  name: {
    isErr: false,
    errMsg: "",
    value: "",
  },
  email: {
    isErr: false,
    errMsg: "",
    value: "",
  },
  phone: {
    isErr: false,
    errMsg: "",
    value: "",
  },
  pwd: {
    isErr: false,
    errMsg: "",
    value: "",
  },
  showPwd: false,
  confirmPwd: {
    isErr: false,
    errMsg: "",
    value: "",
  },
  isChecked: false,
  isDisabled: false,
  isLoading: false,
  errMsgApi: {
    isErr: false,
    errMsg: "",
  },
  isErrModalOpen: false,
  isModalSuccessOpen: false,
};

export const formReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: {
          // ...state[action.payload.name],
          // isErr: false,
          // errMsg: "",
          value: action.payload.value,
        },
        [action.payload.email]: {
          value: action.payload.value,
        },
        [action.payload.phone]: {
          value: action.payload.value,
        },
        [action.payload.pwd]: {
          value: action.payload.value,
        },
        [action.payload.confirmPwd]: {
          value: action.payload.value,
        },
      };
    case "TOGGLE_SHOW_PASSWORD":
      return {
        ...state,
        showPwd: !state.showPwd,
      };
    case "TOGGLE_CHECKBOX":
      return {
        ...state,
        isChecked: !state.isChecked,
      };
    case "HANDLE_DISABLED":
      return {
        ...state,
        isDisabled: action.payload.isDisabled,
      };

    case "FETCH_START":
      return {
        ...state,
        isLoading: true,
        errMsgApi: {
          isErr: false,
          errMsg: "",
        },
        isErrModalOpen: false,
        isModalSuccessOpen: false,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        errMsgApi: {
          isErr: false,
          errMsg: "",
        },
        isErrModalOpen: false,
        isModalSuccessOpen: true,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        isLoading: false,
        errMsgApi: {
          isErr: true,
          errMsg: action.payload.errMsg,
        },
        isErrModalOpen: true,
        isModalSuccessOpen: false,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        isErrModalOpen: false,
      };
    case "FORCE_STOP":
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
