import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Footer, FooterTab, Container, Icon, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Header, Title, Content, Button, Grid, Col } from 'native-base';
import {setErrorVisible} from '../../actions/error'
import { openDrawer, closeDrawer } from '../../actions/drawer';
import { uploadStoryToBear, deleteStoryFromBear} from '../../actions/bear';
import { playStoryOnBear, pauseStoryOnBear } from '../../actions/player';
import Player from './Player'
import styles from './styles';
import myTheme from '../../themes/base-theme';
import { popRoute, pushNewRoute } from '../../actions/route';
const cards = [
    {
        chapterID: 1,
        text: "Однажды сердитый северный Ветер и Солнце затеяли спор о том, кто из них сильнее. Долго они спорили и решили испробовать свою силу на одном путешественнике. Ветер сказал: -Я сейчас вмиг сорву с него плащ!"
    },
    {
        chapterID: 2,
        text: "И начал дуть. Он дул очень сильно и долго. Но человек только плотнее закутывался в свой плащ."
    },
    {
        chapterID: 3,
        text: "Тогда Солнце начало пригревать путника. Он сначала опустил воротник, потом развязал пояс, а потом снял плащ и понёс его на руке."
    },
    {
        chapterID: 4,
        text: "Солнце сказало Ветру: - Видишь: добром, лаской, можно добиться гораздо большего, чем насилием."
    }

];

class Profile extends Component {
    static propTypes = {
        openDrawer: React.PropTypes.func,
        closeDrawer: React.PropTypes.func
    };

    constructor(props) {
        super(props);
    }
    uploadstory(id) {
        console.log('upload'+id);
        this.props.goDownload(id);
        //this.props.buyStory(id);

    }
    deletestory(id) {
        console.log('delete'+id);
        this.props.goDelete(id);
        //this.props.buyStory(id);

    }
    nowplay(id) {
        console.log('play'+id);
        this.props.goPlay(id);
        //this.props.buyStory(id);

    }
    popRoute() {
        this.props.popRoute();
    }
    render() {

        const { isConnected } = this.props;
        return (
        <Container theme={myTheme} style={styles.container}>
            <Header>
                <Button transparent onPress={()=>this.popRoute()}>
                    <Icon name="md-arrow-back" />
                </Button>
                <Title>Солнце и ветер</Title>
            </Header>

            <Content padder>

                <Card dataArray={cards}
                      renderRow={(item) =>
                            <CardItem style={{paddingBottom: 6}}>
                                <Text>Часть №{item.chapterID}</Text>

                                <Text>{item.text}</Text>


                                <View>
                                    {isConnected ?
                                        <Player storyLooking='14_+item.chapterID' storyId={'14_'+item.chapterID}/>
                                        : null
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

const findElementById = (array, value) => {
    let result = array.filter(obj => obj.id == value);
    return !!result.length;
};

const mapStateToProps = (state) => {
    return {
        isUpload: findElementById(state.bear.bearStories, state.story.storyId),
        isConnected: !!state.bluetooth.bluetoothConnected,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        openDrawer: () => dispatch(openDrawer()),
        closeDrawer: () => dispatch(closeDrawer()),
        setErrorVisible: () => dispatch(setErrorVisible()),
        goDownload:id=>dispatch(uploadStoryToBear(id)),
        goPlay:id=>dispatch(playStoryOnBear(id)),
        goDelete:id=>dispatch(deleteStoryFromBear(id)),
        popRoute: () => dispatch(popRoute())

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);