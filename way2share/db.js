
import './node_modules/golos-js/scripts/index.rn.js';

golos.config.set('websocket', 'wss://ws.testnet.golos.io');
golos.config.set('chain_id', '5876894a41e6361bde2e73278f07340f2eb8b41c2facd29099de9deef6cdb679');

export function sync(props){
        var { dispatch, author, myOffers, wif } = props;

      var body = ' '; // то что хотите что бы было ввидно пользователям в голосе
                    //var author =''; // придумываете автора поста
                    var title = ' ';// придумываете хэштег
                    var date = new Date();

                    var permlink = [date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes()].join('-');// сами придумываете ссылку
                
                    var parentPermlink = 'goods';//придумать Тэг поста

               
                    update(author, (res)=>{

                        console.log(res);

                        var toSend = { ...res, ...myOffers };

                        for (var key in toSend){
                            if (!(toSend[key] > 0)){
                                delete toSend[key];
                            }
                        }


                        post({...props, toSend: toSend, wif: wif}, ()=>dispatch({
                                    type: 'SYNC_DONE',
                                    myOffers: toSend
                        }))
                    

                        

                    });
}

export function update(partner, callback){

              golos.api.getDiscussionsByCreated({
                select_authors: [partner],
                select_tags: ['goods'],
                limit: 1
              }, function(err, result) {
                //console.log(err, result);
                if (!err) {
                    console.log(result);
                    if (result instanceof Array && result.length>0){
                        const { json_metadata } = result[0];
                        const obj = JSON.parse(json_metadata);
                        callback(obj);
                    } else {
                        callback({});
                    }
                  

                  
                }
                else console.error(err);
              });
}


export function post({author, toSend, wif}, callback){
    var body = ' '; // то что хотите что бы было ввидно пользователям в голосе
                    //var author =''; // придумываете автора поста
                    var title = ' ';// придумываете хэштег
                    var date = new Date();

                    var permlink = [date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes()].join('-');// сами придумываете ссылку
                
                    var parentPermlink = 'goods';//придумать Тэг поста
                        golos.broadcast.comment(wif, '', parentPermlink, author, permlink, title, body, JSON.stringify(toSend), function(err, result) {
                            if ( ! err ) {
                                console.log(result);
                                callback();
                            } else {
                                console.log(err);
                                //console.error(err);
                            }
                        });
}



