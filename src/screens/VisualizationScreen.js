import React, {Fragment, Component} from 'react';
import Canvas from 'react-native-canvas'; 
import {useStoreState, useStoreActions} from 'easy-peasy';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  PermissionsAndroid,
  Alert,
  Button,
  Dimensions
} from 'react-native';
import {Layout} from '../components';

  // #B2.5 The path and collision avoidance events shall be visualized on the App with data sent by the webserver.
  class VisualizationScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        session: [
          {position: {x: 0, y: 0}}]
       };
     }

     handleCanvas = (canvas) => {

      var screenDimension = Dimensions.get('window').width;
      canvas.width =  screenDimension
      canvas.height = screenDimension 

      const LINE_SENSOR = 1
      const ULTRA_SONIC_SENSOR = 2
      
      const ctx = canvas.getContext('2d');
      const session = this.state.session
      const origo = screenDimension/2

      var robotSize = 5
      var maxCoordinate = 75
      var pixelRatio
      var x, y

      //Find Max coordinate
      for(var i = 0; i < session.length; i++) {
        if(Math.abs(session[i].position.x) > maxCoordinate)
          maxCoordinate = Math.abs(session[i].position.x)
        if(Math.abs(session[i].position.y) > maxCoordinate)
          maxCoordinate = Math.abs(session[i].position.y)
      }

      //Used for scaling
      pixelRatio = (screenDimension - 50) / maxCoordinate / 2
      
      robotSize *= pixelRatio    
 
      //Draw the lines of movement
      ctx.beginPath();
      for(var i = 0; i < session.length; i++) {
        x = (origo + session[i].position.x * pixelRatio)
        y = (origo + session[i].position.y * pixelRatio* - 1)
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = robotSize;
        ctx.lineJoin = 'round';
        ctx.stroke();
      }

      //Draw avoidances
      for(var i = 0; i < session.length; i++) {
        x = (origo + session[i].position.x * pixelRatio)
        y = (origo + session[i].position.y * pixelRatio* - 1)

        //Line avoidances
        if(session[i].flag == LINE_SENSOR) {
          ctx.beginPath();
          ctx.arc(x, y, robotSize/4, 0, Math.PI * 2, false);
          ctx.strokeStyle = 'grey';
          ctx.stroke();
        } 
        //Object avoidances
        else if (session[i].flag == ULTRA_SONIC_SENSOR) {
          ctx.beginPath();
          ctx.arc(x, y, robotSize/4, 0, Math.PI * 2, false);
          ctx.strokeStyle = 'red';
          ctx.stroke();
        }     
      }

      //Draw Robot
      ctx.beginPath();
      ctx.arc(x, y, robotSize/2, 0, Math.PI * 2, false);
      ctx.strokeStyle = 'green';
      ctx.stroke();

      this.setState({canvas: canvas})
    }
   
    
    getSession = () => { //#B2.3 A REST API shall handle data communication between the App and webserver.
      fetch("https://leather-batend.herokuapp.com/api/session", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "api_key": "sdfasdfasdfasdfa"
        }
         })
    .then(res => res.json())
        .then(session => {
          this.setState({session: session}, () => {
            this.handleCanvas(this.state.canvas)
          })
        })
        .catch(err => {console.log(err)}); 
    }

     render () {
      return (
        <Layout>
          <View>
            {this.populateTest}
            <Canvas ref={this.handleCanvas} />
            <Button onPress={this.getSession} title="Get path"></Button>
          </View>
        </Layout>
      );
     }
};

export default VisualizationScreen;

