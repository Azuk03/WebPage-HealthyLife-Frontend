import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModal: false,
      isOpenEditModal: false,
      userEdit: {}
    };
  }

  async componentDidMount() {
    await this.getAllUserFromReact();
  }

  getAllUserFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };

  toggleEditUserModal = () => {
    this.setState({
      isOpenEditModal: !this.state.isOpenEditModal,
    });
  }

  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if(response && response.errCode !== 0 ) {
        alert(response.message)
      } else {
        await this.getAllUserFromReact();
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  handleDeleteUser = async (user) => {
      try {
        let res = await deleteUserService(user.id);
        if(res && res.errCode === 0) {
            await this.getAllUserFromReact();
        }else {
          alert(res.errCode);
        }
      } catch (error) {
        console.log(error)
      }
  }

  handleEditUser = (user) => {
    this.setState({
      isOpenEditModal: true,
      userEdit: user
    })
  }

  EditUser = async (user) => {
    try {
      let res = await editUserService(user);
      if(res&&res.errCode === 0 ) {
        this.setState({
          isOpenEditModal: false
        })
        await this.getAllUserFromReact()
      }else {
        alert(res.errCode)
      }    
    } catch (error) {
        console.log(error)
    }
     
  }

  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModal}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        {
        this.state.isOpenEditModal &&
        <ModalEditUser
          isOpen={this.state.isOpenEditModal}
          toggleFromParent={this.toggleEditUserModal}
          currentUser = {this.state.userEdit}
          editUser = {this.EditUser}
        />
        }
        <div className="title text-center">Manage users</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i class="fas fa-plus"></i> Add new users
          </button>
        </div>
        <div className="users-table mt-3 mx-4">
          <table id="customers">
            <tr>
              <th>Email</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
            {arrUsers &&
              arrUsers.map((item, index) => {
                return (
                  <tr>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button className="btn-edit" onClick={() => {this.handleEditUser(item)}}>
                        <i class="far fa-edit"></i>
                      </button>
                      <button className="btn-delete" onClick={() => {this.handleDeleteUser(item)}}>
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
