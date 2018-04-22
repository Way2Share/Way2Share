import React, { Component } from 'react';
import {
  Button,
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import Row from './Row.js';
import { post, update } from '../db.js';

       
class Element extends Component {
  
            
    render() {
        const { props, state } = this;
        const { dispatch, partners, myOffers, goods, author } = props;
        const { title, value } = goods;

        return <View style={{margin: 8}}>
                <Row>
                    <TextInput
                        style={styles.TextInput}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        placeholder={'GOODS'}
                        onChangeText={(text)=>dispatch({
                            type: 'SELECTGOODS',
                            goods: { title: text }
                        })}
                        value={title}
                    />
                </Row>

                <Row>
                    <TextInput
                        style={[styles.TextInput, { textAlign: 'right', flex: 1}]}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        placeholder={'0'}
                        onChangeText={(text)=>dispatch({
                            type: 'SELECTGOODS',
                            goods: { value: Number(text) }
                        })}
                        keyboardType={'numeric'}
                        value={value && String(value) || ''}
                    />
                    <Button disabled={!title || !(value >= 0)} title={"SAVE"} onPress={()=>{
                      
                        dispatch({
                            type: 'OFFERS',
                            offers: {
                                [title]: value
                            }
                        });
                    }} />
                </Row>
                
            </View>
    }
}


function mapStateToProps({data, dispatch}) {
        var { myOffers, goods, author, wif } = data;
		return {
            author: author,
            goods: goods,
            myOffers: myOffers,
            dispatch: dispatch,
            wif: wif
	  	}
}

var styles = StyleSheet.create({
    TextInput: {
        backgroundColor: 'white',
        flex: 1,
        margin: 2,
        fontSize: 20,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        padding: 3
    }

});


export default connect(mapStateToProps)(Element);


