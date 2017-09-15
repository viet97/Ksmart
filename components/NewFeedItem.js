import {
    AppRegistry,
    Text,
    View,
    Button, ListView, StyleSheet, StatusBar,
    TouchableOpacity, ActivityIndicator,
    Dimensions,
    FlatList,
    Platform, Image
} from 'react-native';
import Search from 'react-native-search-box';
import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon1 from 'react-native-vector-icons/Ionicons'
import React from 'react';
import {shadowProps} from "../configs/shadow";
import 'moment/locale/vi';
import {colors} from "../configs/color";

const timer = require('react-native-timer')
let {width, height} = Dimensions.get('window');
export default class NewFeedItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            time: 'abcd'
        }
        this.item = this.props.data;
        console.log(this.item);
    }


    getImage(urlImage) {

        if (urlImage === undefined || urlImage.length === 0) {
            return (

                <Image
                    source={require('../images/bglogin.jpg')}
                    // indicator={ProgressBar.Pie}
                    style={{margin: 8, width: 60, height: 60, borderRadius: 30}}/>
            );
        } else {
            return (
                <Image
                    style={{margin: 8, width: 60, height: 60, borderRadius: 30}}
                    source={{uri: urlImage}}
                    // indicator={ProgressBar.Pie}
                />
            );
        }
    }

    render() {
        return (
            <View style={{
                flexDirection: 'row',
                marginTop: 1,
                ...shadowProps,
                width: Dimensions.get('window').width,
                backgroundColor: '#f7f7f7',
                paddingBottom: 8
            }} activeOpaity={1}>
                {this.getImage(this.item.anhdaidien)}
                <View style={{marginLeft: 16, justifyContent: 'center', alignItems: 'flex-start'}}>
                    <Text style={{
                        color: '#2d92dc',
                        fontSize: 20,
                        marginBottom: 4,
                        width: Dimensions.get('window').width * 0.6
                    }} numberOfLines={1}>{this.item.tennhanvien}</Text>
                    <View style={{backgroundColor: colors[this.item.loai], borderRadius: 16, height: 32, padding: 8}}>
                        <Text style={{fontSize: 16, color: 'white'}}>{this.item.tenloai}</Text>
                    </View>
                </View>
                <View style={{
                    position: 'absolute',
                    right: 10,
                    bottom: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 12
                    }}>{this.getTime(this.item.thoigian_hienthi)}</Text>
                </View>
            </View>
        )
    }

    getTime(string) {
        let arr = string.split("(");
        return `${arr[0]}
        (${arr[1]}`;
    }
}

//     render() {
//         let item = this.props.data;
//         return (
//
//             <View
//                 onLayout={(e) => {
//                     var {x, y, width, height} = e.nativeEvent.layout;
//                     this.setState({height: height})
//                     console.log(height)
//                 }}
//                 style={{margin: 4,backgroundColor:'transparent',...shadowProps}}>
//                 <Image source={require('../images/bg1.png')}
//                        style={{
//                            height: this.state.height,
//                            flexWrap: 'wrap',
//                            position: 'absolute',
//                            width: width - 8
//
//                        }}/>
//                 <Text style={{
//                     textAlign: 'right',
//                     fontSize: 12,
//                     backgroundColor: 'transparent'
//                 }}>Cập nhật lần cuối: {item.thoigian_hienthi}</Text>
//                 <View style={{flexDirection: 'row'}}>
//                     <View style={{justifyContent: 'center'}}>
//                         {this.getImage(item.anhdaidien)}
//                     </View>
//                     <View style={{flex: 4, margin: 8, justifyContent: 'center'}}>
//                         <Text
//                             style={{
//                                 fontWeight: 'bold',
//                                 fontSize: 18,
//                                 backgroundColor: 'transparent'
//                             }}>{item.tennhanvien}</Text>
//                         <Text style={{
//                             fontSize: 13,
//                             backgroundColor: 'transparent'
//                         }}>{item.tenloai}</Text>
//                     </View>
//                 </View>
//             </View>
//         )
//     }
// }