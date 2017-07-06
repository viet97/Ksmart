import {
    AppRegistry,
    Text,
    View,
    Button, ListView, Image, StyleSheet, StatusBar,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon1 from 'react-native-vector-icons/Ionicons'
import React from 'react';
import Color from '../configs/color'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
var {height} = Dimensions.get('window');
export default class NewFeedScreen extends React.Component {
    onSwipeRight(gestureState) {
        console.log("onSwipeRight")
        this.setState({myText: 'You swiped right!'});
        this.props.clickMenu()
    }

    constructor(props) {
        super(props)
        this.state = ({
            myText: 'I\'m ready to get swiped!',
            gestureName: 'none',
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        })
    }

    render() {
        return (
            <GestureRecognizer
                onSwipeRight={(state) => this.onSwipeRight(state)}
                style={{flex: 1}}
            >
                <View style={{flex: 1}}>
                    <View style={styles.titleStyle}>
                        <Icon1 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                        <Text style={{fontSize: 20, color: 'white', alignSelf: 'center'}}>NewFeed</Text>
                        <View style={{backgroundColor: Color.backgroundNewFeed, width: 35, height: 35}}></View>
                    </View>

                    <TouchableOpacity onPress={() => this.props.backToHome()}
                                      style={{width: 50, height: 50, position: 'absolute'}}/>
                    <View style={{backgroundColor: Color.backgroundNewFeed, flex: 9}}>
                        <ListView
                            style={{backgroundColor: Color.itemListViewColor}}
                            dataSource={this.state.dataSource}
                            renderRow={(rowData) =>
                                <View style={{flexDirection: 'row', height: height / 7, flex: 1}}>
                                    <View style={{justifyContent: 'center'}}>
                                        <Image
                                            source={{uri: 'http://jav.ksmart.vn' + rowData.anhdaidien}}
                                            style={{margin: 8, width: 60, height: 60, borderRadius: 30}}/>
                                    </View>
                                    <View style={{flex: 4, margin: 8, justifyContent: 'center'}}>
                                        <Text
                                            style={{
                                                fontSize: 20,
                                                color: Color.itemNameListViewColor
                                            }}>{rowData.tennhanvien}</Text>
                                        <Text style={{fontSize: 13, color: 'white'}}> {rowData.tenloai}</Text>
                                    </View>
                                </View>
                            }
                        />
                    </View>
                </View>
            </GestureRecognizer>

        )
    }

    componentWillMount() {
        fetch('http://jav.ksmart.vn/AppNewFeed.aspx?token=6e22b116f5111220741848ccd290e9e9bd8757498aeff45f479463cec823a1dc&idquanly=47&idct=LACHONG').then((response) => (response.json())).then((responseJson) => {
            console.log(responseJson),
                this.setState({dataSource: this.state.dataSource.cloneWithRows(responseJson.data)}), console.log(this.state.dataSource)
        })


    }
}

const styles = StyleSheet.create({
    titleStyle: {
        flex: 1,
        elevation: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: Color.backgroundNewFeed,
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