import React, { Component } from 'react';
import {
  Button,
  View,
  Text,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import Hr from './Hr.js';
import NewOffer from './NewOffer.js';
import Sync from './Sync.js';
import Row from './Row.js';
       
class Element extends Component {
    static navigationOptions = (nav)=>{
        return {
            title: nav.screenProps.author,
            headerRight: <Sync />
        }
    }

    renderItem({item}){
        var { dispatch, myOffers } = this.props;
        var { title, value } = item;
        return <Row>
            <Row style={{flex: 1}}>
                <Button title={title} onPress={()=>dispatch({type: 'SELECTGOODS', goods: item})}/>
                <Text style={{margin: 8}}>{String(value)}</Text>
            </Row>
            <Button title={'DELETE'} onPress={()=>dispatch({type: 'OFFERS', offers: {[title]: 0}})}/>
        </Row>
    }
            
    render() {
        const { props, state } = this;
        const { myOffers } = props;
        return <View style={{flex: 1}}>
                <NewOffer />
                <FlatList
                                style={{flex: 1}}
                                data={Object.keys(myOffers).map((key)=>{
                                    return { title: key, value: myOffers[key]};
                                })}
                                keyboardDismissMode={'on-drag'}
                                keyboardShouldPersistTaps = "always"
                                ItemSeparatorComponent={ () => <Hr/> }
                                keyExtractor={(item, index)=>String(index)}
                                renderItem={this.renderItem.bind(this)}
                                extraData={props}
                />
                </View>
    }
}


function mapStateToProps({data, dispatch}) {
        var { myOffers } = data;
		return {
          myOffers: myOffers,
          dispatch: dispatch
	  	}
}




export default connect(mapStateToProps)(Element);


