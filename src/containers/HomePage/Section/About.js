import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./About.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class About extends Component {
  render() {
    return (
      <Fragment>
        <div className="section-about">
          <div className="section-about-header">
            Truyền thông nói về bệnh viện HealthyLife
          </div>
          <div className="section-about-content">
            <div className="content-left">
              <iframe
                width="100%"
                height="400px"
                src="https://www.youtube.com/embed/Ef83M9iiJh0"
                title="Bệnh viện Đa khoa Tâm Anh - Đẳng cấp và chất lượng | BVĐK Tâm Anh"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
            <div className="content-right">
              <p>
                "HealthyLife - Không chỉ là một bệnh viện, mà là nơi gửi gắm
                niềm tin và hy vọng. Tại đây, sức khỏe của bạn được chăm sóc
                bằng sự tận tâm, cuộc sống của bạn được nâng niu với những giải
                pháp y tế tiên tiến, và mỗi ngày trôi qua là một hành trình tiến
                gần hơn đến sự hồi phục toàn diện và hạnh phúc bền lâu."
              </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
