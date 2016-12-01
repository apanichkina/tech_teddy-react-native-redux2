import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Footer, FooterTab, Container, Icon, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Header, Title, Content, Button, Grid, Col } from 'native-base';
import {setErrorVisible} from '../../actions/error'
import { openDrawer, closeDrawer } from '../../actions/drawer';
import { uploadStoryToBear, deleteStoryFromBear} from '../../actions/bear';
import { playStoryOnBear, pauseStoryOnBear } from '../../actions/player';
import styles from './styles';
import myTheme from '../../themes/base-theme';
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
    render() {
        const { bluetoothEnabled } = this.props;
        return (
        <Container theme={myTheme} style={styles.container}>
            <Header>
                <Button transparent onPress={this.props.openDrawer}>
                    <Icon name="ios-menu" />
                </Button>
                <Title>Профиль</Title>
            </Header>

            <View padder >
                <DeckSwiper
                    dataSource={cards}
                    renderItem={item =>
                        <Card style={{ elevation: 3 }}>
                            <CardItem>
                                <Text>Часть №{item.chapterID}</Text>
                            </CardItem>
                            <CardItem>
                                <Text>{item.text}</Text>
                            </CardItem>
                            <CardItem>

                                    <View style={{ flexDirection:'row',  alignItems:'center',
                                        justifyContent:'center'}}>
                                        <Button rounded style={{ margin: 6, marginLeft:0, flex:1, maxWidth:100, height:100}} onPress={this.nowplay.bind(this, "14_" + item.chapterID)} >
                                            play
                                        </Button>
                                        <Button rounded style={{ margin: 6, marginLeft:0, flex:1, maxWidth:100, height:100}} onPress={this.nowplay.bind(this, "14_" + item.chapterID + "_k")} >
                                            play corrected
                                        </Button>
                                        <Button rounded style={{ margin: 6, marginLeft:0, flex:1, maxWidth:100, height:100}} onPress={this.uploadstory.bind(this, "14_" + item.chapterID)} >
                                            upload
                                        </Button>
                                        <Button rounded style={{ margin: 6, marginLeft:0, flex:1, maxWidth:100, height:100}} onPress={this.uploadstory.bind(this, "14_" + item.chapterID + "_k")} >
                                            upload corrected
                                        </Button>
                                        <Button rounded style={{ margin: 6, marginLeft:0, flex:1, maxWidth:100, height:100}} onPress={this.deletestory.bind(this, "14_" + item.chapterID)} >
                                            delete
                                        </Button>
                                    </View>

                            </CardItem>

                        </Card>
                    }
                />
            </View>
        </Container>

        );
    }
}


const mapStateToProps = (state) => {
    return {
        bluetoothEnabled: state.bluetooth.bluetoothEnabled
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        openDrawer: () => dispatch(openDrawer()),
        closeDrawer: () => dispatch(closeDrawer()),
        setErrorVisible: () => dispatch(setErrorVisible()),
        goDownload:id=>dispatch(uploadStoryToBear(id)),
        goPlay:id=>dispatch(playStoryOnBear(id)),
        goDelete:id=>dispatch(deleteStoryFromBear(id))

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);