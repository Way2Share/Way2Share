import RNFS from 'react-native-fs';

const initialGoods = {
    title: '',
    value: 0
}

const initialState = {
    author: 'way2share1',
    wif: '5KL49WjR4CgdNuQTsNKTUbhWfwrhCkZk23REAKuuWJFV4RVXQrM',
    //author: 'way2share2',
    //wif: '5KLeejFWNzGsYyNjyLtbZ9WHEktaNw72PcKoLNqLqj17yNwKmSt',
    login: false,
    partners: {
        way2share1: true,
        way2share2: true
    },
    myOffers: {},
    goods: initialGoods,
    loading: false
}

export default function dataReducer(state = initialState, action){
    

    switch(action.type){
            case 'LOGIN':
            	state = {
                ...state,
            		login: true
            	}

            break;

            case 'SELECTGOODS':
                state = {
                    ...state,
                    goods: {
                        ...state.goods,
                        ...action.goods
                    }
                }
            break;

            case 'OFFERS':
                var { offers } = action;

                var { myOffers } = state;
                myOffers = { 
                    ...myOffers,
                    ...offers
                }

                

                state = {
                    ...state,
                    myOffers: myOffers,
                    goods: initialGoods
                }
            break;

            case 'DELPARTNER':
                var { partner } = action;
                var { partners } = state;

                if (partner){
                    
                    if (partner in partners){

                        partners = {
                            ...partners
                        }

                        delete partners[partner];


                        state = {
                            ...state,
                            partners: partners
                        }
                    }
                }
            break;

            case 'NEWPARTNER':
                var { partner } = action;

                if (partner){
                   
                    state = {
                        ...state,
                        partners: {
                            ...state.partners,
                            [partner]: true
                        }
                    }
                }
            break;

            case 'LOADING':
                state = {
                    ...state,
                    loading: action.value
                }

            break;
            
            case 'SYNC_DONE':
                state = {
                    ...state,
                    myOffers: action.myOffers
                }
            break;

            case 'LOAD':
                state = {
                    ...state,
                    partners: action.state
                };
            break;

         
    }


    switch (action.type){
        case 'OFFERS':
        case 'NEWPARTNER':
        case 'DELPARTNER':
        case 'SYNC_DONE':

         RNFS.writeFile(RNFS.DocumentDirectoryPath+'/data.json', JSON.stringify(state.partners), 'utf8');
    }

    return state;
}

