import actionTypes from "./actionTypes";
import { getAllCodeService, createNewUserService, getAllUsers, deleteUserService, editUserService, getTopDoctorHomeService, getAllDoctors, saveDetailDoctor, getAllSpecialties, getAllClinics } from "../../services/userService";
import { toast } from "react-toastify";


export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      dispatch(fetchGenderFailed());
      console.log("fetchGenderStart: ", error);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (error) {
      dispatch(fetchPositionFailed());
      console.log("fetchPositionFailed: ", error);
    }
  };
};

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (error) {
      dispatch(fetchRoleFailed());
      console.log("fetchRoleFailed: ", error);
    }
  };
};

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Create a new user succeed!")
        dispatch(createUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(createUserFailed());
      }
    } catch (error) {
      dispatch(createUserFailed());
      console.log("createUserFailed: ", error);
    }
  };
}

export const createUserSuccess = () => ({
  type: 'CREATE_USER_SUCCESS',
})

export const createUserFailed = () => ({
  type: 'CREATE_USER_FAILED',
})

export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        toast.error("Fetch all users error!")
        dispatch(fetchAllUsersFailed());
      }
    } catch (error) {
      toast.error("Fetch all users error!")
      dispatch(fetchAllUsersFailed());
      console.log("fetchAllUsersFailed: ", error);
    }
  };
};

export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});

export const fetchAllUsersFailed = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const deleteAUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.errCode === 0) {
        toast.success("Delete user succeed!")
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Delete user failed")
        dispatch(deleteUserFailed());
      }
    } catch (error) {
      toast.error("Delete user failed")
      dispatch(deleteUserFailed());
      console.log("deleteAUserFailed: ", error);
    }
  };
}

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
})

export const editAUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Updated user succeed!")
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Updated user failed")
        dispatch(editUserFailed());
      }
    } catch (error) {
      toast.error("Updated user failed")
      dispatch(editUserFailed());
      console.log("editAUserFailed: ", error);
    }
  };
}

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
})

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
})

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService(9);
      if(res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
          data: res.data
        })
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
        })
      }
    } catch (error) {
        console.log('FETCH_TOP_DOCTOR_FAILED: ',error);
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_FAILED
        })
    }
  };
}

export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      if(res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
          dataDoctors: res.data
        })
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
        })
      }
    } catch (error) {
        console.log('FETCH_ALL_DOCTOR_FAILED: ',error);
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_FAILED
        })
    }
  };
}

export const saveDetailDoctorAction = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctor(data);
      if(res && res.errCode === 0) {
        toast.success("Save info detail doctor succeed!")
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
          dataDoctors: res.data
        })
      } else {
        toast.error("Save info detail doctor failed!")
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
        })
      }
    } catch (error) {
        toast.error("Save info detail doctor failed!")
        console.log('SAVE_DETAIL_DOCTOR_FAILED: ',error);
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
        })
    }
  };
}

export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService('TIME');
      if(res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data
        })
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
        })
      }
    } catch (error) {
        console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED: ',error);
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
        })
    }
  };
}

export const getRequiredDoctorInfor = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START });
      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");
      let resSpecialty = await getAllSpecialties();
      let resClinic = await getAllClinics();
      if (resPrice && resPrice.errCode === 0 
        && resPayment && resPayment.errCode === 0
        && resProvince && resProvince.errCode === 0
        && resSpecialty && resSpecialty.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resSpecialty: resSpecialty.data,
          resClinic: resClinic.data
        }
        dispatch(fetchRequiredDoctorInforSuccess(data));
      } else {
        dispatch(fetchRequiredDoctorInforFailed())
      }
    } catch (error) {
      dispatch(fetchRequiredDoctorInforFailed());
      console.log("fetchRequiredDoctorInfor: ", error);
    }
  };
};

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
  data: allRequiredData,
});

export const fetchRequiredDoctorInforFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
});