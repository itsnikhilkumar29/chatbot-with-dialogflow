function welcome(agent) {
    agent.add('Hi, I am assistant. I can help you in various service. How can I help you today?');
    }
    
function defaultFallback(agent) {
    agent.add('Sorry! I am unable to understand this at the moment. I am still learning humans. You can pick any of the service that might help me.');
}
function getsum(agent){
    const a=agent.parameters.number;
    const b=agent.parameters.number1;
    const sum=a+b;
    console.log(a,b);
    agent.add('The sum of two nums is\n '+sum);
}
function greetings(agent){
    agent.add('Hi, This is a service bot.  Do you want to register a complaint or check you complaint status or create a new account??')
}
function complaintregister(agent){
    agent.add('Okay. Now please provide you mobile number to authenticate you.');
}

module.exports = {
     welcome: welcome, 
     defaultFallback: defaultFallback,
     getsum: getsum,
     greetings:greetings,
     complaintregister:complaintregister,
     };