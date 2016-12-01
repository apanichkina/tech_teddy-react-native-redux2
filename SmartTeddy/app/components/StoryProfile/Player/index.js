
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playStoryOnBear, pauseStoryOnBear } from '../../../actions/player';
import Player from './playerBlock'
import styles from '../styles';

class PlayerContainer extends Component {

  static propTypes = {
      storyId: React.PropTypes.number
  };

  playStory() {
      console.log('Play custom')
      this.props.playStoryOnBear(this.props.storyId);

  }
  pauseStory() {
      this.props.pauseStoryOnBear();

  }

  render() {
    const {isPlaying, isPaused} = this.props;

    return (
            <Player
                onPlay={()=>{this.playStory()}}
                onPause={()=>{this.pauseStory()}}
                isPlaying={isPlaying}
                isPaused={isPaused}
                />
    );
  }
}

const checkPlaying = (storyId, playingStoryid) => {
    return (storyId === playingStoryid);
};

const mapStateToProps = (state) => {
  return {
      isPlaying: checkPlaying(state.story.storyId, state.player.storyId),
      isPaused: state.player.isStoryPaused
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      playStoryOnBear: id => dispatch(playStoryOnBear(id)),
      pauseStoryOnBear: () => dispatch(pauseStoryOnBear())
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerContainer)