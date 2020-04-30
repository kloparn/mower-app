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

  class VisualizationScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        session: [
          {position: {x: 0, y: 0}}]
       };
     }

     handleCanvas = (canvas) => {

      canvas.width = Dimensions.get('window').width; //max X
      canvas.height = Dimensions.get('window').width; // max Y

      var pos = this.state.session

      var maxX = 10, maxY = 10
      for(var i = 0; i < pos.length; i++) {
        if(Math.abs(pos[i].position.x) > maxX)
          maxX = Math.abs(pos[i].position.x)
        if(Math.abs(pos[i].position.y) > maxY)
          maxY = Math.abs(pos[i].position.y)
      }

      const pixelMax = canvas.width/2-10
      const xRatio = pixelMax / maxX, yRatio = pixelMax / maxY
      const xOrigo = canvas.width/2, yOrigo = canvas.height/2

      const ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.arc(canvas.width/2, canvas.width/2, 5, 0, Math.PI * 2, false); // origo     
      
      var x, y
      for(var i = 0; i < pos.length; i++) {
        x = (xOrigo + pos[i].position.x*xRatio ) 
        y = (yOrigo + pos[i].position.y*yRatio*-1 )
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'white';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2, false);
      ctx.strokeStyle = 'green';
      ctx.stroke();

      this.setState({canvas: canvas})
    }
   
    getSession = () => {
 
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
            <Button onPress={this.getSession} title="Session"></Button>
          </View>
        </Layout>
      );
     }
};

export default VisualizationScreen;