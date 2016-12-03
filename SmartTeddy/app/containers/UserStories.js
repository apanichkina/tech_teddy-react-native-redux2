
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStories } from '../actions/userStories';
import StorePage from './StorePage';
import { PossiblePurposes } from '../actions/actionTypes'

class Store extends Component {

    constructor(props) {
        super(props);

    }
    componentWillMount(){
      //this.getStories();
    }
    getStories(){
        this.props.getStories();
    }
  render() {
      const { stories, isFetching } = this.props;
    return (
      <StorePage
          stories={stories}
          title={'Мои сказки'}
          isFetching={isFetching}
          />
    );
  }
}

const mapStateToProps = (state) => {
  return {
      stories: state.userStories.stories.filter(function(n){ return n != undefined }),
      isFetching: state.userStories.isFetching
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