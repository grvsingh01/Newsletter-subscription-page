const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const request = require('request');
const https = require('https');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/signup.html');
})

app.post('/', (req,res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const eMail = req.body.email;
    const data ={
        members: [
            {
                email_address: eMail,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);

    const url = "https://us9.api.mailchimp.com/3.0/lists/80eac5c572";
    options = {
        method: 'POST',
        auth: 'grvsingh01:616e989f04aa7159334c64bebe455415-us'
    }

    const request = https.request(url, options, (response)=>{
        if(response.statusCode==200){
            res.sendFile(__dirname+'/success.html');
        }else{
            res.sendFile(__dirname+'/failure.html');
        }
        
        response.on('data', (data)=>{
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})

app.listen('3000', ()=>{
    console.log("server running on port 3000");
})

app.post('/failure', (req, res)=>{
    res.redirect('/');
})

//api key
//616e989f04aa7159334c64bebe455415-us9

//List Id
//80eac5c572