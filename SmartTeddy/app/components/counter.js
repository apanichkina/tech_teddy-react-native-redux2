import React from 'react';
import {View, StyleSheet} from "react-native";
import { Container, Header, Title, Content, Text, Button, Icon } from 'native-base';
import myTheme from '../themes/base-theme';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { increment } from '../actions/counterActions.js';
import { openDrawer, closeDrawer } from '../actions/drawer';
import { popRoute } from '../actions/route';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  }
});

class Counter extends React.Component {

  constructor(props) {
    super(props);
  }
    static propTypes = {
        openDrawer: React.PropTypes.func,
        closeDrawer: React.PropTypes.func,
        popRoute: React.PropTypes.func,
        increment: React.PropTypes.func
    };
    popRoute() {
        this.props.popRoute();
    }
    componentDidMount() {

    }

  render(){
    const { state, bluetoothEnabled } = this.props;
      console.log(bluetoothEnabled)
    return (
    <Container theme={myTheme} style={styles.container}>

        <Header>
            <Button transparent onPress={()=>this.popRoute()}>
                <Icon name="ios-arrow-back" />
            </Button>
            <Title>Counter</Title>
        </Header>

        <Content>
            <View  style={styles.container}>
                <Text>Counter: {this.props.data}</Text>
                <Text>{state.count}</Text>
                <Button onPress={this.props.increment}>Increment</Button>
                <Text>{bluetoothEnabled ? 'Bluetooth is enabled' : 'Bluetooth is disabled'}</Text>
            </View>
        </Content>

    </Container>

    );
  }
}

const mapStateToProps = (state) => {
    return {
        state: state.counter,
        bluetoothEnabled: state.bluetooth.bluetoothEnabled
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => dispatch(increment()),
        openDrawer: () => dispatch(openDrawer()),
        popRoute: () => dispatch(popRoute()),
        closeDrawer: () => dispatch(closeDrawer())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Counter);