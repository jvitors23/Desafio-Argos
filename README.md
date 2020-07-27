# Desafio-Argos

> Código do desafio para vaga de estágio Argos. 

## Desafio escolhido

> Desafio 2: Fazer uma API para recebimento destes dados do Broker em uma API rodando em um contêiner (docker) em uma VM (virtual machine) disponibilizada pelo avaliador. Esta API deve disponibilizar estes dados um servidor WEB rodando em outro container, o qual será utilizado para acessar os dados do comando do botão e do status do LED.

## Solução proposta

> A solução para o desafio 2 está relacionada com a solução do **Desafio 1: Desenvolver um sistema de liga-desliga de um LED através de comandos advindos da Internet (IoT). A comunicação deverá ser realizada via MQTT em um broker escolhido pelo candidato e o acesso deve ser disponibilizado ao avaliador para a realização dos testes.** Basicamente o sistema IOT deve se conectar com a internet usando algum módulo (esp8266 módulo wifi por exemplo), se conectar ao broker, fazer subscribe numa fila que recebe os comandos ON/OFF do led e publicar numa outra fila o estado do led. A solução proposta para o deafio 2 usa esse conceitos. A API proposta foi feita com NodeJS, ela recebe requisições para ligar e desligar o LED e publica os comandos ON/OFF na fila de comandos que o sistema IOT fez subscribe. Essa API também recebe os dados de estado do led, uma vez que ela fez subscribe na fila que o sistema IOT publica os dados do estado do led. A API também disponibiliza os dados de estado do led e de comandos ON/OFF numa interface web. O arquivo app.js é o servidor e é acessado em localhost:2303. Para executá-lo use node app.js

## Pacotes utilizados

- Express
- MQTT
- EJS
- Nodemon

> Os pacotes podem ser adicionados com o comando: yarn add nome-do-pacote
  
## Simulação do sistema IOT

> O arquivo led.js é um simples programa que simula o comportamento do sistema IOT. Ele se conecta ao broker, faz subscribe na fila de comandos e publica o estado do led na fila de estado. A mensagem "LED LIGADO" ou "LED DESLIGADO" simulam o envio dos sinais para controlar o led. A API e o programa que simula o sistema IOT usam um broker de testes gratuito para uso: mqtt://test.mosquitto.org

## Interface

![](https://i.imgur.com/wtPVN4N.png)

![](https://i.imgur.com/KCsOrHq.png)
