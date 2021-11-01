import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadCourseSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses: courses }; //since payload name is courses, it could be shorthand
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course: course };
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course: course };
}

export function deleteCourseOptimistic(course) {
  return { type: types.DELETE_COURSE_OPTIMISTIC, course: course };
}

export function loadCourses() {
  //every thunk returns a function that takes dispatch as arg
  //we dont't have to pass dispatch ourselves, redux thunk injects dispatch
  return function (dispatch) {
    dispatch(beginApiCall()); //include parens to actually make a call!
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCourseSuccess(courses)); //dispatch action after promise from api call returns
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
//although we pass the course from the form, we could access entire redux store with getState
//without passing in data to the thunk. The second param getState is optional.
//In this case it's not necessary
export function saveCourse(course) {
  // eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall()); //include parens to actually make a call!
    return courseApi
      .saveCourse(course)
      .then((savedCourse) => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

//here we being optimistic: we dispatch first, make api call second
export function deleteCourse(course) {
  return function (dispatch) {
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourse(course.id);
  };
}
