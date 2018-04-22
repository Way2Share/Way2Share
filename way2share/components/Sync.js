import React, { Component } from 'react';
import {
  Button,
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { sync } from '../db.js';

       
class Element extends Component {
    render() {
        return <Button title={"SYNC"} onPress={()=>sync(this.props)} />
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


export default connect(mapStateToProps)(Element);


