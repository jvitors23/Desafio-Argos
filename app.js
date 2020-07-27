const mqtt    = require('mqtt'), 
      express = require('express'); 
      
/*
    Repositório com explicação do projeto: 
   
    https://github.com/JvitorS23/Desafio-Argos

    * O commit será feito pouco antes do meio dia de 27/07 para 
    evitar que outros candidatos vejam a solução proposta para o desafio.

*/

app = express();
app.set('view engine', 'ejs');

const connectionOptions={
    clientId:"jose",
    //username:"",
    //password:"",
    clean:true
};

var estadoAtualLED = false;

// Fila que o sistema IOT vai receber os comandos de ativação do led ON/OFF
const filaComandoLed = 'comandoLed'; 

// Fila que o sistema IOT vai publicar o estado atual do led
const filaEstadoLed = 'estadoLed'; 

// Broker gratuito usado para testes
const client = mqtt.connect("mqtt://test.mosquitto.org", connectionOptions);

client.on("connect", function(){	    
    if(client.connected){
        console.log('Connected to the broker...');
        // Faz o subscribe na fila onde o sistema IOT publica o estado do led
        client.subscribe(filaEstadoLed);
    }else{
        console.log('Erro na conexão...');
    }
});

client.on('message', function (topic, message) {
    // message 
    console.log(message.toString());
    if(message.toString() == 'ON'){
        estadoAtualLED = true;   
    }else{
        estadoAtualLED = false;      
    }    
});

// ROTAS 

app.get('/', (req, res) => {
    res.render('home', {estado: estadoAtualLED});    
});

app.post('/desligar', async (req, res) => {    
    await client.publish(filaComandoLed, 'OFF');
    estadoAtualLED = false;
    res.redirect('/');        
});

app.post('/ligar', async (req, res) => {    
    await client.publish(filaComandoLed, 'ON');
    estadoAtualLED = true;
    res.redirect('/');       
});

app.listen('2303', () => {
    console.log('Express server running');
});
