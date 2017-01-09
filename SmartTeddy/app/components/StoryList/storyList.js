import React, { Component } from 'react';
import { Container, Content, Card, Text, View, Thumbnail, Button} from 'native-base';
import styles from './styles';
import Story from './storyListItem'

export default class StorePagePresentational extends Component {

  render() {
    const { stories, onStoryClick, onRefresh, goToStore } = this.props;

    return (
        <Container style={styles.container}>

          {stories.length ?
              <Content padder>
                  <Card>
                    { stories.map(story =>
                        <Story
                            key={story.id}
                            {...story}
                            illustration={{uri: 'https://storage.googleapis.com/hardteddy_images/small/'+story.id+'.jpg'}}
                            onClick={() => onStoryClick((story.id))}
                        />
                    )}
                  </Card>
              </Content>
            :
            <View style={{padding:10, flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} >
                <Thumbnail style={{tintColor:'#9E9E9E',marginTop:-30}} square size={130} source={require('../../../img/empty_folder.png')}/>
                <Text style={{  textAlign: 'center',color:'#9E9E9E', marginBottom:20}}>Пока нет сказок выбранной категории</Text>
                <Button style={{ alignSelf: 'center', margin:6 }} info onPress={goToStore}>КАТАЛОГ</Button>
            </View>
          }
            </Container>
    );
  }
}

StorePagePresentational.propTypes = {
    stories: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.number.isRequired
    }).isRequired).isRequired,
    onStoryClick: React.PropTypes.func,
    goToStore: React.PropTypes.func
};