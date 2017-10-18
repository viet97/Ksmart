
import React from 'react';
import {Header} from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {
    AppRegistry,
    Text,
    View,
    Button, ListView, Image, StyleSheet, StatusBar,
    TouchableOpacity, Platform
} from 'react-native';
import Color from '../configs/color'
import PropTypes from 'prop-types';
import {Icon} from 'react-native-elements'

export default class HeaderCustom extends React.Component {
    render() {
        return (
            <LinearGradient colors={['#1b60ad', '#3dc4ea']} style={styles.titleStyle}>
                {
                    this.props.leftChildren ? this.props.leftChildren :
                        <TouchableOpacity onPress={() => {
                            if (this.props.leftClick) this.props.leftClick()
                        }}
                                          style={{
                                              alignSelf: 'center',
                                              backgroundColor: 'transparent',
                                          }}>
                            <Icon
                                style={{
                                    alignSelf: 'center',
                                    backgroundColor: 'transparent',
                                    paddingTop: 4,
                                    paddingHorizontal: 8,
                                }}
                                size={35}
                                color={this.props.iconColor} name={this.props.iconName} type={this.props.iconType}
                            />
                        </TouchableOpacity>
                }
                <Animatable.Text animation="fadeInDown"
                                 style={{
                                     backgroundColor: 'transparent',
                                     fontSize: 18,
                                     alignSelf: 'center',
                                     color: 'white'
                                 }}>{this.props.title}</Animatable.Text>

                {this.props.rightChildren ? this.props.rightChildren : <View style={{marginRight: 16}}/>}
            </LinearGradient>
        )
    }
}
HeaderCustom.propTypes = {
    rightChildren: PropTypes.element,
    leftClick: PropTypes.func,
    title: PropTypes.string.isRequired,
    leftChildren: PropTypes.element,
    iconName: PropTypes.string,
    iconType: PropTypes.string,
    iconColor: PropTypes.string,
};
HeaderCustom.defaultProps = {
    iconName: "ios-arrow-back",
    iconType: "ionicon",
    iconColor: "white"
};
const styles = StyleSheet.create({
    titleStyle: {
        paddingTop: Platform.OS === 'ios' ? 16 : 0,
        paddingVertical: 16,
        elevation: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: Header.height,
        backgroundColor: 'transparent'
    },
    headerStyle: {
        elevation: 15, height: this.height / 7
    },
    itemSideMenuStyle: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 8,
        paddingBottom: 8
    }, iconStyle: {
        alignSelf: 'center',
        width: 24,
        height: 24,
        backgroundColor: "transparent",
        marginLeft: 8
    },
    textStyle: {
        fontSize: 18,
        color: 'white',
        backgroundColor: 'transparent'
    },
    titleIconsMenu: {
        textAlign: 'center',
        color: 'white'
    }
})