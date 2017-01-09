import React, {Component} from 'react';
import { Text, Button, View } from 'native-base';
import Modal from 'react-native-simple-modal';
import myTheme from '../themes/base-theme';

class ModalComponent extends React.Component  {

    render() {
        const {messageText, onConfurm, onСancel, isVisible } = this.props;
        return (
                <Modal
                    open={isVisible}
                    offset={0}
                    overlayBackground={'rgba(0, 0, 0, 0.75)'}
                    animationDuration={200}
                    animationTension={40}
                    modalDidOpen={() => undefined}
                    modalDidClose={() => undefined}
                    closeOnTouchOutside={false}
                    containerStyle={{
                        justifyContent: 'center'
                    }}
                    modalStyle={{
                        borderRadius: 2,
                        margin: 20,
                        padding: 10,
                        backgroundColor: '#F5F5F5'
                    }}>
                    <Text>{messageText}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Button transparent textStyle={{color:myTheme.btnPrimaryBg }} onPress={onСancel}> ОТМЕНИТЬ </Button>
                        <Button transparent  textStyle={{color:myTheme.btnPrimaryBg }}onPress={onConfurm}> ОК </Button>
                    </View>

                </Modal>
        );
    }
}

ModalComponent.propTypes = {
    messageText: React.PropTypes.string.isRequired,
    onConfurm: React.PropTypes.func.isRequired,
    onСancel: React.PropTypes.func.isRequired,
    isVisible: React.PropTypes.bool.isRequired
};
export default (ModalComponent);
