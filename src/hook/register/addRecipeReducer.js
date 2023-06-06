export const INITIAL_STATE = {
  title: {
    isErr: false,
    errMsg: "",
    value: "",
  },
  ingredients: {
    isErr: false,
    errMsg: "",
    value: "",
  },
  photo: {
    value: "",
  },
  previewPhoto: {
    value: "",
  },
  isDisabled: false,
  isLoading: false,
  errMsgApi: {
    isErr: false,
    errMsg: "",
  },
  isModalErrOpen: false,
  isModalSuccessOpen: false,
};

export const addRecipeReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: {
          ...action.payload.value,
        },
      };
    case "REMOVE_IMAGE":
      return {
        ...state,
        photo: { value: null },
        previewPhoto: { value: null },
      };
    case "HANDLE_DISABLED":
      return {
        ...state,
        isDisabled: true,
      };
    case "HANDLE_UNDISABLED":
      return {
        ...state,
        isDisabled: false,
      };
    case "FETCH_START":
      return {
        ...state,
        isLoading: true,
        errMsgApi: {
          isErr: false,
          errMsg: "",
        },
        isModalErrOpen: false,
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
        isModalErrOpen: false,
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
        isModalErrOpen: true,
        isModalSuccessOpen: false,
      };
    case "CLOSE_MODAL_ERR":
      return {
        ...state,
        isModalErrOpen: false,
      };
    default:
      return state;
  }
};
