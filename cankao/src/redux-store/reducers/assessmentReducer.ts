import { initialState } from "./initialState";
import {
  SET_TEXT_INPUT_VALUES,
  TOGGLE_MODAL,
  SET_PAGE,
  SET_TRAIN_SCORE,
  SET_CURRENT_LESSON,
} from "../actions/actionTypes";

const assessmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TEXT_INPUT_VALUES:
      return { ...state, textInputValues: action.payload };
    case TOGGLE_MODAL:
      return {
        ...state,
        visible: !state.visible,
        isTraining: !state.isTraining,
      };
    case SET_PAGE:
      return { ...state, currentPage: action.payload };
    case SET_TRAIN_SCORE:
      return { ...state, trainScore: action.payload };
    case SET_CURRENT_LESSON:
      return { ...state, currentLesson: action.payload };
    default:
      return state;
  }
};

export default assessmentReducer;
