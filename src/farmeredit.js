import React, { Component } from "react";
import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import axios from "axios";
import { Link } from "react-router-dom";
import farmerimg from "./pins/user.png";
import config from "./config.js";
import Swal from "sweetalert2";
import AWS from "aws-sdk";
import statedistrict from "./state_json.js";
// import templateimg from './pins/doc.jpeg'
const $ = require("jquery");

AWS.config.region = "ap-south-1";
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "ap-south-1:8616b2f3-782b-42af-b051-dea274f9e16f"
});
const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: "claro-farmers" }
});
class FarmerHeader extends Component {
  render() {
    return (
      <div className="container ">
        <nav
          style={{ backgroundColor: "#edeef0", borderBottomColor: "darkgray" }}
          className="navbar navbar-default"
        >
          <div
            className="container-fluid "
            style={{ textAlign: "center", marginTop: "10px" }}
          >
            <Link to="/farmer">
              <button
                type="button"
                className="btn btn-default"
                aria-label="Left Align"
                id="drillUp"
                style={{
                  // display: "none",
                  // borderColor: "darkgray",
                  float: "left",
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
            </Link>
            {/* <Link to="/farmeradd">
              <div className="newfarmer">
                <button
                  type="button"
                  className=" btn btn-default"
                  aria-label="Left Align"
                  id="drillUp"
                  style={{
                    // display: "none",
                    // borderColor: "darkgray",
                    float: "right",
                    outline: "none",
                    backgroundColor: "transparent"
                  }}
                >
                  <span
                    className="glyphicon glyphicon-plus"
                    style={{ marginRight: "6px" }}
                    aria-hidden="true"
                  />
                  Add Farmer
                </button>
              </div>
            </Link> */}
            <span style={{ fontSize: "large", color: "blue" }}>
              Farmer database in India
            </span>
          </div>
        </nav>
      </div>
    );
  }
}

class Farmereditshow extends Component {
  render() {
    return (
      <div id="showsidetab" style={{ display: "none" }}>
        <div className="container">
          <div className="row farmerinfoheader">
            <div className="col-xs-2">
              {this.props.famerinfo.farmerImage !== null &&
              this.props.famerinfo.farmerImage !== "NA" &&
              this.props.famerinfo.farmerImage !== "N.A" ? (
                <img
                  style={{
                    marginTop: "1em",
                    borderRadius: "50%",
                    height: "17vh"
                  }}
                  width="100%"
                  src={this.props.famerinfo.farmerImage}
                  alt="farmerimg"
                />
              ) : (
                <img
                  width="100%"
                  style={{ marginTop: "1em", height: "17vh" }}
                  src={farmerimg}
                  alt="placeholder farmerimg"
                />
              )}
            </div>
            <div className="col-xs-10 famerinfoheaderbox">
              <div className="row">
                <div className="col-sm-8">
                  <div className="row">
                    <div className="col-xs-8">
                      <span style={{ fontSize: "1.4em" }}>
                        {this.props.famerinfo.name}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  {/* <div className="col-xs-6" /> */}
                  <div className="col-xs-12">
                    <button
                      onClick={this.props.handleeditfarmer}
                      type="button"
                      className="btn btn-default "
                      aria-label="Right Align"
                      // id="drillUp"
                      style={{
                        // display: "none",
                        width: "40%",
                        borderRadius: "0px",
                        borderColor: "darkgray",
                        float: "right",
                        outline: "none",
                        color: "white",
                        backgroundColor: "blue"
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-4">
                  {/* <div className="row">
                    <div className="col-xs-8">
                      <span style={{ fontSize: "1.4em" }}>
                        {this.props.famerinfo.name}
                      </span>
                    </div>
                  </div> */}
                  <div className="row">
                    <div className="col-xs-8">
                      <span>
                        S/O {this.props.famerinfo.fatherName},{" "}
                        {this.props.famerinfo.gender}
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    {/* <div className="col-xs-6">Contact No</div> */}
                    <div className="col-xs-8">
                      {this.props.famerinfo.contactNo !== "N.A" &&
                        this.props.famerinfo.contactNo !== "" && (
                          <span>+91{this.props.famerinfo.contactNo}</span>
                        )}
                    </div>
                  </div>
                </div>
                {/* <div className="col-sm-1" /> */}
                <div className="col-sm-4">
                  <div className="row"> </div>
                  <div className="row">
                    <div className="col-xs-12">
                      {this.props.famerinfo.uidType} :{" "}
                      {this.props.famerinfo.uid}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12">
                      <span>DOB:{this.props.famerinfo.dob}</span>
                    </div>
                  </div>
                </div>
                {/* <div className="col-sm-3" /> */}
              </div>
            </div>
          </div>
          <div className="row farmerinfobody">
            <div className="col-md-5">
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">Vertical</div>
                <div className="col-xs-6">{this.props.famerinfo.vertical}</div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">
                  Intervention Size
                </div>
                <div className="col-xs-6">
                  {this.props.famerinfo.interventionSize}
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">Reg. Date</div>
                <div className="col-xs-6">
                  {this.props.famerinfo.farmerRegDate}
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">
                  Govt. Card Holder
                </div>
                <div className="col-xs-6">
                  {this.props.famerinfo.govtCardHolder}
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">
                  Total Land Size
                </div>
                <div className="col-xs-6">
                  {this.props.famerinfo.totalLandSize} Sq. Ft.
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">
                  Income From Land
                </div>
                <div className="col-xs-6">
                  {this.props.famerinfo.incomeFromLand}
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">Latitude</div>
                <div className="col-xs-6">{this.props.famerinfo.latitude}</div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">Longitude</div>
                <div className="col-xs-6">{this.props.famerinfo.longitude}</div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">Informer Name</div>
                <div className="col-xs-6">
                  {this.props.famerinfo.farmerInfoInformerName}
                </div>
              </div>
            </div>
            <div className="col-md-1" />
            <div className="col-md-5">
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">State</div>
                <div className="col-xs-6">{this.props.famerinfo.state}</div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">District</div>
                <div className="col-xs-6">{this.props.famerinfo.district}</div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">Block</div>
                <div className="col-xs-6">{this.props.famerinfo.block}</div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">Community</div>
                <div className="col-xs-6">{this.props.famerinfo.community}</div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">Sub-community</div>
                <div className="col-xs-6">
                  {this.props.famerinfo.subCommunity}
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">Village</div>
                <div className="col-xs-6">{this.props.famerinfo.village}</div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">Pincode</div>
                <div className="col-xs-6">{this.props.famerinfo.pincode}</div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">House Type</div>
                <div className="col-xs-6">{this.props.famerinfo.houseType}</div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">Status</div>
                <div className="col-xs-6">
                  {this.props.famerinfo.entryStatus}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Farmeredit extends Component {
  render() {
    return (
      <div
        id="showsidetabeditfarmer"
        style={{
          maxHeight: "90vh",
          overflow: "scroll",
          display: "none"
        }}
      >
        <div className="container">
          <div className="row farmerinfoheader ">
            <div className="col-xs-4">
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">
                  Name{" "}
                  <i
                    title="Mandatory fields"
                    style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
                    className="fa fa-info-circle"
                    aria-hidden="true"
                  />
                </div>
                <div className="col-xs-6">
                  <span style={{ fontSize: "1.4em" }}>
                    {/* {this.props.famerinfo.name} */}
                    <input
                      name="name"
                      type="text"
                      className="form-control"
                      id="name"
                      value={this.props.famerinfo.name || ""}
                      onChange={this.props.handleInputChange}
                      placeholder="Name"
                      required
                    />
                  </span>
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">
                  Vertical{" "}
                  <i
                    title="Mandatory fields"
                    style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
                    className="fa fa-info-circle"
                    aria-hidden="true"
                  />
                </div>
                <div className="col-xs-6">
                  <select
                    name="vertical"
                    onChange={this.props.handleInputChange}
                    value={this.props.famerinfo.vertical}
                    className="form-control"
                    id="vertical"
                  >
                    <option value="Solar Irrigation Pump">
                      Solar Irrigation Pump
                    </option>
                    <option value="Solar Drinking Water Pump">
                      Solar Drinking Water Pump
                    </option>
                    <option value="Solar Mini Grid">Solar Mini Grid</option>
                    <option value="Solar Irrigation Service">
                      Solar Irrigation Service
                    </option>
                  </select>
                </div>
              </div>

              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">
                  <span>
                    Gender{" "}
                    <i
                      title="Mandatory fields"
                      style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
                      className="fa fa-info-circle"
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <div className="col-xs-6">
                  <div>
                    <select
                      name="gender"
                      onChange={this.props.handleInputChange}
                      value={this.props.famerinfo.gender}
                      className="form-control"
                      id="sel1"
                    >
                      <option value="M">M</option>
                      <option value="F">F</option>
                      <option value="NA">NA</option>
                    </select>
                  </div>
                  {/* <input
                    name="gender"
                    type="text"
                    className="form-control"
                    id="gender"
                    value={this.props.famerinfo.gender}
                    onChange={this.props.handleInputChange}
                    placeholder="Gender(M/F)"
                  /> */}
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">
                  Status{" "}
                  <i
                    title="Mandatory fields"
                    style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
                    className="fa fa-info-circle"
                    aria-hidden="true"
                  />
                </div>
                <div className="col-xs-6">
                  <div>
                    <select
                      name="entryStatus"
                      onChange={this.props.handleInputChange}
                      value={this.props.famerinfo.entryStatus}
                      className="form-control"
                      id="sel3"
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
                    </select>
                  </div>
                  {/* <input
                    name="entryStatus"
                    type="text"
                    className="form-control"
                    id="entryStatus"
                    value={this.props.famerinfo.entryStatus}
                    onChange={this.props.handleInputChange}
                    placeholder="Status"
                  /> */}
                </div>
              </div>
              {/* <div className="row farmerinforow">
                <div className="col-xs-6">
                  <span>DOB</span>
                </div>
                <div className="col-xs-6">
                  <input
                    name="dob"
                    type="date"
                    className="form-control"
                    id="dob"
                    value={this.props.famerinfo.dob}
                    onChange={this.props.handleInputChange}
                    placeholder="DOB(dd/mm/yyyy)"
                  />
                </div>
              </div> */}
            </div>
            <div className="col-xs-1" />
            <div className="col-xs-4 ">
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">
                  State{" "}
                  <i
                    title="Mandatory fields"
                    style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
                    className="fa fa-info-circle"
                    aria-hidden="true"
                  />
                </div>
                <div className="col-xs-6">
                  <select
                    name="state"
                    onChange={this.props.handleInputChange}
                    value={this.props.famerinfo.state}
                    className="form-control"
                    id="state"
                  >
                    {Object.keys(statedistrict).map(item => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">
                  District{" "}
                  <i
                    title="Mandatory fields"
                    style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
                    className="fa fa-info-circle"
                    aria-hidden="true"
                  />
                </div>
                <div className="col-xs-6">
                  {this.props.famerinfo.state !== null &&
                    this.props.famerinfo.state !== undefined && (
                      <select
                        name="district"
                        onChange={this.props.handleInputChange}
                        value={this.props.famerinfo.district}
                        className="form-control"
                        id="district"
                      >
                        {statedistrict[this.props.famerinfo.state].map(item => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    )}

                  {/* <input
                    name="district"
                    type="text"
                    className="form-control"
                    id="district"
                    value={this.props.famerinfo.district}
                    onChange={this.props.handleInputChange}
                    placeholder="District"
                    required
                  /> */}
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">
                  Latitude{" "}
                  <i
                    title="Mandatory fields"
                    style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
                    className="fa fa-info-circle"
                    aria-hidden="true"
                  />
                </div>
                <div className="col-xs-6">
                  <input
                    name="latitude"
                    max="8"
                    min="36"
                    type="number"
                    className="form-control"
                    id="latitude"
                    value={this.props.famerinfo.latitude || ""}
                    onChange={this.props.handleInputChange}
                    placeholder="Latitude"
                    required
                  />
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">
                  Longitude{" "}
                  <i
                    title="Mandatory fields"
                    style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
                    className="fa fa-info-circle"
                    aria-hidden="true"
                  />
                </div>
                <div className="col-xs-6">
                  <input
                    name="longitude"
                    type="number"
                    className="form-control"
                    id="longitude"
                    value={this.props.famerinfo.longitude || ""}
                    onChange={this.props.handleInputChange}
                    placeholder="Longitude"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="col-xs-3">
              <div className="row">
                <button
                  onClick={this.props.handleeditfarmersave}
                  type="submit"
                  className="btn btn-default"
                  aria-label="Right Align"
                  id="drillUp"
                  style={{
                    // display: "none",
                    width: "35%",
                    borderRadius: "0px",
                    marginBottom: "1em",
                    borderColor: "darkgray",
                    float: "left",
                    outline: "none",
                    color: "white",
                    backgroundColor: "blue"
                  }}
                >
                  Save
                </button>
                <button
                  onClick={this.props.handlecancelfarmer}
                  type="button"
                  className="cancelbutton btn btn-default"
                  aria-label="Right Align"
                  id="drillUp"
                  style={{
                    // display: "none",
                    width: "35%",
                    marginLeft: "1em",
                    borderRadius: "0px",
                    borderColor: "blue",
                    float: "left",
                    outline: "none",
                    color: "blue",
                    backgroundColor: "white"
                  }}
                >
                  Cancel
                </button>
              </div>
              <div className="row" style={{ marginTop: "3em" }}>
                <label>
                  <b>Upload Image:</b>
                  <input
                    type="file"
                    onChange={e => this.props.handleChangeimage(e.target.files)}
                    ref={this.props.fileInput}
                    style={{ width: "-webkit-fill-available" }}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="row farmerinfobody">
            <div className="col-md-4">
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">
                  <span>Father Name</span>
                </div>
                <div className="col-xs-6">
                  <input
                    name="fatherName"
                    type="text"
                    className="form-control"
                    id="fathername"
                    value={this.props.famerinfo.fatherName || ""}
                    onChange={this.props.handleInputChange}
                    placeholder="Father Name"
                  />
                </div>
              </div>

              <div className="row farmerinforow">
                <div
                  className="col-xs-6 farmerinforowtitle"
                  title="Please fill values in Wp"
                >
                  Intervention Size
                </div>
                <div className="col-xs-6">
                  <input
                    name="interventionSize"
                    type="number"
                    className="form-control"
                    id="interventionSize"
                    value={this.props.famerinfo.interventionSize || ""}
                    onChange={this.props.handleInputChange}
                    placeholder="Size in Wp"
                  />
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">Reg. Date</div>
                <div className="col-xs-6">
                  <input
                    name="farmerRegDate"
                    type="date"
                    className="form-control"
                    id="farmerRegDate"
                    value={this.props.famerinfo.farmerRegDate}
                    onChange={this.props.handleInputChange}
                    placeholder="Farmer Reg. date(dd/mm/yyyy)"
                  />
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">
                  Govt. Card Holder
                </div>
                <div className="col-xs-6">
                  <input
                    name="govtCardHolder"
                    type="text"
                    className="form-control"
                    id="govtCardHolder"
                    value={this.props.famerinfo.govtCardHolder || ""}
                    onChange={this.props.handleInputChange}
                    placeholder="Govt. Card Holder (Y/N)"
                  />
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">
                  Total Land Size
                </div>
                <div className="col-xs-6">
                  <input
                    name="totalLandSize"
                    type="number"
                    className="form-control"
                    id="totalLandSize"
                    value={this.props.famerinfo.totalLandSize || ""}
                    onChange={this.props.handleInputChange}
                    placeholder="Land Size in Sq. Ft."
                  />
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">
                  Income From Land
                </div>
                <div className="col-xs-6">
                  <input
                    name="incomeFromLand"
                    type="number"
                    className="form-control"
                    id="incomeFromLand"
                    value={this.props.famerinfo.incomeFromLand || ""}
                    onChange={this.props.handleInputChange}
                    placeholder="Income From Land in rupee"
                  />
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">Contact No</div>
                <div className="col-xs-6">
                  <input
                    name="contactNo"
                    type="number"
                    className="form-control"
                    id="contactno"
                    value={this.props.famerinfo.contactNo || ""}
                    onChange={this.props.handleInputChange}
                    placeholder="Contact Number "
                  />
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">Modified By</div>
                <div className="col-xs-6">
                  <input
                    name="modifiedBy"
                    type="text"
                    className="form-control"
                    id="modifiedBy"
                    value={this.props.famerinfo.modifiedBy || ""}
                    onChange={this.props.handleInputChange}
                    placeholder="Modified By"
                  />
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">Informer Name</div>
                <div className="col-xs-6">
                  <input
                    name="farmerInfoInformerName"
                    type="text"
                    className="form-control"
                    id="farmerInfoInformerName"
                    value={this.props.famerinfo.farmerInfoInformerName || ""}
                    onChange={this.props.handleInputChange}
                    placeholder="Farmer Info Informer Name"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-1" />
            <div className="col-md-4">
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">
                  <span>UID Type</span>
                </div>
                <div className="col-xs-6">
                  <div>
                    <select
                      name="uidType"
                      onChange={this.props.handleInputChange}
                      value={this.props.famerinfo.uidType}
                      className="form-control"
                      id="sel2"
                    >
                      <option value="AADHAAR">AADHAAR</option>
                      <option value="VOTER ID">VOTER ID</option>
                      <option value="LICENSE">LICENSE</option>
                      <option value="PAYGO">PAYGO</option>
                      <option value="CLARO ID">CLARO ID</option>
                      <option value="SYSTEM_GENERATED">SYSTEM_GENERATED</option>
                      <option value="OTHERS">OTHERS</option>
                      <option value="NA">NA</option>
                    </select>
                  </div>
                  {/* <input
                    name="uidType"
                    type="text"
                    className="form-control"
                    id="uidType"
                    value={this.props.famerinfo.uidType}
                    onChange={this.props.handleInputChange}
                    placeholder="UID Type"
                  /> */}
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">
                  <span>UID</span>
                </div>
                <div className="col-xs-6">
                  <input
                    name="uid"
                    type="text"
                    className="form-control"
                    id="uid"
                    value={this.props.famerinfo.uid || ""}
                    onChange={this.props.handleInputChange}
                    placeholder="UID "
                  />
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">Block</div>
                <div className="col-xs-6">
                  <input
                    name="block"
                    type="text"
                    className="form-control"
                    id="block"
                    value={this.props.famerinfo.block || ""}
                    onChange={this.props.handleInputChange}
                    placeholder="Block"
                  />
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">Community</div>
                <div className="col-xs-6">
                  <input
                    name="community"
                    type="text"
                    className="form-control"
                    id="community"
                    value={this.props.famerinfo.community || ""}
                    onChange={this.props.handleInputChange}
                    placeholder="Community"
                  />
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">Sub-community</div>
                <div className="col-xs-6">
                  <input
                    name="subCommunity"
                    type="text"
                    className="form-control"
                    id="subCommunity"
                    value={this.props.famerinfo.subCommunity || ""}
                    onChange={this.props.handleInputChange}
                    placeholder="Sub Community"
                  />
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">Village</div>
                <div className="col-xs-6">
                  <input
                    name="village"
                    type="text"
                    className="form-control"
                    id="village"
                    value={this.props.famerinfo.village || ""}
                    onChange={this.props.handleInputChange}
                    placeholder="Village"
                  />
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">Pincode</div>
                <div className="col-xs-6">
                  <input
                    name="pincode"
                    type="number"
                    className="form-control"
                    id="pincode"
                    value={this.props.famerinfo.pincode || ""}
                    onChange={this.props.handleInputChange}
                    placeholder="Pincode"
                  />
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">House Type</div>
                <div className="col-xs-6">
                  <input
                    name="houseType"
                    type="text"
                    className="form-control"
                    id="houseType"
                    value={this.props.famerinfo.houseType || ""}
                    onChange={this.props.handleInputChange}
                    placeholder="House Type"
                  />
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">
                  <span>DOB</span>
                </div>
                <div className="col-xs-6">
                  <input
                    name="dob"
                    type="date"
                    className="form-control"
                    id="dob"
                    value={this.props.famerinfo.dob}
                    onChange={this.props.handleInputChange}
                    placeholder="DOB(dd/mm/yyyy)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class Farmeraddnew extends Component {
  constructor(props) {
    super(props);
    this.state = { famerinfo: {}, backupinfo: {} };
    this.fileInput1 = React.createRef();
  }
  handlecancelfarmer = () => {
    this.setState({ famerinfo: Object.assign({}, this.state.backupinfo) });
    document.getElementById("showsidetab").style.display = "none";
    document.getElementById("showsidetabeditfarmer").style.display = "none";
    document.getElementById("farmeraddnew").style.display = "none";
    this.props.getfarmer();
  };
  handleInputChange = event => {
    event.persist();
    let temp = this.state.famerinfo;
    temp[event.target.name] = event.target.value;
    this.setState({ famerinfo: temp });
  };
  handleChangeimage = () => {
    var file = this.fileInput1.current.files[0];
    var fileName = +this.state.famerinfo.id + "-" + Date.now();
    // var albumPhotosKey = encodeURIComponent(albumName) + '//';
    let self = this;
    var photoKey = fileName;
    s3.upload(
      {
        Key: photoKey,
        Body: file,
        ACL: "public-read"
      },
      function(err, data) {
        if (err) {
          return alert(
            "There was an error uploading your photo: ",
            err.message
          );
        } else {
          let temp = self.state.famerinfo;
          temp.farmerImage = data.Location;
          self.setState({ famerinfo: temp });
          alert("Img uploaded succesfully");
        }
      }
    );
  };
  handleeditfarmersave = () => {
    delete this.state.famerinfo["modificationTime"];
    delete this.state.famerinfo["id"];
    if (
      this.state.famerinfo.name &&
      this.state.famerinfo.name.replace(/\s/g, "").length !== 0 &&
      this.state.famerinfo.gender &&
      this.state.famerinfo.gender.replace(/\s/g, "").length !== 0 &&
      this.state.famerinfo.entryStatus &&
      this.state.famerinfo.entryStatus.replace(/\s/g, "").length !== 0 &&
      this.state.famerinfo.vertical &&
      this.state.famerinfo.vertical.replace(/\s/g, "").length !== 0 &&
      this.state.famerinfo.latitude &&
      this.state.famerinfo.latitude.replace(/\s/g, "").length !== 0 &&
      this.state.famerinfo.longitude &&
      this.state.famerinfo.longitude.replace(/\s/g, "").length !== 0 &&
      this.state.famerinfo.state &&
      this.state.famerinfo.state.replace(/\s/g, "").length !== 0 &&
      this.state.famerinfo.district &&
      this.state.famerinfo.district.replace(/\s/g, "").length !== 0
    ) {
      if (
        this.state.famerinfo.latitude > 37 ||
        this.state.famerinfo.latitude < 8
      ) {
        alert("Please set valid Latitude value.(Lattitude - 8′N to 37′N)");
        let temp = this.state.famerinfo;
        temp["latitude"] = 0;
        this.setState({ famerinfo: temp });
        return;
      }
      if (
        this.state.famerinfo.longitude > 97 ||
        this.state.famerinfo.longitude < 68
      ) {
        alert("Please set valid Longitude value.(Longitude - 68′E to 97′E)");
        let temp = this.state.famerinfo;
        temp["longitude"] = 0;
        this.setState({ famerinfo: temp });
        return;
      }
      if (this.state.famerinfo.contactNo !== "") {
        if (
          this.state.famerinfo.contactNo.length !== 10 ||
          (this.state.famerinfo.contactNo.charAt(0) !== "9" &&
            this.state.famerinfo.contactNo.charAt(0) !== "8" &&
            this.state.famerinfo.contactNo.charAt(0) !== "7" &&
            this.state.famerinfo.contactNo.charAt(0) !== "6")
        ) {
          alert(
            "Please set valid Contact Number.(10 digit starting with 9/8/7)"
          );
          // let temp = this.state.famerinfo;
          // temp['conta'] = 0;
          // this.setState({ famerinfo: temp });
          return;
        }
      }
      axios({
        url: config.addfarmernew,
        method: "POST",
        data: this.state.famerinfo,
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          // console.log(res);
          if (res.data.data !== null && res.data.data.result) {
            this.setState({
              famerinfo: Object.assign({}, this.state.backupinfo)
            });
            Swal({
              type: "success",
              title: "Successfully data updated"
              // text: res.data.error.errorMsg
            });
            window.location.reload();
          } else {
            alert(res.data.error.errorMsg);
          }
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      Swal({
        type: "error",
        title: "Fill valid input in all mandatory fields"
        // text: res.data.error.errorMsg
      });
    }
  };
  componentDidMount() {
    axios({
      url: config.getfarmerschema,
      method: "POST",
      data: {
        temp: "temp"
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        // console.log(res.data);
        res.data.data.gender = "M";
        res.data.data.entryStatus = "ACTIVE";
        res.data.data.state = "Tripura";
        res.data.data.district = "Unakoti";
        res.data.data.vertical = "Solar Irrigation Pump";
        this.setState({
          famerinfo: res.data.data,
          backupinfo: Object.assign({}, res.data.data)
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    return (
      <div id="farmeraddnew" style={{ display: "none" }}>
        <div
          style={{
            maxHeight: "90vh",
            overflow: "scroll"
          }}
        >
          <div className="container">
            <div className="row farmerinfoheader ">
              <div className="col-sm-4">
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    Name{" "}
                    <i
                      title="Mandatory fields"
                      style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
                      className="fa fa-info-circle"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="col-xs-6">
                    <span style={{ fontSize: "1.4em" }}>
                      {/* {this.state.famerinfo.name} */}
                      <input
                        name="name"
                        type="text"
                        className="form-control"
                        id="name"
                        value={this.state.famerinfo.name}
                        onChange={this.handleInputChange}
                        placeholder="Name"
                        required
                      />
                    </span>
                  </div>
                </div>

                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    Vertical{" "}
                    <i
                      title="Mandatory fields"
                      style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
                      className="fa fa-info-circle"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="col-xs-6">
                    <select
                      name="vertical"
                      onChange={this.handleInputChange}
                      value={this.state.famerinfo.vertical}
                      className="form-control"
                      id="vertical"
                    >
                      <option value="Solar Irrigation Pump">
                        Solar Irrigation Pump
                      </option>
                      <option value="Solar Drinking Water Pump">
                        Solar Drinking Water Pump
                      </option>
                      <option value="Solar Mini Grid">Solar Mini Grid</option>
                      <option value="Solar Irrigation Service">
                        Solar Irrigation Service
                      </option>
                    </select>
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    <span>
                      Gender{" "}
                      <i
                        title="Mandatory fields"
                        style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
                        className="fa fa-info-circle"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <div className="col-xs-6">
                    <div>
                      <select
                        name="gender"
                        onChange={this.handleInputChange}
                        value={this.state.famerinfo.gender}
                        className="form-control"
                        id="sel1"
                      >
                        <option value="M">M</option>
                        <option value="F">F</option>
                        <option value="NA">NA</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    Status{" "}
                    <i
                      title="Mandatory fields"
                      style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
                      className="fa fa-info-circle"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="col-xs-6">
                    <div>
                      <select
                        name="entryStatus"
                        onChange={this.handleInputChange}
                        value={this.state.famerinfo.entryStatus}
                        className="form-control"
                        id="sel3"
                      >
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE">INACTIVE</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-1" />
              <div className="col-sm-4 ">
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    State{" "}
                    <i
                      title="Mandatory fields"
                      style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
                      className="fa fa-info-circle"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="col-xs-6">
                    <select
                      name="state"
                      onChange={this.handleInputChange}
                      value={this.state.famerinfo.state}
                      className="form-control"
                      id="state"
                    >
                      {Object.keys(statedistrict).map(item => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    District{" "}
                    <i
                      title="Mandatory fields"
                      style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
                      className="fa fa-info-circle"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="col-xs-6">
                    {this.state.famerinfo.state !== null &&
                      this.state.famerinfo.state !== undefined && (
                        <select
                          name="district"
                          onChange={this.handleInputChange}
                          value={this.state.famerinfo.district}
                          className="form-control"
                          id="district"
                        >
                          {statedistrict[this.state.famerinfo.state].map(
                            item => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            )
                          )}
                        </select>
                      )}
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    Latitude{" "}
                    <i
                      title="Mandatory fields"
                      style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
                      className="fa fa-info-circle"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="col-xs-6">
                    <input
                      name="latitude"
                      type="number"
                      className="form-control"
                      id="latitude"
                      value={this.state.famerinfo.latitude}
                      onChange={this.handleInputChange}
                      placeholder="Latitude"
                      required
                    />
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    Longitude{" "}
                    <i
                      title="Mandatory fields"
                      style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
                      className="fa fa-info-circle"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="col-xs-6">
                    <input
                      name="longitude"
                      type="number"
                      className="form-control"
                      id="longitude"
                      value={this.state.famerinfo.longitude}
                      onChange={this.handleInputChange}
                      placeholder="Longitude"
                      required
                    />
                  </div>
                </div>

                {/* <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">Contact No</div>
                  <div className="col-xs-6">
                    <input
                      name="contactNo"
                      type="number"
                      className="form-control"
                      id="contactno"
                      value={this.state.famerinfo.contactNo}
                      onChange={this.handleInputChange}
                      placeholder="Contact Number "
                    />
                  </div>
                </div> */}
                {/* <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    Created By{" "}
                    <i
                      title="Mandatory fields"
                      style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
                      class="fa fa-info-circle"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="col-xs-6">
                    <input
                      name="modifiedBy"
                      type="text"
                      className="form-control"
                      id="modifiedBy"
                      value={this.state.famerinfo.modifiedBy}
                      onChange={this.handleInputChange}
                      placeholder="Created By"
                    />
                  </div>
                </div> */}
              </div>
              <div className="col-sm-3">
                <div className="row">
                  <button
                    onClick={this.handleeditfarmersave}
                    type="submit"
                    className=" btn btn-default"
                    aria-label="Right Align"
                    style={{
                      // display: "none",
                      width: "35%",
                      borderRadius: "0px",
                      borderColor: "darkgray",
                      float: "left",
                      outline: "none",
                      backgroundColor: "blue",
                      color: "white"
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={this.handlecancelfarmer}
                    type="button"
                    className="cancelbutton btn btn-default"
                    aria-label="Right Align"
                    style={{
                      // display: "none",
                      width: "35%",
                      borderRadius: "0px",
                      marginLeft: "1em",
                      borderColor: "blue",
                      // float: "right",
                      outline: "none",
                      backgroundColor: "white",
                      color: "blue"
                    }}
                  >
                    Cancel
                  </button>
                </div>
                <div className="row" style={{ marginTop: "3em" }}>
                  <label>
                    <b>Upload Image:</b>
                    <input
                      onChange={this.handleChangeimage}
                      type="file"
                      ref={this.fileInput1}
                      style={{ width: "-webkit-fill-available" }}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="row farmerinfobody">
              <div className="col-md-4">
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">Contact No</div>
                  <div className="col-xs-6">
                    <input
                      name="contactNo"
                      type="number"
                      className="form-control"
                      id="contactno"
                      value={this.state.famerinfo.contactNo}
                      onChange={this.handleInputChange}
                      placeholder="Contact Number "
                    />
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    <span>Father Name</span>
                  </div>
                  <div className="col-xs-6">
                    <input
                      name="fatherName"
                      type="text"
                      className="form-control"
                      id="fathername"
                      value={this.state.famerinfo.fatherName}
                      onChange={this.handleInputChange}
                      placeholder="Father Name"
                    />
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div
                    className="col-xs-6 farmerinforowtitle"
                    title="Please fill values in Wp"
                  >
                    Intervention Size
                  </div>
                  <div className="col-xs-6">
                    <input
                      name="interventionSize"
                      type="number"
                      className="form-control"
                      id="interventionSize"
                      value={this.state.famerinfo.interventionSize}
                      onChange={this.handleInputChange}
                      placeholder="Size in Wp"
                    />
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">Reg. Date</div>
                  <div className="col-xs-6">
                    <input
                      name="farmerRegDate"
                      type="date"
                      className="form-control"
                      id="farmerRegDate"
                      value={this.state.famerinfo.farmerRegDate}
                      onChange={this.handleInputChange}
                      placeholder="Farmer Reg. date(dd/mm/yyyy)"
                    />
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    Govt. Card Holder
                  </div>
                  <div className="col-xs-6">
                    <input
                      name="govtCardHolder"
                      type="text"
                      className="form-control"
                      id="govtCardHolder"
                      value={this.state.famerinfo.govtCardHolder}
                      onChange={this.handleInputChange}
                      placeholder="Govt. Card Holder (Y/N)"
                    />
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    Total Land Size
                  </div>
                  <div className="col-xs-6">
                    <input
                      name="totalLandSize"
                      type="text"
                      className="form-control"
                      id="totalLandSize"
                      value={this.state.famerinfo.totalLandSize}
                      onChange={this.handleInputChange}
                      placeholder="Land Size in Sq. Ft."
                    />
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    Income From Land
                  </div>
                  <div className="col-xs-6">
                    <input
                      name="incomeFromLand"
                      type="text"
                      className="form-control"
                      id="incomeFromLand"
                      value={this.state.famerinfo.incomeFromLand}
                      onChange={this.handleInputChange}
                      placeholder="Income From Land in rupee"
                    />
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">DOB</div>
                  <div className="col-xs-6">
                    <input
                      name="dob"
                      type="date"
                      className="form-control"
                      id="dob"
                      value={this.state.famerinfo.dob}
                      onChange={this.handleInputChange}
                      placeholder="DOB"
                    />
                  </div>
                </div>
                {/* <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    Informer Name
                  </div>
                  <div className="col-xs-6">
                    <input
                      name="farmerInfoInformerName"
                      type="text"
                      className="form-control"
                      id="farmerInfoInformerName"
                      value={this.state.famerinfo.farmerInfoInformerName}
                      onChange={this.handleInputChange}
                      placeholder="Farmer Info Informer Name"
                    />
                  </div>
                </div> */}
              </div>
              <div className="col-md-1" />
              <div className="col-md-4">
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    <span>UID Type</span>
                  </div>
                  <div className="col-xs-6">
                    <div>
                      <select
                        name="uidType"
                        onChange={this.handleInputChange}
                        value={this.state.famerinfo.uidType}
                        className="form-control"
                        id="sel2"
                      >
                        <option value="AADHAAR">AADHAAR</option>
                        <option value="VOTER ID">VOTER ID</option>
                        <option value="LICENSE">LICENSE</option>
                        <option value="PAYGO">PAYGO</option>
                        <option value="CLARO ID">CLARO ID</option>
                        <option value="OTHERS">OTHERS</option>
                        <option value="NA">NA</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    <span>UID</span>
                  </div>
                  <div className="col-xs-6">
                    <input
                      name="uid"
                      type="text"
                      className="form-control"
                      id="uid"
                      value={this.state.famerinfo.uid}
                      onChange={this.handleInputChange}
                      placeholder="UID "
                    />
                  </div>
                </div>

                {/* <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    State{" "}
                    <i
                      title="Mandatory fields"
                      style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
                      class="fa fa-info-circle"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="col-xs-6">
                    <input
                      name="state"
                      type="text"
                      className="form-control"
                      id="state"
                      value={this.state.famerinfo.state}
                      onChange={this.handleInputChange}
                      placeholder="State"
                      required
                    />
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    District{" "}
                    <i
                      title="Mandatory fields"
                      style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
                      class="fa fa-info-circle"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="col-xs-6">
                    <input
                      name="district"
                      type="text"
                      className="form-control"
                      id="district"
                      value={this.state.famerinfo.district}
                      onChange={this.handleInputChange}
                      placeholder="District"
                      required
                    />
                  </div>
                </div> */}
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">Block</div>
                  <div className="col-xs-6">
                    <input
                      name="block"
                      type="text"
                      className="form-control"
                      id="block"
                      value={this.state.famerinfo.block}
                      onChange={this.handleInputChange}
                      placeholder="Block"
                    />
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">Community</div>
                  <div className="col-xs-6">
                    <input
                      name="community"
                      type="text"
                      className="form-control"
                      id="community"
                      value={this.state.famerinfo.community}
                      onChange={this.handleInputChange}
                      placeholder="Community"
                    />
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    Sub-community
                  </div>
                  <div className="col-xs-6">
                    <input
                      name="subCommunity"
                      type="text"
                      className="form-control"
                      id="subCommunity"
                      value={this.state.famerinfo.subCommunity}
                      onChange={this.handleInputChange}
                      placeholder="Sub Community"
                    />
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">Village</div>
                  <div className="col-xs-6">
                    <input
                      name="village"
                      type="text"
                      className="form-control"
                      id="village"
                      value={this.state.famerinfo.village}
                      onChange={this.handleInputChange}
                      placeholder="Village"
                    />
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">Pincode</div>
                  <div className="col-xs-6">
                    <input
                      name="pincode"
                      type="number"
                      className="form-control"
                      id="pincode"
                      value={this.state.famerinfo.pincode}
                      onChange={this.handleInputChange}
                      placeholder="Pincode"
                    />
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">House Type</div>
                  <div className="col-xs-6">
                    <input
                      name="houseType"
                      type="text"
                      className="form-control"
                      id="houseType"
                      value={this.state.famerinfo.houseType}
                      onChange={this.handleInputChange}
                      placeholder="House Type"
                    />
                  </div>
                </div>
                {/* <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">DOB</div>
                  <div className="col-xs-6">
                    <input
                      name="dob"
                      type="date"
                      className="form-control"
                      id="dob"
                      value={this.state.famerinfo.dob}
                      onChange={this.handleInputChange}
                      placeholder="DOB"
                    />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class Farmer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      farmerlist: [],
      searchvariantselected: "name",
      famerinfo: {},
      searchtext: "",
      backupinfo: {},
      scrollcount: 0,
      searchscrollcount: 0,
      searchhasmore: false,
      hasMore: false
    };
    this.fileInput = React.createRef();
  }
  handlesearch = event => {
    if (
      this.state.searchtext === event.target.value &&
      event.target.value.length > 3
    ) {
      this.setState({ searchtext: event.target.value });
      let tempsearchscrollcount = this.state.searchscrollcount + 1;
      axios({
        url: config.searchfarmer,
        method: "POST",
        data: {
          [this.state.searchvariantselected]: event.target.value,
          pageNo: tempsearchscrollcount
        },
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (res.data.data.list.length > 0) {
            this.setState({
              farmerlist: res.data.data.list,
              searchscrollcount: tempsearchscrollcount,
              searchhasmore: res.data.data.hasMore
            });
          } else {
            let temp = [{ name: "No result found", id: null }];
            this.setState({
              farmerlist: temp,
              searchscrollcount: 0,
              searchhasmore: res.data.data.hasMore
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
    } else if (
      this.state.searchtext !== event.target.value &&
      event.target.value.length > 3
    ) {
      this.setState({ searchtext: event.target.value });
      let tempsearchscrollcount = 1;
      axios({
        url: config.searchfarmer,
        method: "POST",
        data: {
          [this.state.searchvariantselected]: event.target.value,
          pageNo: tempsearchscrollcount
        },
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (res.data.data.list.length > 0) {
            this.setState({
              farmerlist: res.data.data.list,
              searchscrollcount: tempsearchscrollcount,
              searchhasmore: res.data.data.hasMore
            });
          } else {
            let temp = [{ name: "No result found", id: null }];
            this.setState({
              farmerlist: temp,
              searchscrollcount: 0,
              searchhasmore: res.data.data.hasMore
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
    } else if (
      this.state.searchtext !== event.target.value &&
      event.target.value.length <= 3
    ) {
      this.setState({ searchtext: event.target.value });
    }
    if (event.target.value.length === 0) {
      this.getfarmerlist();
    }
  };
  handleclick = item => {
    if (item.id !== null) {
      axios({
        url: config.getfarmer + item.id,
        method: "POST",
        data: {
          temp: "temp"
        },
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          this.setState({
            famerinfo: res.data.data,
            backupinfo: Object.assign({}, res.data.data)
          });
          document.getElementById("showsidetab").style.display = "block";
          document.getElementById("farmeraddnew").style.display = "none";
          document.getElementById("showsidetabeditfarmer").style.display =
            "none";
        })
        .catch(e => {
          console.log(e);
          Swal({
            type: "error",
            title: "Oops...",
            text: e
          });
        });
    }
  };
  handleclickaddfarmer = () => {
    document.getElementById("showsidetab").style.display = "none";
    document.getElementById("showsidetabeditfarmer").style.display = "none";
    document.getElementById("farmeraddnew").style.display = "block";
  };
  handleeditfarmer = () => {
    document.getElementById("showsidetab").style.display = "none";
    document.getElementById("showsidetabeditfarmer").style.display = "block";
    document.getElementById("farmeraddnew").style.display = "none";
  };
  handleInputChange = event => {
    event.persist();
    let temp = this.state.famerinfo;
    temp[event.target.name] = event.target.value;
    this.setState({ famerinfo: temp });
  };
  handlecancelfarmer = () => {
    this.setState({ famerinfo: Object.assign({}, this.state.backupinfo) });
    document.getElementById("showsidetab").style.display = "block";
    document.getElementById("showsidetabeditfarmer").style.display = "none";
  };
  handleeditfarmersave = async () => {
    delete this.state.famerinfo["modificationTime"];
    if (
      this.state.famerinfo.name &&
      this.state.famerinfo.name.replace(/\s/g, "").length !== 0 &&
      this.state.famerinfo.gender &&
      this.state.famerinfo.gender.replace(/\s/g, "").length !== 0 &&
      this.state.famerinfo.entryStatus &&
      this.state.famerinfo.entryStatus.replace(/\s/g, "").length !== 0 &&
      this.state.famerinfo.vertical &&
      this.state.famerinfo.vertical.replace(/\s/g, "").length !== 0 &&
      this.state.famerinfo.latitude &&
      this.state.famerinfo.latitude.replace(/\s/g, "").length !== 0 &&
      this.state.famerinfo.longitude &&
      this.state.famerinfo.longitude.replace(/\s/g, "").length !== 0 &&
      this.state.famerinfo.state &&
      this.state.famerinfo.state.replace(/\s/g, "").length !== 0 &&
      this.state.famerinfo.district &&
      this.state.famerinfo.district.replace(/\s/g, "").length !== 0
    ) {
      // console.log(this.fileInput.current.files[0])

      if (
        this.state.famerinfo.latitude > 37 ||
        this.state.famerinfo.latitude < 8
      ) {
        alert("Please set valid Latitude value.(Lattitude - 8′N to 37′N)");
        //  let temp = this.state.famerinfo;
        // temp['latitude'] = 0;
        // this.setState({ famerinfo: temp });
        return;
      }
      if (
        this.state.famerinfo.longitude > 97 ||
        this.state.famerinfo.longitude < 68
      ) {
        alert("Please set valid Longitude value.(Longitude - 68′E to 97′E)");
        //  let temp = this.state.famerinfo;
        // temp['longitude'] = 0;
        // this.setState({ famerinfo: temp });
        return;
      }
      if (this.state.famerinfo.contactNo !== "") {
        if (
          this.state.famerinfo.contactNo.length !== 10 ||
          (this.state.famerinfo.contactNo.charAt(0) !== "9" &&
            this.state.famerinfo.contactNo.charAt(0) !== "8" &&
            this.state.famerinfo.contactNo.charAt(0) !== "7" &&
            this.state.famerinfo.contactNo.charAt(0) !== "6")
        ) {
          alert(
            "Please set valid Contact Number.(10 digit starting with 9/8/7)"
          );
          // let temp = this.state.famerinfo;
          // temp['conta'] = 0;
          // this.setState({ famerinfo: temp });
          return;
        }
      }

      axios({
        url: config.updatefarmer,
        method: "POST",
        data: this.state.famerinfo,
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (res.data.data !== null && res.data.data.result) {
            Swal({
              type: "success",
              title: "Successfully data updated"
              // text: res.data.error.errorMsg
            });
            this.setState({
              backupinfo: Object.assign({}, this.state.famerinfo)
            });
            document.getElementById("showsidetab").style.display = "block";
            document.getElementById("showsidetabeditfarmer").style.display =
              "none";
            this.getfarmerlist();
          } else {
            alert(res.data.error.errorMsg);
          }
        })
        .catch(e => {
          console.log(e);
          Swal({
            type: "error",
            title: "Oops...",
            text: e
          });
        });
    } else {
      Swal({
        type: "error",
        title: "Fill valid input in all mandatory fields"
        // text: res.data.error.errorMsg
      });
    }
  };
  handleChangeimage = () => {
    var file = this.fileInput.current.files[0];
    var fileName = +this.state.famerinfo.id + "-" + Date.now();
    // var albumPhotosKey = encodeURIComponent(albumName) + '//';
    let self = this;
    var photoKey = fileName;
    s3.upload(
      {
        Key: photoKey,
        Body: file,
        ACL: "public-read"
      },
      function(err, data) {
        if (err) {
          return alert(
            "There was an error uploading your photo: ",
            err.message
          );
        } else {
          let temp = self.state.famerinfo;
          temp.farmerImage = data.Location;
          self.setState({ famerinfo: temp });
          alert("Img uploaded succesfully");
        }
      }
    );
  };
  handlesearchselect = event => {
    this.setState({ searchvariantselected: event.target.value });
  };
  getfarmerlist = () => {
    let count = 1;
    axios({
      url: config.farmerlist + count,
      method: "POST",
      data: {
        temp: "temp"
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        this.setState({
          farmerlist: res.data.data.list,
          scrollcount: count,
          hasMore: res.data.data.hasMore,
          searchhasmore: false,
          searchscrollcount: 0
        });
        axios({
          url: config.getfarmer + res.data.data.list[0].id,
          method: "POST",
          data: {
            temp: "temp"
          },
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => {
            this.setState({
              famerinfo: res.data.data,
              backupinfo: Object.assign({}, res.data.data)
            });
            document.getElementById("showsidetab").style.display = "block";
            document.getElementById("farmeraddnew").style.display = "none";
            document.getElementById("showsidetabeditfarmer").style.display =
              "none";
              $(".list-group-item").click(function(){
                console.log('click event')
                var listItems = $(".list-group-item"); //Select all list items
              
                //Remove 'active' tag for all list items
                for (let i = 0; i < listItems.length; i++) {                    
                  listItems[i].classList.remove("active");
                }
              
                //Add 'active' tag for currently selected item
                this.classList.add("active");
              });
              var listItems = $(".list-group-item");
              listItems[1].classList.add("active");
          })
          .catch(e => {
            console.log(e);
            Swal({
              type: "error",
              title: "Oops...",
              text: e
            });
            this.props.history.push({
              pathname: "/farmer"
            });
          });
      })
      .catch(e => {
        console.log(e);
        Swal({
          type: "error",
          title: "Oops...",
          text: e
        });
      });
  };
  componentDidMount() {
    let self = this;
    
    
    $("#maptable").scroll(function() {
      if (
        $(this).scrollTop() + $(this).innerHeight() >=
          $(this)[0].scrollHeight &&
        self.state.hasMore &&
        !self.state.searchhasmore &&
        self.state.searchscrollcount === 0
      ) {
        console.log("in list");
        document.getElementById("listendmessage").style.display = "none";
        let count = self.state.scrollcount + 1;
        let tabledatanow = self.state.farmerlist;

        axios({
          url: config.farmerlist + count,
          method: "POST",
          data: {},
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => {
            // console.log(res);

            self.setState({
              farmerlist: tabledatanow.concat(res.data.data.list),
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
            Swal({
              type: "error",
              title: "Oops...",
              text: e
            });
          });
      } else if (
        $(this).scrollTop() + $(this).innerHeight() >=
          $(this)[0].scrollHeight &&
        self.state.searchscrollcount >= 0 &&
        self.state.searchhasmore
      ) {
        console.log("in search");
        let tempsearchscrollcount = self.state.searchscrollcount + 1;
        let tabledatanow = self.state.farmerlist;
        axios({
          url: config.searchfarmer,
          method: "POST",
          data: {
            [self.state.searchvariantselected]: self.state.searchtext,
            pageNo: tempsearchscrollcount
          },
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => {
            if (res.data.data.list.length > 0) {
              self.setState({
                farmerlist: tabledatanow.concat(res.data.data.list),
                searchscrollcount: tempsearchscrollcount,
                searchhasmore: res.data.data.hasMore
              });
            } else {
              let temp = [{ name: "No result found", id: null }];
              self.setState({
                farmerlist: temp,
                searchscrollcount: 0,
                searchhasmore: res.data.data.hasMore
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
      } else if (
        $(this).scrollTop() + $(this).innerHeight() > $(this)[0].scrollHeight &&
        self.state.hasMore !== null &&
        !self.state.hasMore
      ) {
        // console.log('block',self.state.hasMore,($(this).scrollTop() + $(this).innerHeight() >
        // $(this)[0].scrollHeight))
        // let templist=this.state.farmerlist
        // templist.push({name:'You have come till the end of list.'})
        // this.setState({farmerlist:templist})
        document.getElementById("listendmessage").style.display = "block";
      } else {
        document.getElementById("listendmessage").style.display = "none";
      }
    });

    this.getfarmerlist();
  }
  handlelistactive = event => {
    // console.log(event)
  };

  render() {
    return (
      <div className="gauravwww">
        <Header />
        <div className="mainbody">
          <Sidebar history={this.props.history} />
          <div style={{ backgroundColor: "#F2F2F2" }} className="main">
            <FarmerHeader label={this.state.label} />
            <div className="row">
              <div
                className="col-xs-3"
                style={{
                  // height: "90vh",
                  // overflow: "scroll",
                  paddingRight: "0"
                }}
              >
                <div
                  className="list-group"
                >
                  <a 
                    onClick={this.handleclickaddfarmer}
                    className="list-group-item list-group-item-action flex-column align-items-start  "
                  >
                    <h4
                      style={{ textAlign: "right", fontSize: "13px" }}
                      className="list-group-item-heading"
                    >
                      <span
                        className="glyphicon glyphicon-plus"
                        style={{ marginRight: "6px" }}
                        aria-hidden="true"
                      />
                      <span>Add Farmer</span>
                    </h4>
                    {/* <p class="list-group-item-text" /> */}
                  </a>
                  <div className="row ">
                    <div className="col-xs-4" style={{ paddingRight: "0" }}>
                      <select
                        name="selectkey"
                        onChange={this.handlesearchselect}
                        value={this.state.searchvariantselected}
                        className="form-control"
                        id="sel1"
                      >
                        <option value="name">Name</option>
                        <option value="uid">Uid</option>
                        <option value="contactNo">Contact no.</option>
                      </select>
                    </div>
                    <div className="col-xs-8" style={{ paddingLeft: "0" }}>
                      <input
                        value={this.state.searchtext}
                        onChange={this.handlesearch}
                        type="search"
                        className="form-control "
                        placeholder="Search"
                        aria-label="..."
                      />
                    </div>
                  </div>
                  <div id="maptable" className="farmerlists">
                 
                    {this.state.farmerlist !== [] &&
                      this.state.farmerlist.map((item, index) => (
                        <a
                          
                          key={index}
                          onClick={this.handleclick.bind(this, item)}
                          className="list-group-item list-group-item-action flex-column align-items-start "
                        >
                          <h4 className="list-group-item-heading">
                            {item.name}
                          </h4>
                          {item.uid && item.uidType && (
                            <p className="list-group-item-text">
                              {item.uidType}: {item.uid}
                              {item.contactNo && (
                                <span style={{ float: "right" }}>
                                  {item.contactNo}
                                </span>
                              )}
                            </p>
                          )}
                        </a>
                      ))}
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
              <div className="col-xs-9 famerinfobox">
                <Farmereditshow
                  handleeditfarmer={this.handleeditfarmer}
                  famerinfo={this.state.famerinfo}
                />
                <Farmeredit
                  handleChangeimage={this.handleChangeimage}
                  fileInput={this.fileInput}
                  famerinfo={this.state.famerinfo}
                  handlecancelfarmer={this.handlecancelfarmer}
                  handleInputChange={this.handleInputChange}
                  handleeditfarmersave={this.handleeditfarmersave}
                />
                <Farmeraddnew getfarmer={this.getfarmerlist} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Farmer;
