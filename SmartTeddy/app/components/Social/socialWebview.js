/**
 * Created by ihelos on 04.01.17.
 */
import React, { Component } from 'react';
import { WebView } from 'react-native';
import { socialSignUp } from '../../actions/user';
import { connect } from 'react-redux';

const queryString = require('query-string');
var URL = require('url-parse');

class SocialWebview extends Component {
    constructor(props) {
        super(props);
        this.state = {nowUrl: ""};
    }
    onNavigationStateChange (navState) {
        //console.log(navState.url);
        // var url = new URL(navState.url);
        // console.log("URL:", queryString.parse(url.query));
        // console.log(url.pathname);
        // var params = queryString.parse(url.query);
        // if (url.pathname === "/api/social/success"){
        //     console.log("ok", params.userToken);
        //     this.props.socialSignUp(true, params.userToken, params.bearToken);
        // } else if (url.pathname === "/api/social/error"){
        //     this.props.socialSignUp(false, "", "");
        // }
        this.setState({nowUrl:navState.url})
    }

    onError(navState){
        console.log("error webview");
        this.props.socialSignUp(false, "", "");
    }

    onLoadEnd(navState){
        console.log(this.state.nowUrl);
        var url = new URL(this.state.nowUrl);
        // console.log("URL:", queryString.parse(url.query));
        // console.log(url.pathname);
        var params = queryString.parse(url.query);
        if (url.pathname === "/api/social/success"){
            console.log("ok", params.userToken);
            this.props.socialSignUp(true, params.userToken, params.bearToken);
        } else if (url.pathname === "/api/social/error"){
            this.props.socialSignUp(false, "", "");
        }
    }

    render() {
        return (
            <WebView source={{uri: this.props.url}}
                     startInLoadingState={true}
                     onError={this.onError.bind(this)}
                     onLoadEnd={this.onLoadEnd.bind(this)}
                     onNavigationStateChange={this.onNavigationStateChange.bind(this)}
            />
        );
    }
}

SocialWebview.propTypes = {
    url:React.PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
    return {
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        socialSignUp: (o,t1,t2) => dispatch(socialSignUp(o,t1,t2))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(SocialWebview);