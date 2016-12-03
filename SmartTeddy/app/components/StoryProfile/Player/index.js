
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playStoryOnBear, pauseStoryOnBear } from '../../../actions/player';
import {pressPlayButton} from '../../../actions/playerButtons'
import Player from './playerBlock'
import styles from '../styles';

class PlayerContainer extends Component {

  static propTypes = {
      storyId: React.PropTypes.number
  };

  playStory() {
      this.props.pressPlayButton(this.props.storyId);
      this.props.playStoryOnBear(this.props.storyId);

  }
  pauseStory() {
      this.props.pauseStoryOnBear();

  }

  render() {
    const {
        isPlaying,
        isPaused,
        playWaiting,
        playFetching,
        isFetchHere
        } = this.props;

    return (
            <Player
                onPlay={()=>{this.playStory()}}
                onPause={()=>{this.pauseStory()}}
                isPlaying={isPlaying}
                isPaused={isPaused}
                playWaiting={playWaiting}
                playFetching={playFetching}
                isFetchHere={isFetchHere}
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
      isPaused: state.player.isStoryPaused,
      playWaiting: state.playerButtons.isWaiting,
      playFetching: state.playerButtons.isFetching,
      isFetchHere: (state.story.storyId == state.playerButtons.id)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      playStoryOnBear: id => dispatch(playStoryOnBear(id)),
      pauseStoryOnBear: () => dispatch(pauseStoryOnBear()),
      pressPlayButton: (id) => dispatch(pressPlayButton(id))
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerContainer)