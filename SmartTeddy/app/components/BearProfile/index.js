import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Text, List, ListItem, Button, Icon, InputGroup, Input, View, Tabs, Footer, Spinner } from 'native-base';
import { TouchableHighlight, Image} from "react-native";
import { openDrawer } from '../../actions/drawer';
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
        heartBeat: React.PropTypes.func
    };
    componentWillMount(){
        //setTimeout(() => {
        //    console.log('BProfile:setTimeout done');
        //    this.props.setBearStories()
        //}, 300);
    }

    constructor(props) {
        super(props);
        setTimeout(() => {
            console.log('BProfile:setTimeout done');
            this.props.setBearStories()
        }, 300);
    }

    render() {
        const { popRoute, categories, name, isFetching } = this.props;
        return (
            <Container theme={myTheme} style={styles.container}>

                <Header>
                    <Button transparent onPress={this.props.openDrawer}>
                        <Icon name="ios-menu" />
                    </Button>
                    <Title>{name}</Title>

                </Header>

                <Content>
                    {isFetching ?
                        <Spinner style={{ alignSelf: 'center' }} />
                    :<Tabs locked>
                        {categories.map(category =>
                                <StoryList
                                    key={category.id}
                                    tabLabel={category.name.toUpperCase()}
                                    filter={category.id}
                                    stories={[]}
                                    content={'BEAR'}
                                    />
                        )}

                    </Tabs>
                    }
                </Content>
            </Container>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.bear.connectedBearName,
        categories: state.storyCategory.categories,
        isFetching: state.bear.isFetching
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        openDrawer: () => dispatch(openDrawer()),
        setBearStories: () => dispatch(setBearStories()),
        heartBeat: () => dispatch(heartBeat())
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BProfile)