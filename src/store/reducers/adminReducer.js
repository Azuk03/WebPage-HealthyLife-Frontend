import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: true,
  gender: [],
  role: [],
  positions: [],
  users: [],
  topDoctors: [],
  allDoctors: [],
  allScheduleTime: [],

  allRequiredDoctorInfor: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      let copyStatewithGenderS = { ...state };
      copyStatewithGenderS.isLoadingGender = true;
      return {
        ...copyStatewithGenderS,
      };

    case actionTypes.FETCH_GENDER_SUCCESS:
      let copyState = { ...state };
      copyState.gender = action.data;
      copyState.isLoadingGender = false;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      let copyStatewithGenderF = { ...state };
      copyStatewithGenderF.isLoadingGender = false;
      copyStatewithGenderF.gender = [];
      return {
        ...copyStatewithGenderF,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      state.positions = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.role = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      state.role = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_FAILED:
      state.users = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      state.topDoctors = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_FAILED:
      state.topDoctors = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      state.allDoctors = action.dataDoctors;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_FAILED:
      state.allDoctors = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
      state.allScheduleTime = action.dataTime;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
      state.allScheduleTime = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
      state.allRequiredDoctorInfor = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
      state.allRequiredDoctorInfor = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
