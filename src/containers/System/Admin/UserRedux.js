import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES, CRUD_ACTION } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",

      isOpen: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",

      action: CRUD_ACTION.CREATE,
      userEditId: ""
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;

      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].key : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : "",
      });
    }

    if (prevProps.listUsers !== this.props.listUsers) {
      let arrGenders = this.props.genderRedux;
      let arrPositions = this.props.positionRedux;
      let arrRoles = this.props.roleRedux;
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : "",
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].key : "",
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : "",
        avatar: "",
        action: CRUD_ACTION.CREATE,
      });
    }
  }

  handleOnChangeImage = (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let objectURL = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectURL,
        avatar: file,
      });
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgURL) {
      return;
    }
    this.setState({
      isOpen: true,
    });
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) {
      return;
    }

    let { action } = this.state;
    if (action === CRUD_ACTION.CREATE) {
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
      });
    }
    if (action === CRUD_ACTION.EDIT) {
      this.props.editUserRedux({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        // avatar: this.state.avatar
      });
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let regexError = {};
    let arrCheck = [
      "email",
      ...(this.state.action === CRUD_ACTION.CREATE ? ["password"] : []),
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("Missing required input: " + arrCheck[i]);
        break;
      }
    }

    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.state[arrCheck[0]])) {
      isValid = false;
      regexError.email = "Please enter a valid email address";
      alert(regexError.email);
    }

    let passwordRegex = /^.{6,}$/;
    if (arrCheck.includes("password") && !passwordRegex.test(this.state[arrCheck[1]])) {
      isValid = false;
      regexError.password = "Password must be at least 6 characters long.";
      alert(regexError.password);
    }

    let phoneRegex = /^(0|\+84)[3-9][0-9]{8}$/;
    if (!phoneRegex.test(arrCheck.includes("password") ? this.state[arrCheck[4]] : this.state[arrCheck[3]])) {
      isValid = false;
      regexError.phoneNumber =
        "Invalid phone number. Please enter a valid 10-digit number starting with 0 or +84.!";
      alert(regexError.phoneNumber);
    }

    return isValid;
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => console.log("State: ", this.state)
    );
  };

  handleEditUserFromParent = (user) => {
    console.log("parent: ", user);
    this.setState({
      email: user.email,
      password: "cannotchange",
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      gender: user.gender,
      position: user.positionId,
      role: user.roleId,
      avatar: "",
      action: CRUD_ACTION.EDIT,
      userEditId: user.id
    });
  };

  render() {
    let genders = this.state.genderArr;
    let language = this.props.language;
    let isLoadingGender = this.props.isLoadingGender;
    let roles = this.state.roleArr;
    let positions = this.state.positionArr;
    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      position,
      role,
      avatar,
    } = this.state;

    return (
      <div className="user-redux-container">
        <div className="title">User-Redux</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {isLoadingGender === true ? "Loading Gender..." : ""}
              </div>
              <div className="col-12 my-3">
                <FormattedMessage id="manage-user.add" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    this.onChangeInput(e, "email");
                  }}
                  disabled={this.state.action===CRUD_ACTION.EDIT ? true : false}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    this.onChangeInput(e, "password");
                  }}
                  disabled={this.state.action===CRUD_ACTION.EDIT ? true : false}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.first-name" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    this.onChangeInput(e, "firstName");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.last-name" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    this.onChangeInput(e, "lastName");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.phone-number" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => {
                    this.onChangeInput(e, "phoneNumber");
                  }}
                />
              </div>
              <div className="col-9">
                <label>
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={address}
                  onChange={(e) => {
                    this.onChangeInput(e, "address");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select
                  className="form-control"
                  onChange={(e) => {
                    this.onChangeInput(e, "gender");
                  }}
                  value={gender}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index} value={item.key}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select
                  className="form-control"
                  onChange={(e) => {
                    this.onChangeInput(e, "position");
                  }}
                  value={position}
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => {
                      return (
                        <option key={index} value={item.key}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.role" />
                </label>
                <select
                  className="form-control"
                  onChange={(e) => {
                    this.onChangeInput(e, "role");
                  }}
                  value={role}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => {
                      return (
                        <option key={index} value={item.key}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.image" />
                </label>
                <div className="preview-img-container">
                  <input
                    id="previewImg"
                    type="file"
                    hidden
                    onChange={(event) => this.handleOnChangeImage(event)}
                  />
                  <label className="label-upload" htmlFor="previewImg">
                    Tải ảnh <i className="fas fa-upload"></i>
                  </label>
                  <div
                    className="preview-image"
                    style={{
                      backgroundImage: `url(${this.state.previewImgURL})`,
                    }}
                    onClick={() => this.openPreviewImage()}
                  ></div>
                </div>
              </div>
              <div className="col-12 my-3">
                <button
                  className={
                    this.state.action === CRUD_ACTION.EDIT
                      ? "btn btn-warning"
                      : "btn btn-primary"
                  }
                  onClick={() => this.handleSaveUser()}
                >
                  {this.state.action === CRUD_ACTION.EDIT ? (
                    <FormattedMessage id="manage-user.edit" />
                  ) : (
                    <FormattedMessage id="manage-user.save" />
                  )}
                </button>
              </div>
              <div className="col-12">
                <TableManageUser
                  handleEditUserFromParent={this.handleEditUserFromParent}
                  action={this.state.action}
                />
              </div>
            </div>
          </div>
        </div>

        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.gender,
    isLoadingGender: state.admin.isLoadingGender,
    roleRedux: state.admin.role,
    positionRedux: state.admin.positions,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    editUserRedux: (data) => dispatch(actions.editAUser(data)),
    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
