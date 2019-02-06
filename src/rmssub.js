import React, { Component } from "react";
import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import { Link } from "react-router-dom";
import Highcharts from 'highcharts/highstock'
import Swal from "sweetalert2";
import drilldown from "highcharts-drilldown";
import rmsdata from "./rmsdata.json";
import axios from "axios";
import config from "./config.js";
import RmsSidebardata from "./RmsSidebardata.js";
import nodata from './pins/nodata.png'
import fvc from './fvc.json'
const $ = require("jquery");
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

class RmsHeader extends Component {
  render() {
    return (
      <div className="container rmssidebar">
        <nav id="filter" className="navbar navbar-default">
          <div
            className="container-fluid"
            style={{ textAlign: "center", marginTop: "10px" }}
          >
            <Link to="/">
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
            </Link>
            <Link to="/rms">
              <button
                style={{
                  marginTop: "-2px",
                  marginLeft: "10px",
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
                RMS{" "}
              </button>
            </Link>
            <span style={{ fontSize: "large", color: "blue" ,"marginLeft":"-82px"}}>
              Remote Monitoring System{" "}
            </span>
          </div>
        </nav>
      </div>
    );
  }
}

class Rms extends Component {
  constructor(props) {
    super(props);
    this.state = { singleassetstat: {},open: false };
  }
  async componentDidMount() {
    
		let singleassetstatttemp = {};
    let self=this;
    if(this.props.location.state!==undefined){
      await axios({
        url: config.singleassetstat,
        method: "POST",
        data: {
          customerId: this.props.location.state.detail.customerId,
          rmsVendorId: this.props.location.state.detail.rmsVendorId
        },
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if(res.data.data!== null){
          singleassetstatttemp = res.data.data;
          this.setState({ singleassetstat: singleassetstatttemp });
          }
          else if (res.data.error !== undefined) {
            if (res.data.error.errorCode === 153) {
              window.location.href = "../login.html?redirect=maps";
            } else {
              Swal({
                type: "error",
                title: "Oops...",
                text: res.data.error.errorMsg
              });
            }
          }
        })
        .catch(e => {
          console.log(e);
        });
      await axios({
        url: config.highchartdata,
        method: "POST",
        data: {
          customerId: this.props.location.state.detail.customerId,
          rmsVendorId: this.props.location.state.detail.rmsVendorId
        },
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          let obj = {};
          // obj["data"] = res.data.data.list;
          obj["data"] = rmsdata.data.list;
          obj["name"] = "Energy";
        //   if (!Highcharts.Chart.prototype.addSeriesAsDrilldown) {
        //   drilldown(Highcharts);
        //   // Drilldown(Highcharts);
        // }
          drilldown(Highcharts);
          Highcharts.chart("energy_chart", {
            chart: {
              type: "column",
              spacingBottom: 15,
              spacingTop: 10,
              spacingLeft: 10,
              spacingRight: 10,
              backgroundColor: "#f2f2f2",
              events: {
                load: function() {
                  var fin = new Date();
                  var finDate = fin.getDate();
  
                  var finMonth = fin.getMonth();
                  var finYear = fin.getFullYear();
  
                  var ini = new Date();
                  ini.setFullYear(ini.getFullYear() - 1);
                  var iniDate = ini.getDate();
                  var iniMonth = ini.getMonth();
                  var iniYear = ini.getFullYear();
                  if (this.yAxis[0].dataMax === 0) {
                    this.yAxis[0].setExtremes(null, 1);
                  }
                  //this.yAxis.set
                  console.log(new Date(Date.UTC(iniYear, iniMonth, iniDate)))
                  console.log(new Date(Date.UTC(finYear, finMonth, finDate)))
                  this.xAxis[0].setExtremes(
                    Date.UTC(iniYear, iniMonth, iniDate),
                    Date.UTC(finYear, finMonth, finDate)
                  );
                },
  
                drilldown: function(e) {
                  console.log('drilldown')
                  var charts_this = this;
                  var inidrillDate = new Date(e.point.x);
                    
                  setTimeout(function() {
                    inidrillDate.setDate(0);
                    inidrillDate.setMonth(inidrillDate.getMonth());
                    var DateinidrillDate = inidrillDate.getDate();
                    var MonthinidrillDate = inidrillDate.getMonth();
                    var YearinidrillDate = inidrillDate.getFullYear();
                    var findrillDate = inidrillDate;
                    findrillDate.setMonth(findrillDate.getMonth() + 1);
                    findrillDate.setDate(findrillDate.getDate() - 1);
                    var DatefindrillDate = findrillDate.getDate();
                    var MonthfindrillDate = findrillDate.getMonth();
                    var YearfindrillDate = findrillDate.getFullYear();
                    console.log(Date.UTC(
                      YearinidrillDate,
                      MonthinidrillDate,
                      DateinidrillDate
                    ))
                    console.log(Date.UTC(
                      YearfindrillDate,
                      MonthfindrillDate,
                      DatefindrillDate
                    ))
                    charts_this.xAxis[0].setExtremes(
                      Date.UTC(
                        YearinidrillDate,
                        MonthinidrillDate,
                        DateinidrillDate
                      ),
                      Date.UTC(
                        YearfindrillDate,
                        MonthfindrillDate,
                        DatefindrillDate
                      )
                    );
  
                    if (charts_this.yAxis[0].dataMax === 0) {
                      charts_this.yAxis[0].setExtremes(null, 1);
                    }
                  }, 0);
                  
                }
              }
            },
            title: {
              text: '<p className="energy_gen">Energy Generated</p>'
            },
            exporting: { enabled: false },
            xAxis: {
              type: "datetime",
              labels: {
                step: 1
              },
              dateTimeLabelFormats: {
                day: "%e"
              }
            },
            yAxis: {
              title: {
                text: "kWh"
              }
            },
            credits: {
              enabled: false
            },
            plotOptions: {
              series: {
                cursor: "pointer",
                dataLabels: {
                  enabled: true,
                  format: "{point.y}"
                },
                color: "#fcd562",
                point:{
                  events:{
                    click:function(event){
                     if(this.options!=null){
                      var dayOfYear=new Date(this.x).getFullYear() +"-"+(new Date(this.x).getMonth()+1)+"-"+new Date(this.x).getDate();
                      document.getElementById('energy_chart').style.display = 'none';
                       document.getElementById('drilldownContainer').style.display = 'block';
                       document.getElementById('drillUp').style.display = 'block';
                      ['mousemove', 'touchmove', 'touchstart'].forEach(function(eventType) {
                        document.getElementById('drilldownContainer').addEventListener(
                            eventType,
                            function(e) {
                                var chart,
                                    point,
                                    i,
                                    event;
                    
                                for (i = 0; i < Highcharts.charts.length; i = i + 1) {
                                    chart = Highcharts.charts[i];
                                    // Find coordinates within the chart
                                    event = chart.pointer.normalize(e);
                                    // Get the hovered point
                                    point = chart.series[0].searchPoint(event, true);
                    
                                    if (point) {
                                        point.highlight(e);
                                    }
                                }
                            }
                        );
                    });
                    
                    /**
                     * Override the reset function, we don't need to hide the tooltips and
                     * crosshairs.
                     */
                    Highcharts.Pointer.prototype.reset = function() {
                        return undefined;
                    };
                    
                    /**
                     * Highlight a point by showing tooltip, setting hover state and draw crosshair
                     */
                    Highcharts.Point.prototype.highlight = function(event) {
                        event = this.series.chart.pointer.normalize(event);
                        this.onMouseOver(); // Show the hover marker
                        this.series.chart.tooltip.refresh(this); // Show the tooltip
                        this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
                    };
                    
                    /**
                     * Synchronize zooming through the setExtremes event handler.
                     */
                    function syncExtremes(e) {
                        var thisChart = this.chart;
                    
                        if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
                            Highcharts.each(Highcharts.charts, function(chart) {
                                if (chart !== thisChart) {
                                    if (chart.xAxis[0].setExtremes) { // It is null while updating
                                        chart.xAxis[0].setExtremes(
                                            e.min,
                                            e.max,
                                            undefined,
                                            false, {
                                                trigger: 'syncExtremes'
                                            }
                                        );
                                    }
                                }
                            });
                        }
                    }
                    document.getElementById('drilldownContainer').style.display = 'block';
                    document.getElementById('drillUp').style.display = 'block';
                    if($('.chart')){
                      $('.chart').remove();
                    }
                    // function createDrilldownChart() {
                        $.ajax({
                            url: 'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/activity.json',
                            dataType: 'text',
                            success: function(activity) {
                    
                                activity = JSON.parse(activity);
                                activity.datasets.forEach(function(dataset, i) {
                                  
                                    // Add X values
                                    dataset.data = Highcharts.map(dataset.data, function(val, j) {
                                        return [activity.xData[j], val];
                                    });
                    
                                    var chartDiv = document.createElement('div');
                                    chartDiv.className = 'chart';
                                    document.getElementById('drilldownContainer').appendChild(chartDiv);
                    
                                    Highcharts.chart(chartDiv, {
                                        chart: {
                                          spacingBottom: 15,
                                          spacingTop: 10,
                                          spacingLeft: 10,
                                          spacingRight: 10,
                                          marginRight:30,
                                          height:195,
                                          backgroundColor: "#f2f2f2",
                                        },
                                        title: {
                                            text: dataset.name,
                                            align: 'left',
                                            margin: 0,
                                            x: 30
                                        },
                                        credits: {
                                            enabled: false
                                        },
                                        legend: {
                                            enabled: false
                                        },
                                        xAxis: {
                                            crosshair: true,
                                            events: {
                                                setExtremes: syncExtremes
                                            },
                                            labels: {
                                                format: '{value} km'
                                            }
                                        },
                                        yAxis: {
                                            title: {
                                                text: null
                                            }
                                        },
                                        tooltip: {
                                            positioner: function() {
                                                return {
                                                    // right aligned
                                                    x: this.chart.chartWidth - this.label.width-50,
                                                    y: 10 // align to title
                                                };
                                            },
                                            borderWidth: 0,
                                            backgroundColor: 'none',
                                            pointFormat: '{point.y}',
                                            headerFormat: '',
                                            shadow: false,
                                            style: {
                                                fontSize: '18px'
                                            },
                                            valueDecimals: dataset.valueDecimals
                                        },
                                        series: [{
                                            data: dataset.data,
                                            name: dataset.name,
                                            type: dataset.type,
                                            color: Highcharts.getOptions().colors[i],
                                            fillOpacity: 0.3,
                                            tooltip: {
                                                valueSuffix: ' ' + dataset.unit
                                            }
                                        }]
                                    });
                                });
                            }
                        });
                    // }
                    
                    document.getElementById('drillUp').addEventListener('click', function(){
                      document.getElementById('energy_chart').style.display = "block";
                        document.getElementById('drilldownContainer').style.display = "none";
                        document.getElementById('drillUp').style.display = 'none';
                    });
                      
                      // var formatted_date = new Date(this.x).getDate() + " " + months[(new Date(this.x).getMonth())] +" "+ new Date(this.x).getFullYear();
                      // // document.getElementById('chart_date_id').innerHTML = formatted_date;		//setting modal title with current date
                      //   $('#container').bind('mousemove touchmove touchstart', function (e) {
  
                      //     var chart,
                      //     point,
                      //     i,
                      //     event;
                      //     var sync_charts = $('.chart');
                      //     for (i = 0; i < sync_charts.length; i = i + 1) {
  
                      //       var chart_1 = sync_charts[i];
                      //       var chart_2 = chart_1.getAttribute('data-highcharts-chart');
                      //       chart=Highcharts.charts[chart_2];
                      //       event = chart.pointer.normalize(e.originalEvent);
                      //       point = chart.series[0].searchPoint(event, true);
  
                      //       if (point) {
                      //         point.highlight(e);
                      //       }
                      //     }
                      //   });
                      //   Highcharts.Pointer.prototype.reset = function () {
  
                      //     return undefined;
                      //   };
                      //   Highcharts.Point.prototype.highlight = function (event) {
  
                      //     event = this.series.chart.pointer.normalize(event);
                      //     this.onMouseOver(); // Show the hover marker
                      //     this.series.chart.tooltip.refresh(this); // Show the tooltip
                      //     this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
                      //   };
                      //   function syncExtremes(e) {
  
                      //     var thisChart = this.chart;
  
                      //     if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
                      //       Highcharts.each(Highcharts.charts, function (chart) {
                      //         if (chart !== thisChart) {
                      //           if (chart.xAxis[0].setExtremes) { // It is null while updating
                      //             chart.xAxis[0].setExtremes(
                      //                 e.min,
                      //                 e.max,
                      //                 undefined,
                      //                 false,
                      //                 { trigger: 'syncExtremes' }
                      //             );
                      //           }
                      //         }
                      //       });
                      //     }
                      //   }
                      // axios({
                      //   url: config.fvcstat,
                      //   method: "POST",
                      //   data: {
                      //     "customerId":self.props.location.state.detail.customerId,"rmsVendorId":self.props.location.state.detail.rmsVendorId,
                      //     "date":dayOfYear,
                      //     "powerType":self.props.location.state.detail.powerType
                      //   },
                      //   headers: {
                      //     "Content-Type": "application/json"
                      //   }
                      // }).then((res)=>{
                      //   let activity = fvc.data;
                      //   if($('.chart')){
                      //     $('.chart').remove();
                      //   }
                      //   $.each(activity.datasets, function (i, dataset) {
                      //     console.log(1)
                      //     var chartDiv = document.createElement('div');
                      //     chartDiv.className = 'chart';
                      //     document.getElementById('container').appendChild(chartDiv);
                      //     Highcharts.chart(chartDiv,{
                      //       chart: {
                              
                      //       },
                      //       plotOptions: {
                      //         series: {
                      //           marker:{
                      //             enabled:false
                      //           }
                      //         }
                      //       },
                      //       exporting: { enabled: false },
                      //       title: {
                      //         text: dataset.name,
                      //         align: 'left',
                      //         margin: 0,
                      //         x: 30
                      //       },
                      //       credits: {
                      //         enabled: false
                      //       },
                      //       legend: {
                      //         enabled: false
                      //       },
                      //       xAxis: {
                      //         crosshair:{ width: 3},
                      //         events: {
                      //           setExtremes: syncExtremes
                      //         },
                      //         labels: {
                      //           format: '{value}'
                      //         },categories: activity.xData
                      //       },
                      //       yAxis: {
                      //         title: {
                      //           text: null
                      //         }
                      //       },
                      //       series: [{
                      //         data: dataset
                      //       }],
                      //       tooltip: {
                      //         positioner: function () {
                      //           return {
                      //             x: this.chart.chartWidth - this.label.width,
                      //             y: 10 // align to title
                      //           };
                      //         },
                      //         borderWidth: 0,
                      //         backgroundColor: 'none',
                      //         pointFormat: '{point.y}',
                      //         headerFormat: '',
                      //         shadow: false,
                      //         style: {
                      //           fontSize: '18px'
                      //         },
                      //         valueDecimals: dataset.valueDecimals
                      //       },
                      //       series: [{
                      //         data: dataset.data,
                      //         name: dataset.name,
                      //         type: dataset.type,
                      //         color: Highcharts.getOptions().colors[i],
                      //         fillOpacity: 0.3,
                      //         tooltip: {
                      //           valueSuffix: ' ' + dataset.unit
                      //         }
                      //       }]
                      //     });
                      //   });
                        
                      // })
                      }		
                    }
                  }
                }
              }
            },
            tooltip: {
              formatter: function() {
                if (this.point.options.drilldown) {
                  return (
                    "Energy generated: <b> " +
                    this.y +
                    "</b> kWh " +
                    "<br>" +
                    Highcharts.dateFormat("%b %Y", new Date(this.x))
                  );
                } else {
                  return (
                    "Energy generated: <b> " +
                    this.y +
                    "</b> kWh " +
                    "<br>" +
                    Highcharts.dateFormat("%e %b %Y", new Date(this.x))
                  );
                }
              }
            },
            series: [{'data':obj.data,'name':obj.name,"color":"#4848d3"}],
            drilldown: {
              series: obj.data
            }
          });
        })
        .catch(e => {
          console.log(e);
        })
    }
    
  }
  render() {
      return (
        <div>
          <Header />
          <div className="mainbody">
            <Sidebar history={this.props.history} />
            <div style={{ backgroundColor: "#F2F2F2" }} className="main">
              <RmsHeader />
              <div className="container">
                <div className="row">
                {
                  this.props.location.state!==undefined ?(
                      <RmsSidebardata
                        allassetstat={this.state.singleassetstat}
                        rmsubstate={this.props.location.state.detail}
                        rmscapacity={this.props.location.state.detail.capacity}
                      />
                      
                 
                  ):(
                      <RmsSidebardata
                        allassetstat={this.state.singleassetstat}
                        rmsubstate={{
                        capacity: "NA",
                        customerId: "NA",
                        customerName: "NA",
                        district: "NA",
                        doi: "NA",
                        imei: "NA",
                        powerType: "NA",
                        rmsVendorId: null,
                        serverConfig: null,
                        state: "NA",
                        vfdSno: "NA"}}
                        rmscapacity={'NA'}
                      />
                  )
                }
                 <div style={{ paddingLeft: "30px" }} className="col-xs-10">
                {
                  this.props.location.state!==undefined ?(
                  <div>
                  
                      <h4>{this.props.location.state.detail.customerName}</h4>
                      <i className="fa fa-calendar" aria-hidden="true"></i><span style={{'marginLeft':'8px'}}>{this.props.location.state.detail.doi}</span>
                      <div style={{'margin':'10px'}} id="energy_chart" />	
                      <button id="drillUp" style={{display: 'none','float':'right','marginTop':'-24px','marginRight':'30px','backgroundColor': "#f2f2f2"}}>
                      <span
                        className="glyphicon glyphicon-menu-left"
                        style={{ marginRight: "6px" }}
                        aria-hidden="true"
                      />Back</button>
                      <div id="drilldownContainer" style={{display: 'none'}}>
                      </div>	
                      
                  </div>
                  ):(
                    <div>
                    
                  
                      <h4>NA</h4>
                      <i className="fa fa-calendar" aria-hidden="true"></i><span style={{'marginLeft':'8px'}}>NA</span>
                      <img style={{width:"40%"}} className="center"src={nodata} alt="no data" />
                  </div>
                  )
                }
                
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      );
    
  }
}

export default Rms;
