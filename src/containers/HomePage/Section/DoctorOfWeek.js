import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DoctorOfWeek.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class DoctorOfWeek extends Component {
  render() {
    return (
      <Fragment>
        <div className="section-doctor-of-week">
          <div className="doctor-of-week-container">
            <div className="doctor-of-week-header">
              <span className="title-section">Cơ sở y tế nổi bật</span>
              <button className="btn-section">Xem thêm</button>
            </div>
            <div className="doctor-of-week-body">
              <Slider {...this.props.settings}>
                <div className="img-customize">
                  <div className="customize-border">
                  <div className="outer-bg">
                  <div className="bg-img"></div>
                  </div>
                  <div className="position text-center">
                    <div>Giáo sư,Tiến sĩ Trần Thị Nhung</div>
                    <div>Cơ xương khớp</div>
                  </div>
                  </div>
                </div>
                <div className="img-customize">
                  <div className="customize-border">
                  <div className="outer-bg">
                  <div className="bg-img"></div>
                  </div>
                  <div className="position text-center">
                    <div>Giáo sư,Tiến sĩ Trần Thị Nhung</div>
                    <div>Cơ xương khớp</div>
                  </div>

                  </div>
                </div>
                <div className="img-customize">
                  <div className="customize-border">
                  <div className="outer-bg">
                  <div className="bg-img"></div>
                  </div>
                  <div className="position text-center">
                    <div>Giáo sư,Tiến sĩ Trần Thị Nhung</div>
                    <div>Cơ xương khớp</div>
                  </div>

                  </div>
                </div>
                <div className="img-customize">
                  <div className="customize-border">
                  <div className="outer-bg">
                  <div className="bg-img"></div>
                  </div>
                  <div className="position text-center">
                    <div>Giáo sư,Tiến sĩ Trần Thị Nhung</div>
                    <div>Cơ xương khớp</div>
                  </div>

                  </div>
                </div>
                <div className="img-customize">
                  <div className="customize-border">
                  <div className="outer-bg">
                  <div className="bg-img"></div>
                  </div>
                  <div className="position text-center">
                    <div>Giáo sư,Tiến sĩ Trần Thị Nhung</div>
                    <div>Cơ xương khớp</div>
                  </div>

                  </div>
                </div>
                <div className="img-customize">
                  <div className="customize-border">
                  <div className="outer-bg">
                  <div className="bg-img"></div>
                  </div>
                  <div className="position text-center">
                    <div>Giáo sư,Tiến sĩ Trần Thị Nhung</div>
                    <div>Cơ xương khớp</div>
                  </div>

                  </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorOfWeek);
