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
  Dimensions,
} from 'react-native';
import {Layout} from '../components';

class VisualizationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: [{position: {x: 0, y: 0}}],
    };
  }

  handleCanvas = (canvas) => {
    canvas.width = Dimensions.get('window').width; //max X
    canvas.height = Dimensions.get('window').width; // max Y

    var robotSize = 15;
    var session = this.state.session;

    var maxX = 1,
      maxY = 1;
    for (var i = 0; i < session.length; i++) {
      if (Math.abs(session[i].position.x) > maxX)
        maxX = Math.abs(session[i].position.x);
      if (Math.abs(session[i].position.y) > maxY)
        maxY = Math.abs(session[i].position.y);
    }

    var longSide, shortSide;
    if (maxX > maxY) {
      longSide = maxX;
      shortSide = maxY;
    } else {
      longSide = maxY;
      shortSide = maxX;
    }

    var sideRatio = shortSide / longSide;
    const pixelMax = canvas.width / 2 - 10;

    const xRatio =
      maxX == shortSide ? (pixelMax / maxX) * sideRatio : pixelMax / maxX;
    const yRatio =
      maxY == shortSide ? (pixelMax / maxY) * sideRatio : pixelMax / maxY;
    const xOrigo = canvas.width / 2;
    const yOrigo = canvas.height / 2;

    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    var x, y;
    for (var i = 0; i < session.length; i++) {
      x = xOrigo + session[i].position.x * xRatio;
      y = yOrigo + session[i].position.y * yRatio * -1;
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'white';
    ctx.lineWidth = robotSize;
    ctx.lineJoin = 'round';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI * 2, false);
    ctx.strokeStyle = 'green';
    ctx.stroke();

    this.setState({canvas: canvas});
  };

  getSession = () => {
    fetch('https://leather-batend.herokuapp.com/api/session', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        api_key: 'sdfasdfasdfasdfa',
      },
    })
      .then((res) => res.json())
      .then((session) => {
        this.setState({session: session}, () => {
          this.handleCanvas(this.state.canvas);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
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
}

export default VisualizationScreen;
