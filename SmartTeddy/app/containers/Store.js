
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

    componentWillMount(){
        this.getStories();
    }
    getStories(){
        this.props.getStories();
    }
  render() {
      const { stories, isFetching } = this.props;
    return (
      <StorePage
          stories={stories}
          title={'Магазин сказок'}
          content={'SHOP'}
          isFetching={isFetching}
          />
    );
  }
}

const mapStateToProps = (state) => {
  return {
      stories: state.storyFromServer.SHOP.stories,
      isFetching: state.storyFromServer.SHOP.isFetching
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      getStories: () => dispatch(fetchStories(PossiblePurposes.SHOP))
  }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Store)