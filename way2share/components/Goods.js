import React, { Component } from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { update } from '../db.js';
import Hr from './Hr.js';
import Row from './Row.js';
       
class Element extends Component {
    static navigationOptions = (nav)=>{
        var { navigation, screenProps } = nav;
        var { partner } = navigation.state.params;
        var { dispatch } = screenProps;
        return {
            headerRight: <Button title={'UPDATE'} onPress={()=>{
                update(partner, ((result)=>{
             
                    navigation.setParams({
                        goods: result
                    });
                }) );

            }} />,
            title: partner
        }
    }
    

    renderItem({item}){
        var { title, value } = item;
        return <Row><Text style={styles.Text}>{title}</Text><Text style={styles.Text}>{String(value)}</Text></Row>
    }
            
    render() {
        const { props } = this;
        const { navigation } = props;
        var { goods } = navigation.state.params;

        return <FlatList
                                data={Object.keys(goods).map((key)=>{
                                    return { title: key, value: goods[key]};
                                })}
                                keyboardDismissMode={'on-drag'}
                                keyboardShouldPersistTaps = "always"
                                ItemSeparatorComponent={ () => <Hr/> }
                                keyExtractor={(item, index)=>String(index)}
                                renderItem={this.renderItem.bind(this)}
                                extraData={props}
                />
    }

}

const styles = StyleSheet.create({
    Text: {
        margin: 8
    }
})

function mapStateToProps({data, dispatch}) {
		return {
          data: data,
          dispatch: dispatch
	  	}
}



export default connect(mapStateToProps)(Element);


