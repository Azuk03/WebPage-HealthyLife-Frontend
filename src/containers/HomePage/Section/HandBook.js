import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./HandBook.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HandBook extends Component {
  render() {
    return (
      <Fragment>
        <div className="section-handbook">
          <div className="handbook-container">
            <div className="handbook-header">
              <span className="title-section">Cẩm nang</span>
              <button className="btn-section">Xem thêm</button>
            </div>
            <div className="handbook-body">
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
