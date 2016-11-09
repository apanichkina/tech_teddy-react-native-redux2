import React, { Component } from 'react';
import { Container, Content, Card} from 'native-base';
import { connect } from 'react-redux';
import { pushNewRoute } from '../actions/route';
import { seeStory } from '../actions/story';
import { setCategoryFilter } from '../actions/storyCategory';

import StorePage from '../components/StoryList/storyList'

class StorePageContainer extends Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  static propTypes = {
    pushNewRoute: React.PropTypes.func,
    tabLabel: React.PropTypes.string,
    stories: React.PropTypes.array,
    filter:React.PropTypes.number,
    content: React.PropTypes.string
  };
  getFilteredStories(stories) {
    let filter = this.props.filter;
    //////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    return stories.filter(t => t.category == filter)
  }

  onClick(id) {
    this.props.setCategoryFilter(this.props.tabLabel);
    this.props.onStoryClick(id);
    this.props.pushNewRoute('story-profile')
  }

  render() {
    const { storiesBear, storiesShop, storiesUser, content } = this.props;
    let stories = [];
    switch(content) {
      case 'BEAR':
        stories = storiesBear;
        break;
      case 'USER':
        stories = storiesUser;
        break;
      case 'SHOP':
        stories = storiesShop;
        break;
      default:
            break;

    }
    return (
            <StorePage
                stories={this.getFilteredStories(stories)}
                onStoryClick={this.onClick}
                />
    )
  }
}
const getStoriesByIndexes = (stories, indexes) => {
  let fullStories = [];

  let storiesCount = indexes.length;
  for (var i = 0; i < storiesCount; ++i) {
    fullStories[i] = stories[indexes[i]];
  }
  return fullStories;

};
const mapStateToProps = (state) => {
  return {
    storiesShop: state.storyFromServer.SHOP.stories,
    storiesUser: state.storyFromServer.USER.stories,
    storiesBear: getStoriesByIndexes(state.storyFromServer.USER.stories, state.bear.bearStories)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onStoryClick: id => dispatch(seeStory(id)),
    setCategoryFilter: (name) => dispatch(setCategoryFilter(name)),
    pushNewRoute: route => dispatch(pushNewRoute(route))
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StorePageContainer)