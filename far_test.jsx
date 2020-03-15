import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ModalComponent from "./modalComponent";
import "../App.css";
const styles = {
  wrapper: {
    borderBottom: "0px",
    display: "grid",
    backgroundColor: "#e9ecef",
    gridTemplateColumns: "repeat(4, 1fr)",
    margin: "0px 93px 0px 22px",
    padding: "7px",
    fontSize: "12px",
    fontWeight: "bold",
    //backgroundColor:'red',
    fontFamily: "Brown-Pro-Regular,Arial, Helvetica, sans-serif"
    //  margin: '0px',
    // gridGap: '10px',
    // gridAutoRows: 'minmax(100px, auto)'
  },
  one: {
    padding: "0rem",
    borderBottom: "0px",
    // width: '100%',

    // backgroundColor:'red',
    fontFamily: "monospace",
    gridColumn: "1",
    gridRow: "4",
    width: "370px",
    margin: "0px 17px 0px 10px"
  },
  two: {
    padding: "0rem",
    borderBottom: "0px",
    fontFamily: "monospace",
    gridColumn: "2",
    gridRow: "4",
    width: "370px",
    margin: "0px 17px 0px 10px"
  },
  three: {
    padding: "0rem",
    borderBottom: "0px",
    fontFamily: "monospace",
    gridColumn: "3",
    gridRow: "4",
    width: "370px",
    margin: "0px 17px 0px 10px"
  },
  alignment: {
    width: "50%",
    padding: "0rem"
  },
  alignmentTable: {
    width: "106%",
    tableLayout: "fixed"
  },
  divInputPencil: {
    float: "right",
    color: "#00B8FC"
  },
  divInputNonPencil: {
    float: "right",
    padding: "0px 13px 0px 0px"
  },
  tabStyle: {
    backgroundColor: "#dee2e6 !important",
    fontSize: "11.5px",
    color: "red"
  },
  tableCss: {
    fontSize: "12px",
    fontWeight: "bold",
    //backgroundColor:'red',
    fontFamily: "Brown-Pro-Regular,Arial, Helvetica, sans-serif",
    backgroundColor: "#00bfff !important",
    border: "2px solid #E1E2E3"
  },
  underLineStyle: {
    borderBottom: "2px solid #E1E2E3",
    // paddingBottom: "5px",
    // paddingTop: "5px",
    fontFamily: "Brown-Pro-Regular,Arial, Helvetica, sans-serif",
    fontWeight: "bold",
    padding: "5px 12px 5px 0px",
    margin: "0px 20px 7px 22px"
  },
  dataTableDiv: {
    marginTop: "20px",
    //border:"2px solid #E1E2E3",
    // padding: '0px 20px 0px 20px',
    padding: "0px 0px 6px 0px",
    margin: "22px 18px 0px 20px",
    borderTop: "none"
  }

  //style={{width:"50%"}}
};
export default class ExercisesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      GOLDEN_ACCOUNT_NAME: "",
      COMPANY_ACCOUNT_ID: "",
      ACCOUNT_NUMBER: "",
      ZYME_ID: "",
      VALID_ZYME_ID: "",
      COUNTRY: "",
      REGION: "",
      CRC_NUM: "",
      EXCLUDE_MATCH_FLAG: "",
      T3_MASTER_IDENTIFIER: "",
      INDUSTRY_CODE: ""
    };
  }
  componentDidMount() {
    var href = window.location.href;
    var res = href.slice(27, 95);
    const accountName = decodeURI(res);
    // const COMPANYAccountId = '';
    console.log("href", href);
    console.log("res---", res);
    console.log("decodeURI(str)--", decodeURI(res));
    console.log("id isssssssssss", this.props.match.params.id);
    axios
      .get(`http://localhost:5000/users/?accountName=${accountName}`)
      .then(response => {
        console.log("response is", response);
        console.log("response.data.rows---", response.data.rows);
        //this.setState({ business: response.data.rows });
        const accountName = response.data.rows[0].GOLDEN_ACCOUNT_NAME;
        const COMPANYAccountId = response.data.rows[0].COMPANY_ACCOUNT_ID;
        const GOLDEN_ACCOUNT_NAME = accountName.toLowerCase();
        this.setState({
          GOLDEN_ACCOUNT_NAME: GOLDEN_ACCOUNT_NAME,
          COMPANY_ACCOUNT_ID: COMPANYAccountId,
          ACCOUNT_NUMBER: response.data.rows[0].ACCOUNT_NUMBER,
          ZYME_ID: response.data.rows[0].ZYME_ID,
          VALID_ZYME_ID: response.data.rows[0].VALID_ZYME_ID,
          COUNTRY: response.data.rows[0].COUNTRY,
          REGION: response.data.rows[0].REGION,
          CRC_NUM: response.data.rows[0].CRC_NUM,
          EXCLUDE_MATCH_FLAG: response.data.rows[0].EXCLUDE_MATCH_FLAG,
          T3_MASTER_IDENTIFIER: response.data.rows[0].T3_MASTER_IDENTIFIER,
          INDUSTRY_CODE: response.data.rows[0].INDUSTRY_CODE
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  UNSAFE_componentWillUpdate() {
    //SELECT * FROM PRESENTATION.GOLDEN_ACCOUNT_ATTR_BRIDGE WHERE GOLDEN_ACCOUNT_ID=118338003926162
    console.log(
      "COMPANYAccountId----COMPANYAccountId---->",
      this.state.COMPANY_ACCOUNT_ID
    );
    axios
      .get(
        `http://localhost:5000/accountData/?accountID=${this.state.COMPANY_ACCOUNT_ID}`
      )
      .then(response => {
        console.log("response is COMPANYAccountId", response);
        console.log("response.data.rows---", response.data.attributesData);
        this.setState({
          // COMPANY_ACCOUNT_ID:response.data.attributesData[0].COMPANY_ACCOUNT_ID,
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="table-responsive">
        <h3 style={styles.underLineStyle}>
          {this.state.GOLDEN_ACCOUNT_NAME.toUpperCase()}(
          {this.state.COMPANY_ACCOUNT_ID})
        </h3>
        <h4 style={styles.underLineStyle}>Account Details</h4>
        <table style={styles.alignmentTable}>
          <thead>
            <tr style={styles.wrapper}>
              <td style={styles.one}>
                Account Number
                <div style={styles.divInputPencil}>
                  <input
                    type="text"
                    className="mainTableInput"
                    value={this.state.ACCOUNT_NUMBER}
                  />
                  <ModalComponent />
                </div>
              </td>
              <td style={styles.two}>
                Valid Zyme Id
                <div style={styles.divInputPencil}>
                  <input
                    type="text"
                    className="mainTableInput"
                    value={this.state.VALID_ZYME_ID}
                  />
                  <ModalComponent />
                </div>
              </td>
              <td style={styles.three}>
                Tier
                <div style={styles.divInputPencil}>
                  <input type="text" className="mainTableInput" />
                  <ModalComponent />
                </div>
              </td>
            </tr>
            <tr style={styles.wrapper}>
              <td style={styles.one}>
                Account Name
                <div style={styles.divInputPencil}>
                  <input
                    type="text"
                    className="mainTableInput"
                    value={this.state.GOLDEN_ACCOUNT_NAME}
                  />
                  <ModalComponent />
                </div>
              </td>
              <td style={styles.two}>
                Valid Zyme business Name
                <div style={styles.divInputPencil}>
                  <input
                    type="text"
                    className="mainTableInput"
                    value={this.state.VALID_ZYME_BUSINESS_NAME}
                  />
                  <ModalComponent />
                </div>
              </td>
              <td style={styles.three}>
                Channel grouping Parent
                <div style={styles.divInputPencil}>
                  <input type="text" className="mainTableInput" />
                  <ModalComponent />
                </div>
              </td>
            </tr>
            <tr style={styles.wrapper}>
              <td style={styles.one}>
                COMPANY Account Id
                <div style={styles.divInputNonPencil}>
                  <input
                    type="text"
                    className="mainTableInput"
                    value={this.state.COMPANY_ACCOUNT_ID}
                  />
                </div>
              </td>
              <td style={styles.two}>
                Master Name
                <div style={styles.divInputPencil}>
                  <input
                    type="text"
                    className="mainTableInput"
                    value={this.state.MASTER_NAME}
                  />
                  <ModalComponent />
                </div>
              </td>
              <td style={styles.three}>
                Transaction Type
                <div style={styles.divInputPencil}>
                  <input type="text" className="mainTableInput" />
                  <ModalComponent />
                </div>
              </td>
            </tr>
            <tr style={styles.wrapper}>
              <td style={styles.one}>
                Country
                <div style={styles.divInputPencil}>
                  <input
                    type="text"
                    className="mainTableInput"
                    value={this.state.COUNTRY}
                  />
                  <ModalComponent />
                </div>
              </td>
              <td style={styles.two}>
                Excluse from grouping
                <div style={styles.divInputPencil}>
                  <input type="text" className="mainTableInput" />
                  <ModalComponent />
                </div>
              </td>
              <td style={styles.three}>
                {" "}
                Stratergic importance
                <div style={styles.divInputPencil}>
                  <input type="text" className="mainTableInput" />
                  <ModalComponent />
                </div>
              </td>
            </tr>
            <tr style={styles.wrapper}>
              <td style={styles.one}>
                Region
                <div style={styles.divInputNonPencil}>
                  <input
                    type="text"
                    className="mainTableInput"
                    value={this.state.REGION}
                  />
                </div>
              </td>
              <td style={styles.two}>
                Project Code
                <div style={styles.divInputNonPencil}>
                  <input type="text" className="mainTableInput" />
                </div>
              </td>
              <td style={styles.three}>
                Channel Position
                <div style={styles.divInputPencil}>
                  <input type="text" className="mainTableInput" />
                  <ModalComponent />
                </div>
              </td>
            </tr>
            <tr style={styles.wrapper}>
              <td style={styles.one}>
                Accrual
                <div style={styles.divInputPencil}>
                  <input
                    type="text"
                    className="mainTableInput"
                    value={this.state.ACCRUAL}
                  />
                  <ModalComponent />
                </div>
              </td>
              <td style={styles.two}>
                Reseller Code
                <div style={styles.divInputPencil}>
                  <input type="text" className="mainTableInput" />
                  <ModalComponent />
                </div>
              </td>
              <td style={styles.three}>
                Party ID
                <div style={styles.divInputNonPencil}>
                  <input type="text" className="mainTableInput" />
                </div>
              </td>
            </tr>
            <tr style={styles.wrapper}>
              <td style={styles.one}>
                T3 MAster Identifier
                <div style={styles.divInputPencil}>
                  <input
                    type="text"
                    className="mainTableInput"
                    value={this.state.T3_MASTER_IDENTIFIER}
                  />
                  <ModalComponent />
                </div>
              </td>
              <td style={styles.two}>
                Industry Code
                <div style={styles.divInputPencil}>
                  <input
                    type="text"
                    className="mainTableInput"
                    value={this.state.INDUSTRY_CODE}
                  />
                  <ModalComponent />
                </div>
              </td>
            </tr>
          </thead>
        </table>
        <div style={styles.dataTableDiv}>
          <Tabs
            defaultActiveKey="recentAccountChanges"
            style={styles.tabStyle}
            className="mainTabs"
          >
            <Tab eventKey="recentAccountChanges" title="Recent Account Changes">
              <table className="table" style={styles.tableCss}>
                <thead>
                  <tr>
                    <th>
                      <u>Attribute Name</u>
                    </th>
                    <th>
                      <u>Current Value</u>
                    </th>
                    <th>
                      <u>Previous Value</u>
                    </th>
                    <th>
                      <u>Submitted Date</u>
                    </th>
                    <th>
                      <u>Approved Date</u>
                    </th>
                    <th>
                      <u>Approved By</u>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>No Data</th>
                    <th>No Data</th>
                    <th>No Data</th>
                    <th>No Data</th>
                    <th>No Data</th>
                    <th>No Data</th>
                  </tr>
                </tbody>
              </table>
            </Tab>
            <Tab eventKey="xrefAccount" title="XRef Accounts">
              <table className="table" style={styles.tableCss}>
                <thead>
                  <tr>
                    <th>
                      <u>Attribute Name</u>
                    </th>
                    <th>
                      <u>Current Value</u>
                    </th>
                    <th>
                      <u>Previous Value</u>
                    </th>
                    <th>
                      <u>Submitted Date</u>
                    </th>
                    <th>
                      <u>Approved Date</u>
                    </th>
                    <th>
                      <u>Approved By</u>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>No Data</th>
                    <th>No Data</th>
                    <th>No Data</th>
                    <th>No Data</th>
                    <th>No Data</th>
                    <th>No Data</th>
                  </tr>
                </tbody>
              </table>
            </Tab>
            <Tab eventKey="xrefAccountSites" title="XRef Account Sites">
              <table className="table" style={styles.tableCss}>
                <thead>
                  <tr>
                    <th>
                      <u>Attribute Name</u>
                    </th>
                    <th>
                      <u>Current Value</u>
                    </th>
                    <th>
                      <u>Previous Value</u>
                    </th>
                    <th>
                      <u>Submitted Date</u>
                    </th>
                    <th>
                      <u>Approved Date</u>
                    </th>
                    <th>
                      <u>Approved By</u>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>No Data</th>
                    <th>No Data</th>
                    <th>No Data</th>
                    <th>No Data</th>
                    <th>No Data</th>
                    <th>No Data</th>
                  </tr>
                </tbody>
              </table>
            </Tab>
            <Tab
              eventKey="accountClassification"
              title="Account Classification"
            >
              <p>Account Classification</p>
              {/* <tbody>
            { this.exerciseList() }
          </tbody> */}
            </Tab>
            <Tab eventKey="reporting" title="Reporting">
              <p>Reporting</p>
              {/* <tbody>
            { this.exerciseList() }
          </tbody> */}
            </Tab>
            <Tab eventKey="accountContacts" title="Account Contacts">
              <p>Account Contacts</p>
              {/* <tbody>
            { this.exerciseList() }
          </tbody> */}
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}
