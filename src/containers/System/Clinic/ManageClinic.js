import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageClinic.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { createNewClinic } from "../../../services/userService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        imageBase64: '',
        descriptionHTML: '',
        descriptionMarkdown: '',
        address: ''
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionMarkdown: text,
      descriptionHTML: html,
    });
  };

  handleOnChangeImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file)
      this.setState({
        imageBase64: base64,
      });
    }
  };

  handleOnChangeInput = (event,id) => {
    let copyState = {...this.state};
    copyState[id] = event.target.value;
    this.setState({
        ...copyState
    })
  }

  handleSaveNewClinic = async () => {
    let res = await createNewClinic(this.state);
    if(res && res.errCode === 0) {
        toast.success('Add new clinic succeed!');
        this.setState({
          name: "",
          address: "",
          imageBase64: "",
          descriptionHTML: "",
          descriptionMarkdown: "",
        });
    } else {
        toast.error('Add new clinic failed');
    }
  }


  render() {
    return (
      <div className="manage-specialty-container">
        <div className="ms-title">Quản lý phòng khám</div>

        <div className="add-new-specialty row">
          <div className="col-6 form-group">
            <label>Tên phòng khám</label>
            <input className="form-control" type="text" value={this.state.name} onChange={(e) => this.handleOnChangeInput(e,'name')} />
          </div>
          <div className="col-6 form-group">
            <label>Ảnh chuyên khoa</label>
            <input className="form-control-file" type="file" onChange={(e) => this.handleOnChangeImage(e)}/>
          </div>
          <div className="col-6 form-group">
          <label>Địa chỉ phòng khám</label>
          <input className="form-control" type="text" value={this.state.address} onChange={(e) => this.handleOnChangeInput(e,'address')} />
          </div>
          <div className="col-12">
            <MdEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>
          <div className="col-12">
            <button className="btn-save-specialty" onClick={() => this.handleSaveNewClinic()}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
