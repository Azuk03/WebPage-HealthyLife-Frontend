import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import {LANGUAGES} from '../../utils';
import { changeLanguageApp } from "../../store/actions/appActions";
import { withRouter } from "react-router-dom";

class HomeHeader extends Component {

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  }

  returnToHome = () => {
    if(this.props.history) {
      this.props.history.push(`/home`)
    }
  }

  render() {
    let language = this.props.language;
    return (
      <Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div className="header-logo" onClick={() => this.returnToHome()}></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b> <FormattedMessage id="homeheader.specialty"/></b>
                </div>
                <div className="subs-title"><FormattedMessage id="homeheader.finddoctorbyspecialty"/></div>
              </div>
              <div className="child-content">
                <div>
                  <b><FormattedMessage id="homeheader.healthcare-facility"/></b>
                </div>
                <div className="subs-title"><FormattedMessage id="homeheader.choose-clinic"/></div>
              </div>
              <div className="child-content">
                <div>
                  <b><FormattedMessage id="homeheader.doctor"/></b>
                </div>
                <div className="subs-title"><FormattedMessage id="homeheader.choose-doctor"/></div>
              </div>
              <div className="child-content">
                <div>
                  <b><FormattedMessage id="homeheader.medical-package"/></b>
                </div>
                <div className="subs-title"><FormattedMessage id="homeheader.general-check-up"/></div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i> <FormattedMessage id="homeheader.support"/>
              </div>
              <div className={language === LANGUAGES.VI ? "language-vi active" : "language-vi"}><span onClick={() => {this.changeLanguage(LANGUAGES.VI)}}>VN</span></div>
              <div className={language === LANGUAGES.EN ? "language-en active" : "language-en"}><span onClick={() => {this.changeLanguage(LANGUAGES.EN)}}>EN</span></div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && 
        <div className="home-header-banner">
          <div className="content-up">
            <div className="banner-title-1"><FormattedMessage id="banner.title-1"/></div>
            <div className="banner-title-2"><FormattedMessage id="banner.title-2"/></div>
            <div className="banner-search">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Tìm chuyên khoa khám bệnh" />
            </div>
          </div>
          <div className="content-down">
            <div className="banner-options">
              <div className="option-child">
                <div className="icon-child"><i className="far fa-hospital"></i></div>
                <div className="text-child"><FormattedMessage id="banner.specialist-examination"/></div>
              </div>
              <div className="option-child">
                <div className="icon-child"><i className="fas fa-mobile-alt"></i></div>
                <div className="text-child"><FormattedMessage id="banner.remote-consultation"/></div>
              </div>
              <div className="option-child">
                <div className="icon-child"><i className="fas fa-stethoscope"></i></div>
                <div className="text-child"><FormattedMessage id="banner.general-check-up"/></div>
              </div>
              <div className="option-child">
                <div className="icon-child"><i className="fas fa-vials"></i></div>
                <div className="text-child"><FormattedMessage id="banner.medical-test"/></div>
              </div>
              <div className="option-child">
                <div className="icon-child"><i className="fas fa-brain"></i></div>
                <div className="text-child"><FormattedMessage id="banner.mental-health"/></div>
              </div>
              <div className="option-child">
                <div className="icon-child"><i className="fas fa-tooth"></i></div>
                <div className="text-child"><FormattedMessage id="banner.dental-check-up"/></div>
              </div>
            </div>
          </div>
        </div>
  }
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
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
