import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Text, List, ListItem, Button, Icon, InputGroup, Input, View, Tabs, Footer } from 'native-base';
import { TouchableHighlight, Image} from "react-native";
import { openDrawer, closeDrawer } from '../../actions/drawer';
import { popRoute } from '../../actions/route';
import styles from './styles';
import myTheme from '../../themes/base-theme';
import TabOne from './storyPage';
import TabTwo from './alarmPage';
import TabThree from './helperPage.js';
import ActionButton from 'react-native-action-button';
import StoryList from '../../containers/StoryList';
import Alarm from './alarmPage'
import { setBearStories } from '../../actions/bear';
import { heartBeat } from '../../actions/bluetooth';
class BProfile extends Component {

    static propTypes = {
        popRoute: React.PropTypes.func,
        setBearStories: React.PropTypes.func,
        heartBeat: React.PropTypes.func,
    };

    constructor(props) {
        super(props);
        setTimeout(() => {
            console.log('BProfile:setTimeout done');
            this.props.setBearStories()
        }, 300);
    }

    render() {
        const { popRoute, categories, name} = this.props;
        return (
            <Container theme={myTheme} style={styles.container}>

                <Header>
                    <Button transparent onPress={()=>popRoute()}>
                        <Icon name="ios-arrow-back" />
                    </Button>
                    <Title>{name}</Title>
                    <Button transparent onPress={()=>popRoute()}>
                        <Icon name="ios-settings" />
                    </Button>
                </Header>

                <Content>
                    <Tabs locked>
                        {categories.map(category =>
                                <StoryList
                                    key={category.id}
                                    tabLabel={category.name}
                                    filter={category.id}
                                    stories={[]}
                                    content={'BEAR'}
                                    />
                        )}

                    </Tabs>
                </Content>
            </Container>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.bear.connectedBearName,
        categories: state.storyCategory.categories
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        popRoute: () => dispatch(popRoute()),
        setBearStories: () => dispatch(setBearStories()),
        heartBeat: () => dispatch(heartBeat())
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BProfile)