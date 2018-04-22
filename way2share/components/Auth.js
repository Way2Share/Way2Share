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
    constructor(props){
        super(props);
        const { author, wif } = this.props;
        this.state = {
            author: author,
            wif: wif
        }
    }
            
    render() {
        const { props, state } = this;
        const { dispatch } = props;
        const { author, wif } = state;
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Row>
                <TextInput
                    style={styles.TextInput}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    placeholder={'Author'}
                    onChangeText={(text)=>this.setState({
                        author: text
                    })}
                    value={author}
                />
            </Row>
            <Row>
                <TextInput
                    style={styles.TextInput}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    placeholder={'Wif'}
                    onChangeText={(text)=>this.setState({
                        wif: text
                    })}
                    value={wif}
                />
            </Row>
            <Button title={'Log In'} onPress={()=>dispatch({
                type: 'LOGIN',
                data: state
            })}/>
        </View>
    }
}


function mapStateToProps({data, dispatch}) {
		return {
          author: data.author,
          wif: data.wif,
          dispatch: dispatch
	  	}
}

var styles = StyleSheet.create({
    TextInput: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        flex: 1,
        margin: 20,
        marginTop: 5,
        marginBottom: 5,
        fontSize: 20,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        padding: 3
    }

});


export default connect(mapStateToProps)(Element);


