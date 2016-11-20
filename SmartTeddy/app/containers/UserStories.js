
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStories } from '../actions/storyFromServer';
import StorePage from './StorePage';
import { PossiblePurposes } from '../actions/actionTypes'

class Store extends Component {

    constructor(props) {
        super(props);
        this.props.getStories();
    }
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
      getStories: () => dispatch(fetchStories(PossiblePurposes.USER))
  }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Store)