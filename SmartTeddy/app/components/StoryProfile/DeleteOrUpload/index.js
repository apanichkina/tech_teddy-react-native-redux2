
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadStoryToBear, deleteStoryFromBear} from '../../../actions/bearStory';
import DOU from './deleteOrUploadBlock'
import styles from '../styles';

class DOUContainer extends Component {

  static propTypes = {
      storyId: React.PropTypes.number
  };

    uploadStory() {
        console.log('upload custom')
        this.props.uploadStoryToBear(this.props.storyId);

    }
    deleteStory() {
        this.props.deleteStoryFromBear(this.props.storyId);
    }

  render() {
    const {isUpload} = this.props;
    console.log('111111111isUpload: '+isUpload);
    return (
            <DOU
                onUploadClick={()=>{this.uploadStory()}}
                onDeleteClick={()=>{this.deleteStory()}}
                isUpload={isUpload}
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
      uploadStoryToBear: id => dispatch(uploadStoryToBear(id)),
      deleteStoryFromBear: id => dispatch(deleteStoryFromBear(id))
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DOUContainer)