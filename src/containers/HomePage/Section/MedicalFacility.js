import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import './MedicalFacility.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class MedicalFacility extends Component {
  render() {
    
    return (
        <Fragment>
        <div className="section-medical-facility">
          <div className="medical-facility-container">
            <div className="medical-facility-header">
              <span className="title-section">Cơ sở y tế nổi bật</span>
              <button className="btn-section">Xem thêm</button>
            </div>
            <div className="medical-facility-body">
              <Slider {...this.props.settings}>
                <div className="img-customize">
                  <div className="bg-img"></div>
                  <div>Bệnh viện Việt Đức 1</div>
                </div>
                <div className="img-customize">
                  <div className="bg-img"></div>
                  <div>Bệnh viện Việt Đức 2</div>
                </div>
                <div className="img-customize">
                  <div className="bg-img"></div>
                  <div>Bệnh viện Việt Đức 3</div>
                </div>
                <div className="img-customize">
                  <div className="bg-img"></div>
                  <div>Bệnh viện Việt Đức 4</div>
                </div>
                <div className="img-customize">
                  <div className="bg-img"></div>
                  <div>Bệnh viện Việt Đức 5</div>
                </div>
                <div className="img-customize">
                  <div className="bg-img"></div>
                  <div>Bệnh viện Việt Đức 6</div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
