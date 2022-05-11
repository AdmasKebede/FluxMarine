
import React, { Component } from 'react';
import './App.css'
import axios from 'axios'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: "",
      to: "",
      waterDepth: "20",
      Distance: "",
      time: "",
      wind: "",
      openForm: false,
      haveResponse: false,
      sourcePlaceDetails: {},
      destPlaceDetails: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleSideBar = this.toggleSideBar.bind(this);
    this.convertToDays = this.convertToDays.bind(this)
    this.formateCalculatedTime = this.formateCalculatedTime.bind(this)
    this.getMiles = this.getMiles.bind(this)
    this.initPlaceApiautocomepete = this.initPlaceApiautocomepete.bind(this)
    this.autocompleteFrom = ""
    this.autocompleteTo = ""
  }

  toggleSideBar() {
    this.setState(
      prevState => {
        return {
          openForm: !prevState.openForm
        };
      },
      () => {
        if (this.state.openForm === true) {
          this.initPlaceApiautocomepete();
          this.initPlaceApiautocomepeteto()
        }
        else {
          console.log("false")
        }
      }
    );

  }

  initPlaceApiautocomepete() {
    this.autocompleteFrom = new window.google.maps.places.Autocomplete(
      document.getElementById("fromautocomplete"), {
      fields: ['place_id', "geometry", "name"]
    }
    )
    this.autocompleteFrom.addListener('place_changed', () => {
      const place = this.autocompleteFrom.getPlace()
      this.setState({ from: place.names, sourcePlaceDetails: place })
    });
  }


  initPlaceApiautocomepeteto() {
    this.autocompleteTo = new window.google.maps.places.Autocomplete(
      document.getElementById("toautocomplete"), {
      fields: ['place_id', "geometry", "name"]
    }
    )
    this.autocompleteTo.addListener('place_changed', () => {
      var place = this.autocompleteTo.getPlace();
      console.log(place);
      this.setState({ to: place.name, destPlaceDetails: place })
    });
  }

  convertToDays(milliSeconds) {
    let days = Math.floor(milliSeconds / (86400 * 1000));
    milliSeconds -= days * (86400 * 1000);
    let hours = Math.floor(milliSeconds / (60 * 60 * 1000));
    milliSeconds -= hours * (60 * 60 * 1000);
    let minutes = Math.floor(milliSeconds / (60 * 1000));
    return {
      days, hours, minutes
    }
  }
  getMiles(meters) {
    return parseFloat(meters * 0.000621371192).toFixed(2);
  }
  formateCalculatedTime(time) {
    const gettotalTime = this.convertToDays(time);
    return `${gettotalTime.days} days ${gettotalTime.hours} hrs `
  }
  handleSubmit(event) {
    event.preventDefault();
    const { sourcePlaceDetails, destPlaceDetails } = this.state;
    //const options = {method: 'GET', headers: {Accept: 'application/json'}};
    if (sourcePlaceDetails.geometry && destPlaceDetails.geometry) {
      axios.get(`https://api.searoutes.com/route/v2/sea/${sourcePlaceDetails.geometry.location.lat()},${sourcePlaceDetails.geometry.location.lng()};${destPlaceDetails.geometry.location.lat()},${destPlaceDetails.geometry.location.lng()}?avoidHRA=false&avoidSeca=false&allowIceAreas=true&vesselDraft=${+this.state.waterDepth}`, {
        headers: {
          'x-api-key': 'vLEKdqAsFcbbBUYLPS6Yb6EAxyBPaR7Bs3xssF97'
        }

      }).then((res) => {
        if (res.data.features) {
          this.setState({ Distance: res.data.features[0].properties.distance })
          this.setState({ time: res.data.features[0].properties.duration })
          this.setState({ wind: res.data.features[0].properties.speed })
          this.setState({ openForm: false })
          this.setState({ haveResponse: true })
        }
        window.updateOnMap(res.data);
      }).catch((err) => {
        console.log(err.response.data.messages[0])
        alert(err.response.data.messages[0])
      });
    }
    else {
      alert("invalid place selected")
    }
  }
  componentDidMount() {
    window.renderMap();
  }
  render() {
    return (
      <>
        <div className="page">
       
          <div className="sidebar-icon">
            {this.state.openForm === true ? (<div class="form">
              <div className="close-icon">
                <img src={require('./assets/images/cancel.png')} onClick={() => {
                  this.setState({ openForm: false })
                }} width="30px" height="30px" />
              </div>
              <h3 className="form-heading">Ready for your trip</h3>
              <form onSubmit={this.handleSubmit} >
                <div className="formControl">
                  <input type="text" placeholder="from" id="fromautocomplete" name="from" value={this.state.from} onChange={(e) => {
                    this.setState({ from: e.target.value })
                  }} />

                </div>

                <div className="formControl">
                  <input type="text" placeholder="to" name="to" id="toautocomplete" value={this.state.to}
                    onChange={(e) => {
                      this.setState({ to: e.target.value })
                    }}
                  />

                </div>
                <input type="text" placeholder="Water depth (meters)" name="waterDepth" value={this.state.waterDepth}
                  onChange={(e) => {
                    this.setState({ waterDepth: e.target.value })
                  }}
                />
                <button type="submit">Start</button>
              </form>
            </div>) : (<img src={require('../src/assets/images/abc.png')} width="40px" height="40px" onClick={this.toggleSideBar} />
              )}

          </div>
          {
            this.state.haveResponse === true ? (
              <div className="right-icon">
                <h4>Total Distance <span>{this.getMiles(this.state.Distance)} Miles</span></h4>
                <h4>Total Time <span>{this.formateCalculatedTime(this.state.time)}</span></h4>
                <h4>Wind <span>{this.state.wind} knots</span></h4>
              </div>
            ) : null
          }


          <div id="map" className="map">
          </div>

        </div>

      </>
    );
  }
}

