
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, View, Button, Icon, Tabs } from 'native-base';

import { openDrawer } from '../actions/drawer';
import { popRoute } from '../actions/route';
import { fetchStories } from '../actions/storeStories';
import myTheme from '../themes/base-theme';
import StorePage from './StorePage';
import { PossiblePurposes } from '../actions/actionTypes'
class Store extends Component {

    componentWillMount(){
        this.getStories();
    }
    getStories(){
      this.props.getStories();
    }
  render() {
      const { stories, isFetching, getStories,isEmpty } = this.props;
    return (
      <StorePage
          stories={stories}
          title={'Магазин сказок'}
          isFetching={isFetching}
          getStories={getStories}
          isEmpty={isEmpty}
          />
    );
  }
}

const mapStateToProps = (state) => {
  return {
      stories: state.storeStories.stories.filter(function(n){ return n != undefined }),
      isFetching: state.storeStories.isFetching,
      isEmpty: state.storeStories.isEmpty
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      getStories: () => dispatch(fetchStories())
  }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Store)