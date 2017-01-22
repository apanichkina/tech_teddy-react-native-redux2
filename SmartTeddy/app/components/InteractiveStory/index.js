import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Container, Icon, View, Card, CardItem, Thumbnail, Text, Header, Title, Content, Button, Grid, Col, H3, H1 } from 'native-base';
import Player from '../StoryProfile/Player/'
import styles from './styles';
import myTheme from '../../themes/base-theme';
import { popRoute } from '../../actions/route';
import { seeSubStory } from '../../actions/subStory'
const default_colors = ['#546E7A','#EF6C00','#5E35B1','#6D4C41','#D81B60','#3949AB','#D81B60','#F44336','#880E4F','#4A148C','#673AB7','#3F51B5','#1976D2','#01579B', '#1B5E20','#827717','#3E2723','#263238'];

class Profile extends Component {
    constructor(props) {
        super(props);
        this.colors = {}
    }
    componentWillMount(){
        if (!this.props.subStoryId) this.props.seeSubStory(this.props.story.story_parts[0].id);
        this.props.story.roles.map((item,key)=> this.colors[item] = default_colors[key]);
    }
    popRoute() {
        this.props.popRoute();
    }
    seeSubStory(id) {
        this.props.seeSubStory(id);
    }
    static firstLetterUp(s) {
        return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();
    }

    render() {
        const { isConnected, story, subStoryId } = this.props;
        return (
        <Container theme={myTheme} style={styles.container}>
            <Header>
                <Button transparent onPress={()=>this.popRoute()}>
                    <Icon name="md-arrow-back" />
                </Button>
                <Title>{Profile.firstLetterUp(story.name)}</Title>
            </Header>

            <Content padder>
                <Card>
                    { story.story_parts.map((item,key) =>
                            <CardItem  key={key} button onPress={() => this.seeSubStory(item.id)} style={{paddingBottom: 6}}>
                                <View style={{flexDirection: 'row',  justifyContent: 'space-between' }}>
                                    <View style={{paddingBottom: 10}}>
                                    <H3>{item.title}</H3>
                                        <Text style={{color:this.colors[item.role]}}>{item.role}</Text>
                                        </View>
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
                    )}

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
        subStoryId: state.subStory.subStoryId[state.story.storyId],
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