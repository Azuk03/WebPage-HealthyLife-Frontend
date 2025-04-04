import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from "../../../assets/specialty/co-xuong-khop.png.jpg";
import { getAllSpecialties } from "../../../services/userService";
import { withRouter } from "react-router";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }

  async componentDidMount() {
    let res = await getAllSpecialties();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailDoctor = (item) => {
    if(this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`)
    }
  } 

  render() {
    let { dataSpecialty } = this.state;

    return (
      <Fragment>
        <div className="section-specialty">
          <div className="specialty-container">
            <div className="specialty-header">
              <span className="title-section"><FormattedMessage id="homepage.specialty-popular" /></span>
              <button className="btn-section"><FormattedMessage id="homepage.more-information" /></button>
            </div>
            <div className="specialty-body">
              <Slider {...this.props.settings}>
                {dataSpecialty &&
                  dataSpecialty.length > 0 &&
                  dataSpecialty.map((item, index) => {
                    return (
                      <div className="img-customize specialty-child" key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                        <div className="bg-img" style={{
                                backgroundImage: `url(${item.image})`,
                              }}></div>
                        <div className="specialty-name">{item.name}</div>
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
