'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    ScrollView,
    StyleSheet,
    RefreshControl,
    Text,
    View,
    } = ReactNative;

const styles = StyleSheet.create({
    row: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 20,
        backgroundColor: '#3a5795',
        margin: 5
    },
    text: {
        alignSelf: 'center',
        color: '#fff'
    },
    scrollview: {
        flex: 1
    }
});

class Row extends React.Component {

    render() {
        console.log(this.props.data);
        return (
        <View style={styles.row}>
            <Text style={styles.text}>Название: {this.props.data.name}</Text>
        </View>
        );
    }
}

class RefreshControlExample extends React.Component {
    static title = '<RefreshControl>';
    static description = 'Adds pull-to-refresh support to a scrollview.';
    constructor() {
        super();
        this.state = {
            isRefreshing: false

        };
    }
    render() {
        const rows = this.props.stories.map((row, ii) => {
            return <Row key={ii} data={row}/>;
        });


        return (
            <ScrollView
                style={styles.scrollview}
                refreshControl={
          <RefreshControl
            refreshing={this.props.isRefreshing}
            onRefresh={this._onRefresh}
            colors={['#FFB74D']}
            progressBackgroundColor="#fff"
          />
        }>
                {rows}
            </ScrollView>
        );
    }

    _onRefresh = () => {
        console.log('refresh list');
        this.props.onRefresh();
        //this.setState({isRefreshing: true});
        //setTimeout(() => {
        //    this.props.onRefresh();
        //    this.setState({
        //        isRefreshing: false
        //    });
        //}, 1000);
    };
}
RefreshControlExample.propTypes = {
    stories: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.number.isRequired
    }).isRequired).isRequired,
    onStoryClick: React.PropTypes.func,
    onRefresh:React.PropTypes.func,
    isRefreshing:React.PropTypes.bool
};
export default RefreshControlExample;