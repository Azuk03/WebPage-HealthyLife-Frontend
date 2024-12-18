import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import './HomeFooter.scss'

class HomeFooter extends Component {
  render() {
    return (
      <Fragment>
        <div className="home-footer">
            <p>&copy; 2024 Trần Quang Hiếu.More infomation,Please <a target="_blank" href="https://github.com/Azuk03">&#8594;click here!&#8592;</a></p>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
