import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  AppRegistry,
  View,
  Text,
  ListView,
  AsyncStorage
  } from 'react-native';

  import { StackNavigator } from 'react-navigation'

  import ColorButton from './components/ColorButton.js'
  import ColorForm from './components/ColorForm.js'

  import pic from './assets/extraordinary-laptop.jpg'

export default class HelloWorld extends Component {

    constructor(){
      super()

      this.ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
      const availableColors = ['red', 'green', 'yellow']

      this.state={
        backgroundColor: 'blue',
        availableColors,
        dataSource: this.ds.cloneWithRows(availableColors)
      }
      this.changeColor = this.changeColor.bind(this)
      this.newColor = this.newColor.bind(this)
    }


    changeColor(backgroundColor){
      this.setState({
        backgroundColor: backgroundColor
      })
    }

    newColor(color){
      const availableColors= [
        ...this.state.availableColors,
        color
      ]
      this.setState({
        availableColors,
        dataSource: this.ds.cloneWithRows(availableColors)
      })
    }

  render() {
    const { backgroundColor } = this.state
    return (

      <ListView style={[styles.container, {backgroundColor: backgroundColor}]}
      dataSource={this.state.dataSource}
      renderRow={(color)=> (
              <ColorButton backgroundColor={color} onSelect={this.changeColor}/>
      )}
      renderHeader={()=> (
        <ColorForm onNewColor={this.newColor}/>
      )}
      >

      </ListView>
    );
  }
}

  const styles = StyleSheet.create({
    container:{
      flex: 1, 
      paddingTop: 5
    },
    header:{
      backgroundColor: 'lightgrey',
      padding: 10,
      fontSize: 30,
      textAlign: 'center'
    }
  })

AppRegistry.registerComponent('HelloWorld', () => HelloWorld);


        // <Text style={styles.button}
        // onPress={()=> this.changeColor('red')}
        // >Red</Text>
        // <Text style={styles.button}
        // onPress={()=> this.changeColor('green')}
        // >Green</Text>
