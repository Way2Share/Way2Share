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

       
class Element extends Component {
    state = {
        text: ''
    }
            
    render() {
        const { props, state } = this;
        const { dispatch, partners } = props;
        const { text } = state;
        return <Row>
                <View style={{flex: 1}}>
                    <TextInput
                        style={styles.TextInput}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        placeholder={'NEW PARTNER'}
                        onChangeText={(text)=>{
                     
                            this.setState({
                                text: text
                            })}
                        }
                        value={text}
                    />
                </View>
                <View>
                    <Button disabled={!text || partners[text]} title={"ADD"} onPress={()=>{
                        this.setState({
                            text: ''
                        });
                        dispatch({
                            type: 'NEWPARTNER',
                            partner: text
                        });
                    }} />
                </View>
            </Row>
    }
}


function mapStateToProps({data, dispatch}) {
        var { partners } = data;
		return {
          partners: partners,
          dispatch: dispatch
	  	}
}

var styles = StyleSheet.create({
    TextInput: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        flex: 1,
        margin: 8,
        fontSize: 20,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        padding: 3
    }

});


export default connect(mapStateToProps)(Element);


