
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadHardcodeStoryToBear, deleteStoryFromBear} from '../../../actions/bearStory';
import DOU from './deleteOrUploadBlock'
import styles from '../styles';

class DOUContainer extends Component {

  static propTypes = {
      storyId: React.PropTypes.number
  };

    uploadStory() {
        this.props.uploadStoryToBear(this.props.storyId);

    }
    deleteStory() {
        this.props.deleteStoryFromBear(this.props.storyId);
    }

  render() {

    return (
            <DOU
                onUploadClick={()=>{this.uploadStory()}}
                onDeleteClick={()=>{this.deleteStory()}}
                />
    );
  }
}

const findElementById = (array, value) => {
    let result = array.filter(obj => obj.id == value);
    return !!result.length;
};

const mapStateToProps = (state) => {
  return {
      isUpload: findElementById(state.bear.bearStories,state.story.storyId)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      uploadStoryToBear: id => dispatch(uploadHardcodeStoryToBear(id)),
      deleteStoryFromBear: id => dispatch(deleteStoryFromBear(id))
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DOUContainer)