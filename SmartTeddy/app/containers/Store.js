
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, View, Button, Icon, Tabs, Spinner } from 'native-base';
import { openDrawer } from '../actions/drawer';
import { popRoute } from '../actions/route';
import { fetchStories } from '../actions/storyFromServer';
import myTheme from '../themes/base-theme';
import StorePage from './StorePage';
import { PossiblePurposes } from '../actions/actionTypes'
class Store extends Component {

  render() {
      const { stories } = this.props;
    return (
      <StorePage
          stories={stories}
          title={'Магазин сказок'}
          content={'SHOP'}
          />
    );
  }
}

const mapStateToProps = (state) => {
  return {
      stories: state.storyFromServer.SHOP.stories
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Store)