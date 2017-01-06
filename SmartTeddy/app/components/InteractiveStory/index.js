import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Container, Icon, View, Card, CardItem, Thumbnail, Text, Header, Title, Content, Button, Grid, Col, H3 } from 'native-base';
import Player from '../StoryProfile/Player/'
import styles from './styles';
import myTheme from '../../themes/base-theme';
import { popRoute } from '../../actions/route';
import { seeSubStory } from '../../actions/subStory'
class Profile extends Component {
    constructor(props) {
        super(props);
    }
    popRoute() {
        this.props.popRoute();
    }
    seeSubStory(id) {
        this.props.seeSubStory(id);
    }
    render() {
        console.log(this.props.storyId);
        const { isConnected, story, subStoryId } = this.props;
        return (
        <Container theme={myTheme} style={styles.container}>
            <Header>
                <Button transparent onPress={()=>this.popRoute()}>
                    <Icon name="md-arrow-back" />
                </Button>
                <Title>{story.name.toUpperCase()}</Title>
            </Header>

            <Content padder>

                <Card dataArray={story.story_parts}
                      renderRow={(item) =>
                            <CardItem button onPress={() => this.seeSubStory(item.id)} style={{paddingBottom: 6}}>

                                <View style={{flexDirection: 'row',  justifyContent: 'space-between' }}>
                                     <H3 style={{paddingBottom: 10}}>{item.title}</H3>
                                     {item.id == subStoryId ?
                                        <Thumbnail source={require('../../../img/bookmark_ribbon1600.png')} />
                                        : null
                                     }
                                </View>
                                <Text>{item.text}</Text>
                                <View>
                                    {isConnected &&
                                      <Player storyId={item.id}/>
                                    }
                                </View>
                            </CardItem>
                        }>
                </Card>
                </Content>
        </Container>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        story: state.userStories.stories[parseInt(state.story.storyId)],
        isConnected: !!state.bluetooth.bluetoothConnected,
        subStoryId: state.subStory.subStoryId,
        storyId: state.story.storyId
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        popRoute: () => dispatch(popRoute()),
        seeSubStory: id => dispatch(seeSubStory(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);