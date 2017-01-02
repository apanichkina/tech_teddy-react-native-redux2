
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Header, Title, View, Button, Icon, Spinner, Text, Thumbnail } from 'native-base';
import { openDrawer } from '../actions/drawer';
import { popRoute } from '../actions/route';
import myTheme from '../themes/base-theme';
import StorePage from './StoryList';
import { PossiblePurposes } from '../actions/actionTypes'
import ScrollableTabView from 'react-native-scrollable-tab-view';

class Store extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
      title: React.PropTypes.string.isRequired,
      stories: React.PropTypes.array.isRequired,
      isFetching: React.PropTypes.bool.isRequired,
      getStories:React.PropTypes.func,
      isEmpty:React.PropTypes.bool
  };
  render() {
    const { openDrawer, title, stories, categories, isFetching, isInternet, isEmpty} = this.props;
    return (
      <Container theme={myTheme}>
        <Header style={{shadowOffset: {width: 0, height: 0}, elevation: 0 }} >
          <Title>{title}</Title>
            <Button transparent onPress={openDrawer}>
                <Icon name="ios-menu" />
            </Button>
        </Header>
          <View>
            {!isInternet ?
                    <View style={{padding:10, flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} >
                        <Thumbnail style={{tintColor:'#9E9E9E',marginTop:-30}} square size={130} source={require('../../img/no-wifi-signal.png')}/>
                        <Text style={{ alignSelf: 'center',color:'#9E9E9E', marginBottom:20}}>Нет подключения к интернету</Text>
                    </View>
                  : isFetching?
                  <Spinner style={{ alignSelf: 'center' }} />
                  :stories.length ?
                      <ScrollableTabView
                          tabBarBackgroundColor={myTheme.btnPrimaryBg}
                          tabBarActiveTextColor={myTheme.headerTextColor}
                          tabBarInactiveTextColor={myTheme.headerInactiveTextColor}
                          tabBarUnderlineStyle={{backgroundColor:myTheme.btnInfoBg}}
                          >
                          {categories.map(category =>
                              <StorePage
                                  key={category.id}
                                  tabLabel={category.name.toUpperCase()}
                                  filter={category.id}
                                  stories={stories}
                                  />)}
                    </ScrollableTabView>
                  : isEmpty ?
                        <View style={{padding:10, flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} >
                            <Thumbnail style={{tintColor:'#9E9E9E',marginTop:-30}} square size={130} source={require('../../img/empty_folder.png')}/>
                            <Text style={{ alignSelf: 'center',color:'#9E9E9E', marginBottom:20}}>Пока нет сказок</Text>
                        </View>
                  :<View style={{padding:10, flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} >
                    <Thumbnail style={{tintColor:'#9E9E9E',marginTop:-30}} square size={130} source={require('../../img/low-wifi-signal.png')}/>
                    <Text style={{ alignSelf: 'center',color:'#9E9E9E', marginBottom:20}}>Проблемы со связью</Text>
                    <Button style={{ alignSelf: 'center', margin:6 }} info onPress={() => this.props.getStories()}>ПОПРОБОВАТЬ СНОВА</Button>
                  </View>
            }
          </View>


      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      isInternet: state.internet.isConnected,
      categories: state.storyCategory.categories
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      openDrawer: () => dispatch(openDrawer())
  }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Store)