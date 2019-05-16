import React, { Component } from "react";
import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import axios from "axios";
import imgmapcluster from "./pins/iconmapcluster.png";
import imgmapcluster1 from "./pins/iconmapclustercopy.png";
import imgmapcluster2 from "./pins/iconmapclustercopy2.png";
import imgmapcluster3 from "./pins/iconmapclustercopy3.png";
import imgmapcluster4 from "./pins/iconmapclustercopy4.png";
import user from "./pins/user1copy.png";
import farmerimg from "./pins/user.png";
import { compose, withProps, withHandlers, withStateHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
const {
  MarkerClusterer
} = require("react-google-maps/lib/components/addons/MarkerClusterer");

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCHi5ryWgN1FcZI-Hmqw3AdxJQmpopYJGk&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `90vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withStateHandlers(
    { InfoWindowobject: null },
    {
      setInfoWindow: () => value => ({ InfoWindowobject: value })
    }
  ),
  withStateHandlers(
    { isOpen: false },
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen
      })
    }
  ),
  withHandlers({
    onMarkerClustererClick: () => markerClusterer => {
      const clickedMarkers = markerClusterer.getMarkers();
    },
    onMarkerClick: props => markerss => {
      const { setInfoWindow, onToggleOpen } = props;

      axios({
        url: "http://staging.clarolabs.in:7060/farmerinfo/farmerinfo",
        method: "POST",
        data: {
          uid: markerss.uid,
          uidType: markerss.uidType
        },
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        res.data.data["latitude"] = markerss.latitude;
        res.data.data["longitude"] = markerss.longitude;
        console.log(res.data.data);
        setInfoWindow(res.data.data);
        onToggleOpen();
      })
      .catch((e)=>{
        alert(e)
      })
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={5}
    defaultCenter={{ lat: 22.845625996700075, lng: 78.9629 }}
    options={{
      styles: [
        { elementType: "geometry.fill", stylers: [{ color: "#F2F2F2" }] },
        {
          featureType: "water",
          elementType: "geometry",
          // stylers: [{ color: "#E3E3E3" }]
          stylers: [{ color: "#ACC8F2" }]
        },
        {
          featureType: "transit.line",
          elementType: "geometry",
          stylers: [{ visibility: "off" }]
        },
        {
          featureType: "road",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ visibility: "off" }]
        }
        // {
        //   featureType: "water",
        //   elementType: "labels.text.fill",
        //   stylers: [{ color: "#515c6d" }]
        // },
        // {
        //   featureType: "water",
        //   elementType: "labels.text.stroke",
        //   stylers: [{ color: "#17263c" }]
        // }
      ]
    }}
  >
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      minimumClusterSize={10}
      averageCenter
      styles={[
        {
          textColor: "white",
          url: imgmapcluster,
          height: 68,
          lineHeight: 3,
          width: 70
        },		
        // {		
        //   url: imgmapcluster1,		
        //   height: 68,		
        //   lineHeight: 3,
        //   width: 70	,	
        //   textColor:"white",		
        // },
        // {		
        //   url: imgmapcluster2,		
        //   height: 68,		
        //   lineHeight: 3,
        //   width: 70	,	
        //   textColor:"white",		
        // },
        // {		
        //   url: imgmapcluster3,		
        //   height: 68,		
        //   lineHeight: 3,
        //   width: 70	,	
        //   textColor:"white",		
        // },
        // {		
        //   url: imgmapcluster4,		
        //   height: 68,		
        //   lineHeight: 3,
        //   width: 70	,	
        //   textColor:"white",		
        // }
      ]}
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map((marker, index) => (
        <Marker
          key={index}
          icon={user}
          onClick={props.onMarkerClick.bind(props, marker)}
          position={{ lat: marker.latitude, lng: marker.longitude }}
        />
      ))}
    </MarkerClusterer>
    {props.isOpen && props.InfoWindowobject !== null && (
      <InfoWindow
        position={{
          lat: props.InfoWindowobject.latitude,
          lng: props.InfoWindowobject.longitude
        }}
        onCloseClick={props.onToggleOpen}
      >
        {props.InfoWindowobject !== null && (
          <div className="infobox clearfix" style={{ fontFamily: "Gotham" }}>
            <div className="header clearfix">
              <h3>
                {props.InfoWindowobject.name},{" "}
                <small style={{color:'#333131'}}>{props.InfoWindowobject.contactNo}</small>
              </h3>
            </div>
            <div className="body clearfix ">
              <div className="image">
                {props.InfoWindowobject.farmerImage !== null ? (
                  <img src={props.InfoWindowobject.farmerImage} width="55%" />
                ) : (
                  <img src={farmerimg} width="55%" />
                )}
              </div>
              <div className="column">
                <div className="row">
                  <div className="col-md-5">
                    <div style={{ marginBottom: "1em" }} className="row">
                      <div className="col-md-4">
                        <span style={{ fontSize: "medium" }}>
                          <b>Gender</b>
                        </span>
                      </div>
                      <div className="col-md-8">
                        <span style={{ fontSize: "medium" }}>
                          {props.InfoWindowobject.gender}
                        </span>
                      </div>
                    </div>
                    <div style={{ marginBottom: "1em" }} className="row">
                      <div className="col-md-4">
                        <span style={{ fontSize: "medium" }}>
                          <b>Village</b>
                        </span>
                      </div>
                      <div className="col-md-8">
                        <span style={{ fontSize: "medium" }}>
                          {props.InfoWindowobject.village}
                        </span>
                      </div>
                    </div>
                    <div style={{ marginBottom: "1em" }} className="row">
                      <div className="col-md-4">
                        <span style={{ fontSize: "medium" }}>
                          <b>District</b>
                        </span>
                      </div>
                      <div className="col-md-8">
                        <span style={{ fontSize: "medium" }}>
                          {props.InfoWindowobject.district}
                        </span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <span style={{ fontSize: "medium" }}>
                          <b>State</b>
                        </span>
                      </div>
                      <div className="col-md-8">
                        <span style={{ fontSize: "medium" }}>
                          {props.InfoWindowobject.state}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div style={{ marginBottom: "1em" }} className="row">
                      <div className="col-md-6">
                        <span style={{ fontSize: "medium" }}>
                          <b>Intervention type</b>
                        </span>
                      </div>
                      <div className="col-md-6">
                        <span style={{ fontSize: "medium" }}>
                          {props.InfoWindowobject.vertical}
                        </span>
                      </div>
                    </div>
                    <div style={{ marginBottom: "1em" }} className="row">
                      <div className="col-md-6">
                        <span style={{ fontSize: "medium" }}>
                          <b>Intervention size</b>
                        </span>
                      </div>
                      <div className="col-md-6">
                        <span style={{ fontSize: "medium" }}>
                          {props.InfoWindowobject.interventionSize}
                        </span>
                      </div>
                    </div>
                    <div style={{ marginBottom: "1em" }} className="row">
                      <div className="col-md-6">
                        <span style={{ fontSize: "medium" }}>
                          <b>Date of installation</b>
                        </span>
                      </div>
                      <div className="col-md-6">
                        <span style={{ fontSize: "medium" }}>
                          {props.InfoWindowobject.registrationDate}
                        </span>
                      </div>
                    </div>
                    
                    <div className="row">
                      <div className="col-md-6">
                        <span style={{ fontSize: "medium" }}>
                          <b>GPS</b>
                        </span>
                      </div>
                      <div className="col-md-6">
                        <span style={{ fontSize: "medium" }}>
                          {props.InfoWindowobject.latitude} N,{" "}
                          {props.InfoWindowobject.longitude} E
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </InfoWindow>
    )}
  </GoogleMap>
));

class DemoApp extends Component {
  componentWillMount() {
    this.setState({ markers: [], isOpen: false, InfoWindowobject: {} });
  }

  componentDidMount() {
    axios({
      url: "http://staging.clarolabs.in:7060/farmerinfo/farmercoordinates",
      method: "POST",
      data: {
        temp: "temp"
      },
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      this.setState({ markers: res.data.data.list });
    });
  }

  render() {
    console.log("state", this.state);
    return (
      <MapWithAMarkerClusterer
        markers={this.state.markers}
        isOpen={this.state.isOpen}
        InfoWindowobject={this.state.InfoWindowobject}
      />
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
            <button
              type="button"
              className="btn btn-default"
              aria-label="Left Align"
              id="drillUp"
              style={{
                display: "none",
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
            <span style={{ fontSize: "large" }}>Farmer database in India</span>
          </div>
        </nav>
      </div>
    );
  }
}

class Farmer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Header />
        <div className="mainbody">
          <Sidebar history={this.props.history} />
          <div style={{ backgroundColor: "#F2F2F2" }} className="main">
            <FarmerHeader label={this.state.label} />
            <div style={{ marginLeft: "0" }} className="row" />
            <DemoApp />
          </div>
        </div>
      </div>
    );
  }
}
export default Farmer;
