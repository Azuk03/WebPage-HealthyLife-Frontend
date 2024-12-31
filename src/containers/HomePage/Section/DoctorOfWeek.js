import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DoctorOfWeek.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";


class DoctorOfWeek extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }

  handleViewDetailDoctor = (doctor) => {
    if(this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`)
    }
  } 

  render() {
    let arrDoctors = this.state.arrDoctors;
    let { language } = this.props;
    return (
      <Fragment>
        <div className="section-doctor-of-week">
          <div className="doctor-of-week-container">
            <div className="doctor-of-week-header">
              <span className="title-section"><FormattedMessage id="homepage.outstanding-doctor" /></span>
              <button className="btn-section"><FormattedMessage id="homepage.more-information" /></button>
            </div>
            <div className="doctor-of-week-body">
              <Slider {...this.props.settings}>
                {arrDoctors &&
                  arrDoctors.length > 0 &&
                  arrDoctors.map((item, index) => {
                    let imageBase64 = "";
                    if (item.image) {
                      imageBase64 = new Buffer(
                        item.image,
                        "base64"
                      ).toString("binary");
                    }
                    let nameVi = `${item.positionData.valueVi}: ${item.lastName} ${item.firstName}`;
                    let nameEn = `${item.positionData.valueEn}: ${item.firstName} ${item.lastName}`;
                    return (
                      <div className="img-customize" key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                        <div className="customize-border">
                          <div className="outer-bg">
                            <div
                              className="bg-img"
                              style={{
                                backgroundImage: `url(${imageBase64})`,
                              }}
                            ></div>
                          </div>
                          <div className="position text-center">
                            <div>
                              {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div>Cơ xương khớp</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorOfWeek));
