const mqtt = require('mqtt');

// Simula o sistema IOT 

console.log('Simula sistema IOT');

const connectionOptions={
    clientId:"esp8266",
    //username:"",
    //password:"",
    clean:true};

// Fila que o sistema IOT vai receber os comandos de ativação do led ON/OFF
const filaComandoLed = 'comandoLed'; 

// Fila que o sistema IOT vai publicar o estado atual do led
const filaEstadoLed = 'estadoLed'; 

// Faz a conexão com o broker
// Broker gratuito usado para testes
const client = mqtt.connect("mqtt://test.mosquitto.org", connectionOptions);

client.on("connect", function(){	    
    if(client.connected){
        console.log(connectionOptions.clientId + ' connected to the broker...');
    }else{
        console.log('Erro na conexão...');
    }
});

// Faz subscribe na fila dos comandos do led
client.subscribe(filaComandoLed);

// Recebe a mensagem
client.on('message', function (topic, message) {
    // message 
    if(message.toString() == 'ON'){        
        console.log('LED LIGADO');
        client.publish(filaEstadoLed, 'ON');        
    }else{
        console.log('LED DESLIGADO');
        client.publish(filaEstadoLed, 'OFF');        
    }    
});