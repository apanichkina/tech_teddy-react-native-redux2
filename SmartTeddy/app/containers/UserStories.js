
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, View, Button, Icon, Tabs } from 'native-base';
import { openDrawer } from '../actions/drawer';
import { popRoute } from '../actions/route';
import { fetchStories } from '../actions/storyFromServer';
import myTheme from '../themes/base-theme';
import StorePage from './StorePage';
import { PossiblePurposes } from '../actions/actionTypes'
class Store extends Component {

  render() {
      const { stories, isFetching } = this.props;
    return (
      <StorePage
          stories={stories}
          title={'Мои сказки'}
          content={'USER'}
          isFetching={false}
          />
    );
  }
}

const mapStateToProps = (state) => {
  return {
      stories: state.storyFromServer.USER.stories,
      isFetching: state.storyFromServer.USER.isFetching
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