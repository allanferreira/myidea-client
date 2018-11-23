# myIdea Client
> Esse repositório faz parte do projeto myIdea.
> Esse aplicação é a versão web do projeto. 
 
### Tecnologias
Requer [Node] versão 8.10.0 ou superior
* [React]   - Biblioteca para montar interfaces
* [Webpack] - Bundler para EcmaScript
* [Axios]   - Promises baseado em HTTP Client

### Instalação
 myIdea requer [Npm] para instalação das dependências

```sh
$ git clone https://github.com/allanferreira/myidea-client.git
$ cd myidea-client
$ npm i
```

### Servidor
Rode para abrir um servidor
```sh
$ npm start
```
### APIs
Esse projeto consome as seguintes APIs:
* [myIdea API] - Backend do myIdea
* [IBM Watson] - Inteligência Artificial

Em /src/services/api.js você encontra o endereço base da API de Backend, caso queira rodar a
API localmente basta rodar o projeto [myIdea API] e editar o valor de baseURL para:
```sh
...
baseURL: 'http://127.0.0.1:8000/api/',
...
```
Ou deixe o valor de IP da máquina em Cloud da Digital Ocean
```sh
...
baseURL: 'http://142.93.158.20/api/',
...
```
[Digital Ocean]: <https://www.digitalocean.com/>
[myIdea API]: <https://github.com/allanferreira/myidea-api>
[Node]: <https://nodejs.org/en/>
[Npm]: <https://www.npmjs.com/>
[Axios]: <https://github.com/axios/axios>
[Webpack]: <https://webpack.js.org/>
[React]: <https://reactjs.org/>
[IBM Watson]: <https://www.ibm.com/watson/br-pt/>
[Laravel]: <https://laravel.com/>