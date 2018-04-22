import React, { Component } from 'react';
import {
  Button
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Goods from './Goods.js';
import Partners from './Partners.js';
import Auth from './Auth.js';
import MyOffers from './MyOffers.js';
import RNFS from 'react-native-fs';
import { connect } from 'react-redux';
import Search from './Search.js';

const Tab = TabNavigator({
                        Search: {
                            screen: Search
                        },
                        Partners: {
                            screen: Partners,
                        }, 
                        MyOffers: {
                            screen: MyOffers
                          
                        }
        });


const Nav =  StackNavigator({
	
	Home: {
		screen: Tab
	},
	Goods: {
		screen: Goods,
	},
}, {
	headerMode: 'screen'
});
      
async function load(dispatch){
  try{
    var result = await RNFS.readDir(RNFS.DocumentDirectoryPath);
    console.log(result);
    if (result.length > 0){

      for (var i=0; i<result.length; i++){
        var file = result[i];
        if (file.isFile() && file.name == "data.json"){
          var string = await RNFS.readFile(file.path, 'utf8');
          var obj = JSON.parse(string);
                   dispatch({type: 'LOAD', state:  obj});
                      break;
                  }
              }

          }
  } catch(e){
      console.error(e);
  }

}                           
       
class AppNavigator extends Component {
  	componentWillMount(){
      var {dispatch} = this.props;

        load(dispatch);
    }

    render() {
    	var { login } = this.props;

        return login && <Nav screenProps={ {...this.props} } /> || <Auth />
    }
}

function mapStateToProps({data, dispatch}){
	var { login, partners, author } = data;
	return {
        author: author,
		login: login,
        dispatch: dispatch,
        partners: partners
	}
   	
};



export default connect(mapStateToProps)(AppNavigator);


