import {
  SET_TEXT_INPUT_VALUES,
  TOGGLE_MODAL,
  SET_PAGE,
  SET_TRAIN_SCORE,
  SET_CURRENT_LESSON,
} from "./actionTypes";

export const setTextInputValues = (values) => ({
  type: SET_TEXT_INPUT_VALUES,
  payload: values,
});

export const toggleModal = () => ({
  type: TOGGLE_MODAL,
});

export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page,
});

export const setTrainScore = (score) => ({
  type: SET_TRAIN_SCORE,
  payload: score,
});

export const setCurrentLesson = (lesson) => ({
  type: SET_CURRENT_LESSON,
  payload: lesson,
});
