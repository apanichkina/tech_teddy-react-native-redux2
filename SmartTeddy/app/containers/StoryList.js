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
    filter:React.PropTypes.number
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
//TODO проверить работает ли список сказок на мишке без case
  render() {
    const { storiesBear, storiesShop, storiesUser, isInternet} = this.props;

    return (
            <StorePage
                stories={this.getFilteredStories(this.props.stories)}
                onStoryClick={this.onClick}
                isInternet={isInternet}
                />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isInternet: state.internet.isConnected,
    isRefreshing: state.storeStories.isFetching
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