import {
  View,
  Text,
  TouchableHighlight,
  Animated,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React, {Component} from 'react';

class CustomPanel extends Component {
  constructor(props) {
    super(props);

    this.icons = {
      //Step 2
      up: <Icon name="caret-up-outline" />,
      down: <Icon name="caret-down-outline" />,
    };

    this.state = {
      title: props.title,
      expanded: true,
      animation: new Animated.Value(0),
      minHeight: 0,
      maxHeight: 0,
      maxValueSet: false,
      minValueSet: false,
      cardHeight: 'auto',
    };
  }

  toggle() {
    //Step 1
    let initialValue = this.state.expanded
        ? this.state.maxHeight + this.state.minHeight
        : this.state.minHeight,
      finalValue = this.state.expanded
        ? this.state.minHeight
        : this.state.maxHeight + this.state.minHeight;

    this.setState(prevState => {
      expanded: !prevState.expanded; //Step 2
    });

    this.state.animation.setValue(initialValue); //Step 3 (Remove this line)
    Animated.spring(
      //Step 4
      this.state.animation,
      {
        toValue: finalValue,
        useNativeDriver: true,
      },
    ).start(); //Step 5
  }

  _setMaxHeight(event) {
    if (!this.state.maxValueSet) {
      this.setState({
        maxHeight: event.nativeEvent.layout.height,
        maxValueSet: true,
      });
    }
  }

  _setMinHeight(event) {
    if (!this.state.minValueSet) {
      this.state.animation.setValue(event.nativeEvent.layout.height);
      this.setState({
        minHeight: event.nativeEvent.layout.height,
        minValueSet: true,
      });
    }
  }

  render() {
    let icon = this.icons['down'];

    if (this.state.expanded) {
      icon = this.icons['up']; //Step 4
    }

    //Step 5
    return (
      <View style={styles.container}>
        <View
          style={styles.titleContainer}
          onLayout={this._setMinHeight.bind(this)}>
          <Text style={styles.title}>{this.state.title}</Text>
          <TouchableHighlight
            style={styles.button}
            onPress={this.toggle.bind(this)}
            underlayColor="#f1f1f1">
            {icon}
          </TouchableHighlight>
        </View>

        <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10,
    overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    padding: 10,
    color: '#2a2f43',
    fontWeight: 'bold',
  },
  button: {},
  buttonImage: {
    width: 30,
    height: 25,
  },
  body: {
    padding: 10,
    paddingTop: 0,
  },
});

export default CustomPanel;
