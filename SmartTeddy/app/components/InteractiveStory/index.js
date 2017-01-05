import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Container, Icon, View, Card, CardItem, Thumbnail, Text, Header, Title, Content, Button, Grid, Col, H3 } from 'native-base';
import Player from '../StoryProfile/Player/'
import styles from './styles';
import myTheme from '../../themes/base-theme';
import { popRoute } from '../../actions/route';

class Profile extends Component {
    static propTypes = {

    };

    constructor(props) {
        super(props);
        this.state = {
            lastSubStoryId: '14_2'
        }
    }

    popRoute() {
        this.props.popRoute();
    }
    render() {

        const { isConnected, story } = this.props;
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
                            <CardItem button onPress={() => this.setState({ lastSubStoryId : item.id })}style={{paddingBottom: 6}}>

                                <View style={{flexDirection: 'row',  justifyContent: 'space-between' }}>
                                     <H3 style={{paddingBottom: 10}}>{item.title}</H3>
                                     {item.id == this.state.lastSubStoryId ?
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
        isConnected: !!state.bluetooth.bluetoothConnected
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        popRoute: () => dispatch(popRoute())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);