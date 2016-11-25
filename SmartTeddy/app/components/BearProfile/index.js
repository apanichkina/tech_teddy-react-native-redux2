import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Text, List, ListItem, Button, Icon, InputGroup, Input, View, Tabs, Footer, Spinner } from 'native-base';
import { TouchableHighlight, Image} from "react-native";
import { openDrawer } from '../../actions/drawer';
import styles from './styles';
import myTheme from '../../themes/base-theme';
import ActionButton from 'react-native-action-button';
import StoryList from '../../containers/StoryList';

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
        //this.props.setBearStories()
        setTimeout(() => {
            console.log('BProfile:setTStories done');
            this.props.setBearStories()
        }, 300);
    }

    render() {
        const { popRoute, categories, name, isFetching, storiesBear } = this.props;
        return (
            <Container theme={myTheme} style={styles.container}>

                <Header style={{shadowOffset: {width: 0, height: 0}, elevation: 0 }}>
                    <Button transparent onPress={this.props.openDrawer}>
                        <Icon name="ios-menu" />
                    </Button>
                    <Title>{name}</Title>

                </Header>
                {isFetching ?
                    <Content>
                        <Spinner style={{ alignSelf: 'center' }} />
                    </Content>
                    :<View>
                    <Tabs locked >
                        {categories.map(category =>
                                <StoryList 
                                    key={category.id}
                                    tabLabel={category.name.toUpperCase()} 
                                    filter={category.id} 
                                    stories={storiesBear}/>
                        )}
                    </Tabs>
                </View>}

            </Container>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.bear.connectedBearName,
        categories: state.storyCategory.categories,
        isFetching: state.bear.isFetching,
        storiesBear: state.bear.bearStories
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