import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllClinics } from "../../../services/userService";
import { withRouter } from "react-router";

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    };
  }

  async componentDidMount() {
    let res = await getAllClinics();
    if (res && res.errCode === 0) {
      this.setState({
        dataClinics: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailClinic = (item) => {
    if(this.props.history) {
      this.props.history.push(`/detail-clinic/${item.id}`)
    }
  }

  render() {
    let { dataClinics } = this.state;

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
                {dataClinics &&
                  dataClinics.length > 0 &&
                  dataClinics.map((item, index) => {
                    return (
                      <div className="img-customize clinic-child" key={index} onClick={() => this.handleViewDetailClinic(item)}>
                        <div
                          className="bg-img"
                          style={{
                            backgroundImage: `url(${item.image})`,
                          }}
                        ></div>
                        <div className="clinic-name">{item.name}</div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
