import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from "../../../assets/specialty/co-xuong-khop.png.jpg";

class Specialty extends Component {
  render() {
    return (
      <Fragment>
        <div className="section-specialty">
          <div className="specialty-container">
            <div className="specialty-header">
              <span className="title-section">Chuyên khoa phổ biến</span>
              <button className="btn-section">Xem thêm</button>
            </div>
            <div className="specialty-body">
              <Slider {...this.props.settings}>
                <div className="img-customize">
                  <div className="bg-img"></div>
                  <div>Cơ xương khớp 1</div>
                </div>
                <div className="img-customize">
                  <div className="bg-img"></div>
                  <div>Cơ xương khớp 2</div>
                </div>
                <div className="img-customize">
                  <div className="bg-img"></div>
                  <div>Cơ xương khớp 3</div>
                </div>
                <div className="img-customize">
                  <div className="bg-img"></div>
                  <div>Cơ xương khớp 4</div>
                </div>
                <div className="img-customize">
                  <div className="bg-img"></div>
                  <div>Cơ xương khớp 5</div>
                </div>
                <div className="img-customize">
                  <div className="bg-img"></div>
                  <div>Cơ xương khớp 6</div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
