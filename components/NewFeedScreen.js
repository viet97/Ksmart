import {
    AppRegistry,
    Text,
    View,
    Button, ListView, Image, StyleSheet, StatusBar,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import React from 'react';
export default class NewFeedScreen extends React.Component{
    static navigationOptions = {
        header:null
    };
    render(){
        return(
            <View >
                <View style ={styles.titleStyle}>
                 <Text style={{fontSize:20}}>NewFeed Screen</Text>

                </View>
                <Image source={require('../images/MenuBar.png')} style={{position:'absolute',width:35,height:35}}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    titleStyle:{
        justifyContent:'center',
        flexDirection:'row',

        backgroundColor:'white',
    }
})