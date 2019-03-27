import produce from 'immer';
import { 
  ADD_COURSE_BEGIN,
  ADD_COURSE_SUCCESS, 
  ADD_COURSE_ERROR,
  LOAD_COURSES_BEGIN,
  LOAD_COURSES_SUCCESS,
  LOAD_COURSES_ERROR
} from './actions';

const initialState = {
  courses: [],
  saveInProgress: false,
  coursesLoading: false,
  saveError: null,
  coursesError: null
}

const reducer = produce((draft, action) => {
  switch(action.type) {
    case ADD_COURSE_SUCCESS:
      draft.saveInProgress = false;
      draft.courses.push(action.payload);
      return;
    case ADD_COURSE_BEGIN:
      draft.saveInProgress = true;
      draft.saveError = null;
      return;
    case ADD_COURSE_ERROR:
      draft.saveInProgress = false;
      draft.saveError = action.saveError;
      return;
    case LOAD_COURSES_BEGIN:
      draft.coursesLoading = true;
      return;
    case LOAD_COURSES_SUCCESS:
      draft.coursesLoading = false;
      draft.courses = action.payload;
      return;
    case LOAD_COURSES_ERROR:
      draft.coursesLoading = false;
      draft.coursesError = action.saveError;
      return;
    default:
      return;
  }
}, initialState)

export default reducer;