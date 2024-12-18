import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import _ from 'lodash';

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
        usersRedux: []
    };
  }

 componentDidMount() {
    this.props.fetchUserRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        usersRedux: this.props.listUsers
      })
    }
  }

  handleDeleteUser = (user) => {
    this.props.deleteAUserRedux(user.id)
  }

  handleEditUser = (user) => {
      this.props.handleEditUserFromParent(user)
  }


  render() {
    console.log('User', this.props.listUsers);
    let arrUsers = this.state.usersRedux;
    return (
          <table id="table-manage-user">
            <tr>
              <th>Email</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
            {arrUsers && arrUsers.length > 0 &&
              arrUsers.map((item,index) => {
                return (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button className="btn-edit" onClick={() => this.handleEditUser(item)}>
                        <i class="far fa-edit"></i>
                      </button>
                      <button className="btn-delete" onClick={() => this.handleDeleteUser(item)} >
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </table>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)) 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
