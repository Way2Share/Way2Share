import React, { Component } from 'react';
import {
  Button,
  View,
  Text,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import Hr from './Hr.js';
import NewPartner from './NewPartner.js';
import Row from './Row.js';
       
class Element extends Component {
    static navigationOptions = (nav)=>{
        return {
            headerTitle: <NewPartner />
        }
    }

    renderItem({item}){
        var { dispatch, navigation } = this.props;
        return <Row>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
                <Button title={item} onPress={()=>navigation.navigate('Goods', { partner: item, goods:{}  })}/>
            </View>
            <Button title={'DELETE'} onPress={()=>dispatch({
                type: 'DELPARTNER',
                partner: item
            })}/>
        </Row>
    }
            
    render() {
        const { props, state } = this;
        const { partners } = props;
        return <FlatList
                                data={partners}
                                keyboardDismissMode={'on-drag'}
                                keyboardShouldPersistTaps = "always"
                                ItemSeparatorComponent={ () => <Hr/> }
                                keyExtractor={(item, index)=>String(index)}
                                renderItem={this.renderItem.bind(this)}
                                extraData={props}
                />
    }
}


function mapStateToProps({data, dispatch}) {
        var { partners } = data;
		return {
          partners: Object.keys(partners),
          dispatch: dispatch
	  	}
}



export default connect(mapStateToProps)(Element);


