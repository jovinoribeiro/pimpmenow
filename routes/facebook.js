var express = require('express');
var router = express.Router();



/*router.get('/', function(req, res, next) {
  console.log('starting facebook page');   
  res.send('hello facebook page');
});*/

//var https=require('https'); 

/*var options = {
    host: 'graph.facebook.com',
    path: '/oauth/access_token?client_id=1233069123443297&client_secret=bc26345238acf7303ae7a2b575a3e87f&grant_type=client_credentials',
    method: 'GET'
}*/

/*var data = '';

var req = https.request(options, function(res) {
  
    res.on('data', function(chunk) {
        data += chunk;
 
    });


    res.on('end', function() {
       // console.log('Here is my result: ' + data );
        
    });

});*/

//console.log('data = ' + data);
function printline() {
    console.log('-------------------------------');    
}

printline();


/*req.on('error', function(e) {
    console.log('Problem with request 1: ' + e.message);
});

req.on('success', function(e) {
    console.log('success');
});*/

//req.write('data');
 

var graph = require('fbgraph'); 
graph.setVersion("2.8"); 

var conf = {
    client_id: '1233069123443297',
    client_secret: 'bc26345238acf7303ae7a2b575a3e87f',
    redirect_uri: 'https://pimpmenow.herokuapp.com/'
};

graph.extendAccessToken({
    "access_token":  'EAARheEcWGmEBAOuEIwkrPW5fJKchyWzZCy6IQRDlFDUkc9jZC0VWNMpDoZCxnEME8YOaF84TRuHfthfrq3WSba9WIRZCJIlCVnSBdZCwqRsGPxWnOf7ZAaObrvUxvVhfRE0pgLl9W1J1JS6Tt8Ugh42u5LWHYcH1FWxMeZC6gwT5QZDZD'
       , "client_id":      conf.client_id
      , "client_secret":  conf.client_secret
    }, function (err, facebookRes) {
       //console.log('result of extending access token:');
       //console.log(facebookRes);
    }); 

graph.setAccessToken('EAARheEcWGmEBAOuEIwkrPW5fJKchyWzZCy6IQRDlFDUkc9jZC0VWNMpDoZCxnEME8YOaF84TRuHfthfrq3WSba9WIRZCJIlCVnSBdZCwqRsGPxWnOf7ZAaObrvUxvVhfRE0pgLl9W1J1JS6Tt8Ugh42u5LWHYcH1FWxMeZC6gwT5QZDZD');

router.get('/', function(req, res, next) {
  
    console.log('starting facebook page');   

    var options = {
        timeout:  3000
      , pool:     { maxSockets:  Infinity }
      , headers:  { connection:  "keep-alive" }
    };  
      
        graph 
      .setOptions(options)
      .get("/me?fields=email, name", function(err, result) {
        console.log(result); // { id: '4', name: 'Mark Zuckerberg'... }
         res.send('Hello, ' + result.name + '. I will email you at ' + 
            result.email);
      });

     

});

/*var options = {
    timeout:  3000
  , pool:     { maxSockets:  Infinity }
  , headers:  { connection:  "keep-alive" }
};  
  
graph 
  .setOptions(options)
  .get("/me?fields=email, name", function(err, res) {
    console.log(res); // { id: '4', name: 'Mark Zuckerberg'... }
  });*/

/*graph 
  .setOptions(options)
  .get("/me?fields=email,name,picture", function(err, res) {
    console.log(res); // { id: '4', name: 'Mark Zuckerberg'... }
  });*/
 
printline();        
 
//this works 
/*var wallPost = {
  message: "I'm gonna come at you like a spider monkey, chip!"
};

graph.post("/feed", wallPost, function(err, res) {
  // returns the post id
  console.log(res); // { id: xxxxx}
});*/

/*graph.del('10211940463492385_10212002173995109', function(err, res) {
    console.log(res);
}); 
*/
/*var query = "SELECT name FROM user WHERE uid = me()";

graph.fql(query, function(err, res) {
  console.log(res); // { data: [ { name: 'Ricky Bobby' } ] }
});
*/


 

/*
good version
*/

/*facebook_client.authorize({
    "client_id": facebook_config.client_id,
    "redirect_uri": facebook_config.redirect_uri,
    "client_secret": facebook_config.client_secret,
    "code": 'AQDBR0Xc4pJ0wKgwhwRz_IYiPDgP43Y2r0IbsSXaULIO0Ug2q2wCpHzTKHLz0V_35onPONMikm6N60JMPe-sJErrtMAyB77uBY-vJsjxUSvowvuDxr30lZN6B58W9lXyrzdnjJ05QHXZ5rGHeDtYPtIGuh1oQuA7jAylds7zHn6Jod5DMqZHnFCEL5E6hvqvCwQq_L_Oo3MSBhuN1UglDiq0OLtHEn9php4IL9LZOHu6V9Z_xL1GhH3xKSKSE8tCDlXPcJxladQ1oS5yFDzsxqORBCnpHEYt3PtQIXcqJ3lUsx6L-OikMIzvy-TQGzJLIMBP5Nb4QeQ2iMg-ZafGZv35t4Ytm7S73ZHk4QZRejEPkw#_=_'
}, function (err, facebookRes) {
    if(err && false) {
        console.log(err);
    }
    else{
        console.log('token : ' + facebookRes.access_token);
        if(true || facebookRes.access_token) {
            facebook_client.setAccessToken('EAARheEcWGmEBAJSZAnT7RAuXEBeChKyznrgmT6143IXeLsElFsNcXw1vJikICmpShZCoKZCHQWsmImS2q3FFyZCwXxqbcJSJbm7DX944asZA5n0BLXZA2kGuwB5rAl2XAr2pih03DlNtqy7S6t5NC4Waw9qx6Sm7MaQn6bkPs16gZDZD');
            console.log('ac token ' + facebook_client.getAccessToken());
            console.log('ok ok ');
            var searchOptions = {
                q: "Brazil",
                type: "post",
                limit: 20
            };

            facebook_client
                //.setOptions(searchOptions)
                .get("/me?fields=email,name", function(err, res) {
                    console.log(res);
                });

            facebook_client.search(searchOptions, function(err, res) {

               console.log(res); 
            });*/

           /* facebook_client.search(searchOptions,function(err, res) {
                console.log('searching');
                if(err) console.log(err);
                else console.log('good ' + res);
            });*/
       /* } 
    } 
});*/


module.exports = router;

