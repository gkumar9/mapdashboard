import React, { Component } from "react";
import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import FusionCharts from "fusioncharts";
import Maps from "fusioncharts/fusioncharts.maps";
import India from "./fusioncharts.india";
import Bihar from "./fusioncharts.bihar";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.gammel";
import ReactFC from "react-fusioncharts";
import user from "./pins/newfarmer.png";
import states from "./pins/5.png";
import axios from "axios";
import config from "./config.js";
import Swal from "sweetalert2";
const $ = require("jquery");

ReactFC.fcRoot(FusionCharts, Maps, India, Bihar, FusionTheme);

class FarmerSidebar extends Component {
  render() {
    return (
      <div
        style={{
          borderRightStyle: "groove",
          minHeight: "100vh",
          textAlign: "center"
        }}
        className="col-xs-2 rmssidebar"
      >
        <h4
          style={{
            marginRight: "32%",
            marginTop: "40px",
            color: "gray",
            fontSize: "large"
          }}
        >
          Our Impact
        </h4>
        <ul style={{ marginTop: "40px", color: "black" }}>
          <li className="rmssidebar">
            <div className="row">
              <div className="col-xs-3">
                <img
                  className="responsive"
                  alt="user"
                  src={user}
                  style={{ width: "32px", marginLeft: "-11px", opacity: "0.3" }}
                />
              </div>
              <div className="col-xs-9">
                <span>
                  <b>{this.props.farmers}</b>
                </span>
                <p>
                  <small>Number of farmers</small>
                </p>
              </div>
            </div>
          </li>
          {this.props.states !== null && (
            <li className="rmssidebar">
              <div className="row">
                <div className="col-xs-3">
                  <img
                    className="responsive"
                    alt="states"
                    src={states}
                    style={{ width: "32px", marginLeft: "-11px" }}
                  />
                </div>
                <div className="col-xs-9">
                  <span>
                    <b>{this.props.states}</b>
                  </span>
                  <p>
                    <small>Number of states</small>
                  </p>
                </div>
              </div>
            </li>
          )}
          {this.props.district !== null && (
            <li className="rmssidebar">
              <div className="row">
                <div className="col-xs-3">
                  <img
                    className="responsive"
                    alt="states"
                    src={states}
                    style={{ width: "32px", marginLeft: "-11px" }}
                  />
                </div>
                <div className="col-xs-9">
                  <span>
                    <b>{this.props.district}</b>
                  </span>
                  <p>
                    <small>Number of district</small>
                  </p>
                </div>
              </div>
            </li>
          )}
        </ul>
        <hr />
        {/* {this.props.statename !== null && (
          <div style={{ marginLeft: "-5%" }}>
            <h4
              style={{ marginRight: "45%", color: "gray", fontSize: "large" }}
            >
              States
            </h4>
            <ul style={{ marginTop: "20px", color: "black" }}>
              {this.props.statename.map((item, number) => {
                return (
                  <li key={number} style={{ marginBottom: "10px" }}>
                    <div className="row">
                      <div className="col-xs-9">
                        <span>
                          {number + 1}. {item}
                        </span>
                      </div>
                      <div className="col-xs-3" />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )} */}
        {/* {this.props.districtname !== null && (
          <div style={{ marginLeft: "-5%" }}>
            <h4
              style={{ marginRight: "38%", color: "gray", fontSize: "large" }}
            >
              Districts
            </h4>
            <ul style={{ marginTop: "20px", color: "black" }}>
              {this.props.districtname.map((item, number) => {
                return (
                  <li key={number} style={{ marginBottom: "10px" }}>
                    <div className="row">
                      <div className="col-xs-9">
                        <span>
                          {number + 1}. {item}
                        </span>
                      </div>
                      <div className="col-xs-3" />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )} */}
      </div>
    );
  }
}
class FarmerHeader extends Component {
  render() {
    return (
      <div className="container ">
        <nav
          style={{ backgroundColor: "#edeef0", borderBottomColor: "darkgray" }}
          className="navbar navbar-default"
        >
          <div
            className="container-fluid"
            style={{ textAlign: "center", marginTop: "10px" }}
          >
            {/* <Link to="/">
              <button
                style={{
                  marginTop: "-2px",
                  backgroundColor: "transparent",
                  float: "left"
                }}
                type="button"
                className="btn btn-default"
                aria-label="Left Align"
              >
                <span
                  className="glyphicon glyphicon-menu-left"
                  style={{ marginRight: "6px" }}
                  aria-hidden="true"
                />
                Home{" "}
              </button>
            </Link> */}{" "}
            <button
              type="button"
              className="btn btn-default"
              aria-label="Left Align"
              id="drillUp"
              style={{
                display: "none",
                float: "left",
                // marginRight: "30px",
                // marginTop: "10px",
                // color: "blue",
                outline: "none",
                backgroundColor: "transparent"
              }}
            >
              <span
                className="glyphicon glyphicon-menu-left"
                style={{ marginRight: "6px" }}
                aria-hidden="true"
              />
              Back
            </button>
            <span style={{ fontSize: "large", color: "blue" }}>
              Farmer database in {this.props.label}
            </span>
          </div>
        </nav>
      </div>
    );
  }
}
const dataSource = {
  chart: {
    // canvasBgAlpha: "0",
    bgColor: "#F2F2F2",
    // bgAlpha: "50",
    // animation: "0",
    showLabels: "0",
    showToolTip: "0",
    // toolTipBorderColor: "#666666",
    // toolTipBgColor: "#efefef",
    // toolTipBgAlpha: "80",
    // showToolTipShadow: "1",
    canvasbordercolor: "#EDEEF0",
    bordercolor: "#aaa",
    showlegend: "0",
    showshadow: "0",
    // legendposition: "BOTTOM",
    // legendborderalpha: "0",
    // legendbordercolor: "ffffff",
    // legendallowdrag: "0",
    // legendshadow: "0",
    // caption: "State-wise Cash In-flow of India",
    // hoverFillalpha: "20",
    useHoverColor: "1",
    hoverColor: "#7b96d5",
    // nullEntityColor:'white',
    nullEntityColor: "#ffffff",
    showborder: "1"
    // borderColor:'#ffffff',
    // theme: "gammel"
  },
  colorrange: {
    minvalue: "0",
    startlabel: "Low",
    endlabel: "High",
    code: "#ced3ee",
    gradient: "1",
    color: [
      {
        maxvalue: "100",
        code: "#ced3ee"
      },
      {
        maxvalue: "800",
        code: "#ced3ee"
      },
      {
        maxvalue: "1000",
        code: "#ced3ee"
      }
    ],
    maxvalue: 0
  },

  data: [
    {
      data: [
        // {
        //   id: "005",
        //   value: "245000",
        //   showLabel:'1',
        //   displayValue:"Bihar",
        // }
      ]
    }
  ]
};
class Farmer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      farmers: "",
      // statename: null,
      // districtname: null,
      states: null,
      district: null,
      backbutton: [],
      indiadata: [],
      statedata: [],
      chart: null,
      tabledata: [],
      ch: {},
      actualValue: " ",
      message: " ",
      label: "India",
      scrollcount: 0,
      hasMore: null,
      blockid: ""
      // isLoading: false
      // users: [],
    };
  }
  tableshow = data => {
    // console.log('table')
    // document.getElementById("listendmessage").style.display = "none";
    this.setState({ hasMore: null });
    let count = this.state.scrollcount + 1;
    axios({
      url: config.farmertable + data.id + "/farmerlist/" + count,
      method: "POST",
      data: {},
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        // console.log(res);
        this.setState({
          blockid: data.id,
          tabledata: res.data.data.list,
          scrollcount: count,
          hasMore: res.data.data.hasMore
        });
        if (res.data.data.hasMore) {
          let count = this.state.scrollcount + 1;
          let tabledatanow = this.state.tabledata;
          axios({
            url: config.farmertable + data.id + "/farmerlist/" + count,
            method: "POST",
            data: {},
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(res => {
              // console.log(res);
              this.setState({
                blockid: data.id,
                tabledata: tabledatanow.concat(res.data.data.list),
                scrollcount: count,
                hasMore: res.data.data.hasMore
              });
            })
            .catch(e => {
              Swal({
                type: "error",
                title: "Oops...",
                text: e
              });
            });
        }
      })
      .catch(e => {
        Swal({
          type: "error",
          title: "Oops...",
          text: e
        });
      });
  };
  handletable = data => {
    // this.state.ch.dispose();
    let datatemp = Object.assign({}, data);
    // let self = this;

    let check = false;
    dataSource.data[0].data.map(item => {
      if (item.id === datatemp.originalId) {
        // console.log("found it");
        check = true;
      }
    });
    if (check) {
      // let backvalue = this.state.actualValue;
      let backbuttontemp = this.state.backbutton;
      backbuttontemp.push(data.label);
      this.setState({
        backbutton: backbuttontemp,
        actualValue: "",
        label: data.label,
        message: ""
      });

      document.getElementById("chartmap").style.display = "none";
      document.getElementById("first").style.display = "none";
      // document.getElementById("second").style.display = "none";
      document.getElementById("farmersidebar").style.display = "none";
      document.getElementById("maptable").style.display = "block";
      this.tableshow(data);
    }
  };
  handlechartclik = data => {
    let datatemp = Object.assign({}, data);
    let self = this;

    let check = false;
    dataSource.data[0].data.map(item => {
      if (item.id === datatemp.id) {
        // console.log("found it");
        check = true;
      }
    });

    if (check) {
      let checkstate = false;
      let itemstate = {};
      self.state.statedata.map(item => {
        if (Object.keys(item)[0] === datatemp.id) {
          checkstate = true;
          itemstate = item;
        }
      });
      if (checkstate) {
        dataSource.data[0].data = itemstate[datatemp.id].mapDataBeanList;
        let chartConfigs = {
          type: datatemp.label.replace(/ /g, "").toLowerCase(),
          width: "100%",
          height: 550,
          dataFormat: "json",
          dataSource: dataSource,
          events: {
            entityClick: function(evt, data) {
              self.handletable(data);
            },
            entityRollOver: function(evt, data) {
              self.dataplotrollover(evt, data);
            },
            entityRollOut: function(evt, data) {
              self.dataplotrollout(evt, data);
            }
          }
        };
        // let districtnames = itemstate[datatemp.id].mapDataBeanList.map(
        //   items => {
        //     return items.label;
        //   }
        // );
        this.setState({
          backbutton: [datatemp.label],
          farmers: itemstate[datatemp.id].totalNoOfFarmers,
          // states: null,
          // districtname: districtnames,
          // statename: null,
          chart: chartConfigs,
          district: itemstate[datatemp.id].totalNoOfDistricts,
          actualValue: "",
          label: datatemp.label,
          message: ""
        });
        document.getElementById("drillUp").style.display = "block";
        document.getElementById("drillUp").style.marginRight = "-4%";
      } else {
        axios({
          url: config.farmerdistrict + datatemp.id,
          method: "POST",
          data: {},
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => {
            dataSource.data[0].data = res.data.data.mapDataBeanList;
            let chartConfigs = {
              type: datatemp.label.replace(/ /g, "").toLowerCase(),
              width: "100%",
              height: 550,
              dataFormat: "json",
              dataSource: dataSource,
              events: {
                entityClick: function(evt, data) {
                  self.handletable(data);
                },
                entityRollOver: function(evt, data) {
                  self.dataplotrollover(evt, data);
                },
                entityRollOut: function(evt, data) {
                  self.dataplotrollout(evt, data);
                }
              }
            };
            let statetemp = {};
            statetemp[datatemp.id] = res.data.data;
            let tempstatedata = self.state.statedata;
            tempstatedata.push(statetemp);
            // let districtnames = res.data.data.mapDataBeanList.map(items => {
            //   return items.label;
            // });
            this.setState({
              backbutton: [datatemp.label],
              statedata: tempstatedata,
              farmers: res.data.data.totalNoOfFarmers,
              // districtname: districtnames,
              // statename: null,
              // states: null,
              chart: chartConfigs,
              actualValue: "",
              label: datatemp.label,
              message: "",
              district: res.data.data.totalNoOfDistricts
            });
            document.getElementById("drillUp").style.display = "block";
            document.getElementById("drillUp").style.marginRight = "-4%";
          })
          .catch(e => {
            Swal({
              type: "error",
              title: "Oops...",
              text: e
            });
          });
      }
    }
  };
  renderComplete = ch => {
    this.setState({ ch });
  };
  dataplotrollover = (eventObj, dataObj) => {
    if (dataObj.dataValue !== null) {
      this.setState({
        message: [
          " ",
          <strong>{dataObj.label}</strong>,
          " has ",
          <strong>{dataObj.dataValue}</strong>,
          " farmers"
        ]
      });
    } else {
      this.setState({
        message: <strong>{dataObj.label}</strong>
      });
    }
  };

  dataplotrollout = (eventObj, dataObj) => {
    this.setState({
      message: this.state.actualValue
    });
  };
  componentDidMount() {
    let self = this;

    $("#maptable").scroll(function() {
      if (
        $(this).scrollTop() + $(this).innerHeight() >=
          $(this)[0].scrollHeight &&
        self.state.hasMore
      ) {
        // document.getElementById("listendmessage").style.display = "none";
        let count = self.state.scrollcount + 1;
        let tabledatanow = self.state.tabledata;

        axios({
          url: config.farmertable + self.state.blockid + "/farmerlist/" + count,
          method: "POST",
          data: {},
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => {
            // console.log(res);

            self.setState({
              tabledata: tabledatanow.concat(res.data.data.list),
              scrollcount: count,
              hasMore: res.data.data.hasMore
            });
            if (!res.data.data.hasMore) {
              // console.log('block')
              document.getElementById("listendmessage").style.display = "block";
            }
          })
          .catch(e => {
            console.log(e);
          });
      } else if (
        $(this).scrollTop() + $(this).innerHeight() > $(this)[0].scrollHeight &&
        self.state.hasMore !== null &&
        !self.state.hasMore
      ) {
        // console.log('block',self.state.hasMore,($(this).scrollTop() + $(this).innerHeight() >
        // $(this)[0].scrollHeight))
        document.getElementById("listendmessage").style.display = "block";
      } else {
        document.getElementById("listendmessage").style.display = "none";
      }
    });
    $("#drillUp").click(function() {
      if (self.state.backbutton.length === 2) {
        // // console.log(dataSource)
        // // console.log(self.state.statedata[0][Object.keys(self.state.statedata[0])[0]].mapDataBeanList)
        // // dataSource.data[0].data = self.state.statedata[0][Object.keys(self.state.statedata[0])[0]].mapDataBeanList;
        // let chartConfigss = {
        //   type: "India",
        //   width: "100%",
        //   height: 600,
        //   dataFormat: "json",
        //   dataSource: dataSource,
        //   events: {
        //     entityClick: function(evt, data) {
        //       self.handletable(data);
        //     }
        //   }
        // };
        let backbuttontemp = self.state.backbutton;
        backbuttontemp.pop();
        let backlast = backbuttontemp[backbuttontemp.length - 1];
        document.getElementById("chartmap").style.display = "block";
        document.getElementById("first").style.display = "block";
        // document.getElementById("second").style.display = "none";
        document.getElementById("farmersidebar").style.display = "block";
        document.getElementById("listendmessage").style.display = "none";
        document.getElementById("maptable").style.display = "none";
        self.setState({
          backbutton: [backlast],
          tabledata: [],
          scrollcount: 0,
          label: backlast,
          actualValue: "",
          message: ""
        });
        self.forceUpdate();
      } else if (self.state.backbutton.length === 1) {
        dataSource.data[0].data = self.state.indiadata.mapDataBeanList;
        let chartConfigs = {
          type: "India",
          width: "100%",
          height: 550,
          dataFormat: "json",
          dataSource: dataSource,
          events: {
            entityClick: function(evt, data) {
              self.handlechartclik(data);
            },
            entityRollOver: function(evt, data) {
              self.dataplotrollover(evt, data);
            },
            entityRollOut: function(evt, data) {
              self.dataplotrollout(evt, data);
            }
          }
        };
        // let statenames = self.state.indiadata.mapDataBeanList.map(item => {
        //   return item.label;
        // });
        document.getElementById("drillUp").style.display = "none";
        // let backlast = self.state.backbutton[self.state.backbutton.length - 1];
        self.setState({
          backbutton: [],
          farmers: self.state.indiadata.totalNoOfFarmers,
          states: self.state.indiadata.totalNoOfStates,
          district: self.state.indiadata.totalNoOfDistricts,
          chart: chartConfigs,
          // statename: statenames,
          // districtname: null,
          label: "India",
          actualValue: "",
          message: ""
          // district: null
        });
        self.forceUpdate();
      }
    });
    let chartConfigs = {
      type: "India",
      width: "100%",
      height: 550,
      dataFormat: "json",
      dataSource: dataSource,
      events: {
        entityClick: function(evt, data) {
          self.handlechartclik(data);
        },
        entityRollOver: function(evt, data) {
          self.dataplotrollover(evt, data);
        },
        entityRollOut: function(evt, data) {
          self.dataplotrollout(evt, data);
        }
      }
    };

    axios({
      url: config.farmerstate,
      method: "POST",
      data: {},
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        // console.log(res.data.data)
        // let statenames = res.data.data.mapDataBeanList.map(item => {
        //   return item.label;
        // });
        // console.log(statename)
        if (res.data.data != null) {
          this.setState({
            farmer: res.data.data.totalNoOfFarmers,
            states: res.data.data.totalNoOfStates,
            district: res.data.data.totalNoOfDistricts,
            indiadata: res.data.data,
            // statename: statenames,
            chart: chartConfigs
          });
          dataSource.data[0].data = res.data.data.mapDataBeanList;
        } else if (res.data.error !== undefined) {
          if (res.data.error.errorCode === 153) {
            window.location.href = "../login.html?redirect=maps";
          }
        }
        this.forceUpdate();
      })
      .catch(e => {
        Swal({
          type: "error",
          title: "Oops...",
          text: e
        });
      });
  }
  render() {
    return (
      <div>
        <Header />
        <div className="mainbody">
          <Sidebar history={this.props.history} />
          <div style={{ backgroundColor: "#F2F2F2" }} className="main">
            <FarmerHeader label={this.state.label} />
            <div style={{ marginLeft: "0" }} className="row">
              <div id="farmersidebar">
                <FarmerSidebar
                  farmers={this.state.farmer}
                  district={this.state.district}
                  states={this.state.states}
                  // statename={this.state.statename}
                  // districtname={this.state.districtname}
                />
              </div>
              <div
                style={{ paddingLeft: "0", overflowX: "hidden" }}
                className=" table-responsive"
              >
                {/* {" "}
                <button
                  className="btn btn-outline-secondary btn-sm"
                  id="drillUp"
                  style={{
                    display: "none",
                    float: "right",
                    marginRight: "30px",
                    marginTop: "10px",
                    color: "blue"
                    // backgroundColor: "#f2f2f2"
                  }}
                >
                  <span
                    className="glyphicon glyphicon-menu-left"
                    style={{ marginRight: "6px" }}
                    aria-hidden="true"
                  />
                  Back
                </button> */}
                <p
                  id="first"
                  style={{
                    paddingTop: "4px",
                    display: "block",
                    background: "rgb(242, 242, 242)",
                    textAlign: "center",
                    marginRight: "20%",
                    minHeight: "5vh"
                  }}
                >
                  {this.state.message}
                </p>
                {/* <p
                  id="second"
                  style={{
                    padding: "4px",
                    display: "none",
                    background: "rgb(242, 242, 242)",
                    textAlign: "center",
                    // marginLeft: "5%",
                    minHeight:'5vh'
                  }}
                >
                  {this.state.message}
                </p> */}
                <div id="chartmap">
                  <ReactFC {...this.state.chart} />
                </div>
                <div
                  id="maptable"
                  style={{
                    marginTop: "6px",
                    display: "none",
                    overflow: "scroll",
                    maxHeight: "80vh",
                    paddingLeft: "6px",
                    paddingRight: "6px"
                  }}
                >
                  <div style={{ minHeight: "101%" }} />
                  {this.state.tabledata.map((item, number) => {
                    let mod = number % 2;
                    return (
                      <div>
                        <div
                          className={
                            mod !== 0
                              ? "panel panel-default graycolortable"
                              : "panel panel-default"
                          }
                          style={{ padding: "2px", marginBottom: "5px" }}
                          // className="panel panel-default"
                        >
                          {/* <div
                            className="panel-heading"
                            style={{ backgroundColor: "transparent" }}
                          >
                            <div className="row">
                              <div className="col-md-10">
                                <span style={{ fontSize: "large" }}>
                                  <b>{item.name}</b>,{" "}
                                  <small>{item.contactNo}</small>
                                </span>
                              </div>
                              <div className="col-md-2">
                                <div>
                                  <span>Last Update:{item.lastUpdate}</span>
                                </div>
                              </div>
                            </div>
                          </div> */}
                          <div className="panel-body">
                            <div className="row">
                              <div
                                className="col-md-1"
                                style={{ width: "3.333333%" }}
                              >
                                {number + 1}.
                              </div>
                              <div className="col-md-1">
                                <img
                                  src={user}
                                  style={{ width: "6em", opacity: "0.5" }}
                                  alt="user img"
                                />
                              </div>
                              <div className="col-md-10">
                                <div
                                  className="row"
                                  style={{ marginBottom: "6px" }}
                                >
                                  <div
                                    className="col-md-10"
                                    style={{ textAlign: "center" }}
                                  >
                                    <span style={{ fontSize: "inherit" }}>
                                      {item.name !== null &&
                                        item.name !== "N.A" && (
                                          <b>
                                            {" "}
                                            {"  "} {item.name}
                                          </b>
                                        )}
                                      {item.contactNo !== null &&
                                        item.contactNo !== "N.A" && (
                                          <span>
                                            , <small>{item.contactNo}</small>
                                          </span>
                                        )}
                                    </span>
                                  </div>
                                  <div className="col-md-2">
                                    {item.lastUpdate !== null &&
                                      item.lastUpdate !== "N.A" && (
                                        <div>
                                          <span>Last Update:</span>
                                          <span style={{ color: "#777" }}>
                                            {item.lastUpdate}
                                          </span>
                                        </div>
                                      )}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-4">
                                    {item.fatherName !== null &&
                                      item.fatherName !== "N.A" && (
                                        <span>
                                          <span>S/O </span>
                                          <span style={{ color: "#777" }}>
                                            {item.fatherName}
                                          </span>
                                        </span>
                                      )}
                                    <br />
                                    {item.dob !== null && item.dob !== "N.A" && (
                                      <span>
                                        <span>DOB:</span>{" "}
                                        <span style={{ color: "#777" }}>
                                          {item.dob}
                                        </span>
                                      </span>
                                    )}
                                    {item.dob !== null &&
                                      item.dob !== "N.A" &&
                                      item.gender !== null &&
                                      item.gender !== "N.A" && (
                                        <span style={{ color: "#777" }}>
                                          ,{" "}
                                          {item.gender === "M"
                                            ? "Male"
                                            : "Female"}
                                        </span>
                                      )}
                                    {(item.dob === null ||
                                      item.dob === "N.A") &&
                                      (item.gender !== null &&
                                        item.gender !== "N.A") && (
                                        <span>
                                          <span>Gender :</span>
                                          <span style={{ color: "#777" }}>
                                            {" "}
                                            {item.gender === "M"
                                              ? "Male"
                                              : "Female"}
                                          </span>
                                        </span>
                                      )}

                                    <br />
                                    {item.farmerRegDate !== null &&
                                      item.farmerRegDate !== "N.A" && (
                                        <span>
                                          <span>Registered on: </span>
                                          <span style={{ color: "#777" }}>
                                            {" "}
                                            {item.farmerRegDate}
                                          </span>
                                        </span>
                                      )}
                                  </div>
                                  <div className="col-md-4">
                                    {item.community !== null &&
                                      item.community !== "N.A" && (
                                        <span>
                                          Community:{" "}
                                          <span style={{ color: "#777" }}>
                                            {" "}
                                            {item.community}
                                          </span>
                                        </span>
                                      )}
                                    {item.community !== null &&
                                      item.community !== "N.A" &&
                                      item.subCommunity !== null &&
                                      item.subCommunity !== "N.A" && (
                                        <span style={{ color: "#777" }}>
                                          , {item.subCommunity}
                                        </span>
                                      )}
                                    {item.community === null &&
                                      item.community === "N.A" &&
                                      item.subCommunity !== null &&
                                      item.subCommunity !== "N.A" && (
                                        <span>
                                          Sub-community:{" "}
                                          <span style={{ color: "#777" }}>
                                            {item.subCommunity}{" "}
                                          </span>
                                        </span>
                                      )}
                                    <br />
                                    {item.govtCardHolder !== null &&
                                      item.govtCardHolder !== "N.A" && (
                                        <span>
                                          Govt. card Holder:{" "}
                                          <span style={{ color: "#777" }}>
                                            {item.govtCardHolder}
                                          </span>
                                        </span>
                                      )}

                                    <br />
                                    {item.totalLandSize !== null &&
                                      item.totalLandSize !== "N.A" && (
                                        <span>
                                          Land Size:{" "}
                                          <span style={{ color: "#777" }}>
                                            {item.totalLandSize}
                                            {" Sq Ft"}
                                          </span>
                                        </span>
                                      )}
                                  </div>
                                  <div className="col-md-4">
                                    {item.houseType !== null &&
                                      item.houseType !== "N.A" && (
                                        <span>
                                          House type:{" "}
                                          <span style={{ color: "#777" }}>
                                            {" "}
                                            {item.houseType}
                                          </span>
                                        </span>
                                      )}

                                    <br />
                                    {((item.block !== null &&
                                      item.block !== "N.A") ||
                                      (item.district !== null &&
                                        item.district !== "N.A") ||
                                      (item.village !== null &&
                                        item.village !== "N.A")) && (
                                      <span>Address: </span>
                                    )}

                                    {item.block !== null &&
                                      item.block !== "N.A" && (
                                        <span style={{ color: "#777" }}>
                                          {item.block}
                                        </span>
                                      )}
                                    {item.district !== null &&
                                      item.district !== "N.A" && (
                                        <span style={{ color: "#777" }}>
                                          , {item.district}
                                        </span>
                                      )}
                                    {item.village !== null &&
                                      item.village !== "N.A" && (
                                        <span style={{ color: "#777" }}>
                                          , {item.village}
                                        </span>
                                      )}

                                    <br />
                                    {item.state !== null &&
                                      item.state !== "N.A" && (
                                        <span>
                                          State:{" "}
                                          <span style={{ color: "#777" }}>
                                            {" "}
                                            {item.state}
                                          </span>
                                        </span>
                                      )}
                                    {item.pincode !== null &&
                                      item.pincode !== "N.A" && (
                                        <span>
                                          , PIN:{" "}
                                          <span style={{ color: "#777" }}>
                                            {item.pincode}
                                          </span>
                                        </span>
                                      )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div
                  id="listendmessage"
                  style={{
                    display: "none",
                    margin: "0 auto",
                    textAlign: "center"
                  }}
                >
                  You have come till the end of list.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Farmer;
