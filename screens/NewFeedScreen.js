import {
    AppRegistry,
    Text,
    View,
    Button, ListView, Image, StyleSheet, StatusBar,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import React from 'react';
import Color from '../configs/color'

var {height} = Dimensions.get('window');
export default class NewFeedScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = ({
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        })
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.titleStyle}>
                    <Icon style={styles.iconStyle} size={24} color="white" name="menu"/>
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center'}}>NewFeed</Text>
                    <View style={{backgroundColor: Color.backgroundNewFeed, width: 35, height: 35}}></View>
                </View>

                <TouchableOpacity onPress={() => this.props.click()}
                                  style={{width: 50, height: 50, position: 'absolute'}}/>
                <View style={{backgroundColor: Color.backgroundNewFeed, flex: 9}}>
                    <ListView
                        style={{backgroundColor: Color.itemListViewColor}}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) =>
                            <View style={{flexDirection: 'row', height: height / 7, flex: 1}}>
                                <View style={{justifyContent: 'center'}}>
                                    <Image source={{uri: rowData.url}}
                                           style={{margin: 8, width: 60, height: 60, borderRadius: 30}}/>
                                </View>
                                <View style={{flex: 4, margin: 8, justifyContent: 'center'}}>
                                    <Text
                                        style={{fontSize: 20, color: Color.itemNameListViewColor}}>{rowData.name}</Text>
                                    <Text style={{fontSize: 13, color: 'white'}}> {rowData.action}</Text>
                                </View>
                            </View>
                        }
                    />
                </View>
            </View>

        )
    }

    componentDidMount() {

        var arr = [
            {
                name: 'Đặng Quốc Việt',
                url: 'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-1/p160x160/1936235_1039707076102011_5958200926723814588_n.jpg?oh=95e45933baccb02bf6a965fe4ce4b2fe&oe=5A0728F5',
                action: 'Vừa Đăng Nhập 10 phút trước'
            },
            {
                name: 'Hoàng Trần Hảo',
                url: 'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-9/12369200_552344928266177_708527824307797917_n.jpg?oh=93ad512f12d70a1ed802fb8df6e03c85&oe=59CB9F2C',
                action: 'Vừa Đăng Nhập 10 phút trước'
            },
            {
                name: 'Nguyễn Đức Thắng',
                url: 'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-9/12369200_552344928266177_708527824307797917_n.jpg?oh=93ad512f12d70a1ed802fb8df6e03c85&oe=59CB9F2C',
                action: 'Vừa Đăng Nhập 10 phút trước'
            },
            {
                name: 'Trần Hán Hiếu',
                url: 'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-9/17799998_1949714765273125_6206086656656546584_n.jpg?oh=91e183590a290e6613918272f8c4ea4c&oe=59D9778D',
                action: 'Vừa Đăng Nhập 10 phút trước'
            }]
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(arr),
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