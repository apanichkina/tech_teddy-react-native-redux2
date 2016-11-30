
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { Container, Header, Title, Content, Button, Icon, Card, CardItem, Text, Thumbnail, View } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { openDrawer } from '../../actions/drawer';
import { popRoute, pushNewRoute } from '../../actions/route';
import { buyStory } from '../../actions/store';
import { uploadStoryToBear, deleteStoryFromBear} from '../../actions/bearStory';
import { playStoryOnBear, pauseStoryOnBear } from '../../actions/player';
import { fetchBuyStory } from '../../actions/store';
import StoryCard from './storyCard'
import styles from './styles';
import myTheme from '../../themes/base-theme';
var Slider = require('react-native-slider');

const logo_fun = 'ios-happy-outline';
const logo_edu = 'ios-school-outline';
const logo_night = 'ios-moon-outline';
const logo_helper = 'ios-ionitron-outline';
const logo_default = 'ios-book-outline';


class SProfile extends Component {

  static propTypes = {
    popRoute: React.PropTypes.func,
      pushNewRoute: React.PropTypes.func,
    openDrawer: React.PropTypes.func
  };

  popRoute() {
    this.props.popRoute();
  }
  connectBear() {
      this.props.pushNewRoute('bears')
  }
  buyStory(id) {
    this.props.buyStory(id);

  }
  playStory(id) {
        console.log('play'+id);
        this.props.playStoryOnBear(id);

  }
    pauseStory() {
       // console.log('pause'+id);
        this.props.pauseStoryOnBear();

    }

  uploadStory(id) {
      console.log('upload'+id);
      this.props.uploadStoryToBear(id);
      //this.props.buyStory(id);

  }
  deleteStory(id) {
      console.log('delete'+id);
      this.props.deleteStoryFromBear(id);
     // this.props.buyStory(id);

  }

  render() {
    const { story, isBought, category, isUpload, isConnected, isPlaying, isPaused} = this.props;
      let logo = '';
      switch(category.toLowerCase()) {
          case "сказки":
              logo = logo_fun;
              break;
          case "колыбельные":
              logo = logo_night;
              break;
          case "помощник":
              logo = logo_helper;
              break;
          default:
              logo = logo_default;
              break;
      }
    return (
      <Container theme={myTheme} style={styles.container}>
        <Header>
          <Title>Сказка</Title>

          <Button transparent onPress={()=>this.popRoute()}>
            <Icon name="md-arrow-back" />
          </Button>
        </Header>

        <Content padder>
            <StoryCard
                {...story}
                onBuyClick={()=>{this.buyStory(story.id)}}
                onUploadClick={()=>{this.uploadStory(story.id)}}
                onDeleteClick={()=>{this.deleteStory(story.id)}}
                onConnectBear={()=>{this.connectBear()}}
                onPlay={()=>{this.playStory(story.id)}}
                onPause={()=>{this.pauseStory()}}
                isPlaying={isPlaying}
                isUpload={isUpload}
                isConnected={isConnected}
                isBought={isBought}
                logo={logo}
                category={category}
                illustration={{uri: 'https://storage.googleapis.com/hardteddy_images/large/'+story.id+'.jpg'}}
                isPaused={isPaused}
                />

        </Content>
      </Container>
    );
  }
}


const findElementById = (array, value) => {
    let result = array.filter(obj => obj.id == value);
    return !!result.length;
};
const checkPlaying = (storyId, playingStoryid) => {
    return (storyId === playingStoryid);
};
const getStoryFromResource = (storeStories, userStories, id) => {
    if (storeStories.length) return storeStories[id];
    else return userStories[id];
};

const mapStateToProps = (state) => {
  return {
      story: getStoryFromResource(state.storeStories.stories, state.userStories.stories, state.story.storyId),
      isBought: !!state.userStories.stories[state.story.storyId],
      isUpload: findElementById(state.bear.bearStories,state.story.storyId),
      category: state.storyCategory.categoryFilter,
      isConnected: !!state.bluetooth.bluetoothConnected,
      isPlaying: checkPlaying(state.story.storyId, state.player.storyId),
      isPaused: state.player.isStoryPaused
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      buyStory: id => dispatch(fetchBuyStory(id)),
      playStoryOnBear: id => dispatch(playStoryOnBear(id)),
      pauseStoryOnBear: () => dispatch(pauseStoryOnBear()),
      uploadStoryToBear: id => dispatch(uploadStoryToBear(id)),
      deleteStoryFromBear: id => dispatch(deleteStoryFromBear(id)),
      openDrawer: () => dispatch(openDrawer()),
      popRoute: () => dispatch(popRoute()),
      pushNewRoute: route => dispatch(pushNewRoute(route))
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SProfile)