const MongoClient=require('mongodb').MongoClient;
var url='mongodb://localhost:27017/'
const express = require("express");
const { WebhookClient } = require("dialogflow-fulfillment");
const { welcome, defaultFallback, getsum,greetings, complaintregister } = require("./intent");
var randomstring = require("randomstring"); 
const app = express();

var username="";
async function authenticate(agent){
    console.log(agent.query);
    const client=new MongoClient(url);
    await client.connect();
    const snap=await client.db("chatbotproject").collection("userdetails").findOne({phn:agent.parameters.phonenumber});
    if (snap==null){
        agent.add('not registered');
    }else{
        username=snap.phn;
        agent.add('you are regiersed');
    }
}
async function describecomplaint(agent){
    console.log(agent.query);
    const client=new MongoClient(url);
    await client.connect();
    var tick=randomstring.generate(7);
    await client.db('chatbotproject').collection('issuedetails').insertOne({phn:username,issue:agent.query,ticket:tick,status:'registered'});
    agent.add('your complaint is registered and you trouble ticket is '+tick);
}
async function authenticatestatus(agent){
    console.log(agent.query);
    const client=new MongoClient(url);
    await client.connect();
    var result=await client.db('chatbotproject').collection('issuedetails').findOne({ticket:agent.parameters.any});
    agent.add('your complaint status is-- '+result.status);
}
function createaccount(agent){
    agent.add('Okay, i will create an account for you. please provide your name and phone num');
}
function checkstatus(agent){
    agent.add('please provide your ticket number to get status of your complaint.')
}
async function nameandpassword(agent){
    var username=agent.parameters.any;
    var phone=agent.parameters.phonenumber;
    const client=new MongoClient(url);
    await client.connect();
    await client.db('chatbotproject').collection('userdetails').insertOne({name:username,phn:phone});    
    agent.add('you are registered');
}

app.post("/dialogflow", express.json(), (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });
    let intentMap = new Map();
    // intentMap.set("takephnoo",takephnoo);
    intentMap.set("welcome",welcome);
    intentMap.set("defaultFallback",defaultFallback);
    intentMap.set("computesum",getsum);
    intentMap.set("createaccount",createaccount);
    intentMap.set("nameandpassword",nameandpassword);
    intentMap.set("greetings",greetings);
    intentMap.set("complaintregister",complaintregister);
    intentMap.set("authenticate",authenticate);
    intentMap.set("authenticatestatus",authenticatestatus);
    intentMap.set("checkstatus",checkstatus);
    intentMap.set("describecomplaint",describecomplaint);
    agent.handleRequest(intentMap);
});
app.listen(3000);