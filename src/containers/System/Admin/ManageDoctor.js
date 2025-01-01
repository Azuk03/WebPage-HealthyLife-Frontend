import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import _ from "lodash";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { CRUD_ACTION, LANGUAGES } from "../../../utils";
import { getDetailInforDoctor } from "../../../services/userService";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: '',
      description: "",
      listDoctors: [],
      hasOldData: false,

      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getAllRequiredDoctorInfor();
  }

  buildDataSelectInput = (inputData, type) => {
    let results = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if(type === 'USERS') {
        inputData.map((item, index) => {
          let object = {};
          let labelVi =  `${item.lastName} ${item.firstName}` ;
          let labelEn =  `${item.firstName} ${item.lastName}` ;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          results.push(object);
        });
      }
      if(type === 'PRICE') {
        inputData.map((item, index) => {
          let object = {};
          let labelVi =  `${item.valueVi} VND`;
          let labelEn =  `${item.valueEn} USD`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          results.push(object);
        });
      }
      if(type === 'PAYMENT' || type === 'PROVINCE') {
        inputData.map((item, index) => {
          let object = {};
          let labelVi =  `${item.valueVi}`;
          let labelEn =  `${item.valueEn}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          results.push(object);
        });
      }
    }
    return results;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataSelectInput(this.props.allDoctors, 'USERS');
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataSelectInput(this.props.allDoctors, 'USERS');
      let {resPayment, resPrice, resProvince} = this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.buildDataSelectInput(resPrice,'PRICE');
      let dataSelectPayment = this.buildDataSelectInput(resPayment,'PAYMENT');
      let dataSelectProvince = this.buildDataSelectInput(resProvince,'PROVINCE');
      this.setState({
        listDoctors: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
    if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
      let {resPayment, resPrice, resProvince} = this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.buildDataSelectInput(resPrice,'PRICE');
      let dataSelectPayment = this.buildDataSelectInput(resPayment,'PAYMENT');
      let dataSelectProvince = this.buildDataSelectInput(resProvince,'PROVINCE');

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      })
    }
  }

  // Finish!
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.saveDetailDoctorAction({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
    });
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    let res = await getDetailInforDoctor(selectedOption.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
      });
    }
  };

  handleChangeSelectDoctorInfor = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = {...this.state};
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy
    })
  }

  handleOnChangeText = (e, id) => {
    let stateCopy = {...this.state};
    stateCopy[id] = e.target.value;
    this.setState({
      ...stateCopy
    });
  };

  render() {
    let { hasOldData } = this.state;


    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>
        <div className="more-doctor-info">
          <div className="content-left form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.select" />
            </label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChangeSelect}
              options={this.state.listDoctors}
              placeholder={<FormattedMessage id="admin.manage-doctor.select" />}
            />
          </div>
          <div className="content-right">
            <label>
              <FormattedMessage id="admin.manage-doctor.intro" />
            </label>
            <textarea
              className="form-control"
              onChange={(e) => this.handleOnChangeText(e, 'description')}
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="doctor-infor-extra">
          <div className="row">
            <div className="col-4 form-group">
              <label><FormattedMessage id="admin.manage-doctor.price"/></label>
              <Select
              value={this.state.selectedPrice}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPrice}
              placeholder={<FormattedMessage id="admin.manage-doctor.price"/>}
              name="selectedPrice"
            />
            </div>
            <div className="col-4 form-group">
              <label><FormattedMessage id="admin.manage-doctor.payment" /></label>
              <Select
              value={this.state.selectedPayment}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPayment}
              placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
              name = "selectedPayment"
            />
            </div>
            <div className="col-4 form-group">
              <label><FormattedMessage id="admin.manage-doctor.province" /></label>
              <Select
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listProvince}
              placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
              name ="selectedProvince"
            />
            </div>
            <div className="col-4 form-group">
              <label><FormattedMessage id="admin.manage-doctor.name-clinic"/></label>
              <input className="form-control" onChange={(e) => this.handleOnChangeText(e, 'nameClinic')} value={this.state.nameClinic} />
              
            </div>
            <div className="col-4 form-group">
              <label><FormattedMessage id="admin.manage-doctor.address-clinic"/></label>
              <input className="form-control" onChange={(e) => this.handleOnChangeText(e, 'addressClinic')} value={this.state.addressClinic} />
              
            </div>
            <div className="col-4 form-group">
              <label><FormattedMessage id="admin.manage-doctor.note" /></label>
              <input className="form-control" onChange={(e) => this.handleOnChangeText(e, 'note')} value={this.state.note} />
              
            </div>
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          className={
            hasOldData === true
              ? "save-content-doctor"
              : "create-content-doctor"
          }
          onClick={() => this.handleSaveContentMarkdown()}
        >
          {hasOldData === true ? (
            <span>
              <FormattedMessage id="admin.manage-doctor.save" />
            </span>
          ) : (
            <span>
              <FormattedMessage id="admin.manage-doctor.add" />
            </span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    saveDetailDoctorAction: (data) =>
      dispatch(actions.saveDetailDoctorAction(data)),
    getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
