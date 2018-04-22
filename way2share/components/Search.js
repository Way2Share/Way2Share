import React, { Component } from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { update } from '../db.js';
import Hr from './Hr.js';
import Row from './Row.js';
const img = <Image style={{width: 100, height: 100, borderWidth: 1, borderColor: 'rgba(0,0,0,0.1)'}}  source={require('../img.png')}/>;

function search(partner){
    return new Promise((resolve, reject)=>{
        update(partner, (result)=>{
            resolve(result);
        });
    });
}

class SearchForm extends Component{
    state = {
        busy: false
    }

    render(){
        var { partners, busy, navigation } = this.props;

        return <Row>
                <View style={{flex: 1}}>
                    <TextInput
                        style={styles.TextInput}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        placeholder={'SEARCH'}
                        onEndEditing={(e)=>{
                            
                        }}
                        returnKeyType={'search'}
                    />
                </View>
                {busy && <View style={{alignItems: 'center'}}><ActivityIndicator /></View> || <Button title={'UPDATE'} onPress={async ()=>{
                            this.setState({busy: true});

                            var partnersArray = Object.keys(partners);

                            var items = {};

                            var res = await Promise.all( partnersArray.map((key)=>search(key)) );

                            res.forEach((obj, index)=>{
                               
                           
                                for (var key in obj){
                                    if (!items[key]){
                                        items[key] = {};
                                    }

                                    items[key][partnersArray[index]] = true;
                                }
                              
                            });


                            items = Object.keys(items).map((key)=>{
                                return {
                                    title: key,
                                    owners: items[key]
                                }
                            });

                         

                            navigation.setParams({
                                items: items
                            });
                          
                            

                            this.setState({busy: false});
                }} />}
            </Row>
    }
}

class Element extends Component {
    static navigationOptions = (nav)=>{
        var { navigation, screenProps } = nav;
        var { dispatch, partners } = screenProps;

        return {
            headerTitle:  <SearchForm partners={partners} navigation={navigation}/>
        }
    }
    

    renderItem({item}){
        
        var { title, owners } = item;

        return <Row>
            <View>
                {img}
            </View>
            <View style={{flex: 1}}>
                <Text style={[styles.Text, {fontSize: 20, fontWeight: 'bold'}]}>{String(title)}</Text>
                <Row style={{justifyContent: 'flex-start', margin: 8}}><Text>OWNERS: </Text>{Object.keys(owners).map((key, index)=><Text key={index} style={styles.Text}>{String(key)}</Text>)}</Row>
            </View>
        </Row>
    }
            
    render() {
        const { props } = this;
        const { navigation } = props;
        const { params } = navigation.state;

        if (!params){
            return null;
        }

        const { items } = navigation.state.params;

        return <FlatList
                                data={items}
                                keyboardDismissMode={'on-drag'}
                                keyboardShouldPersistTaps = "always"
                                ItemSeparatorComponent={ () => <Hr/> }
                                keyExtractor={(item, index)=>String(index)}
                                renderItem={this.renderItem.bind(this)}
                                extraData={props}
                />
    }

}


var styles = StyleSheet.create({
    Text: {
        margin: 8
    },
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
function mapStateToProps({data, dispatch}) {
		return {
          data: data,
          dispatch: dispatch
	  	}
}



export default connect(mapStateToProps)(Element);


