/*const express = require('express')
const router = express.Router();*/

/**
 * Neste demonstração utilizamos o pacote request
 * Fique a vontade para utilizar o cliente de requisições que preferir,
 * Por exemplo, axios ou node-fetch
 */
const request = require('request');
const { isBefore } = require('date-fns');
const SERVER_URL = 'https://h-apigateway.conectagov.estaleiro.serpro.gov.br';  
const TOKEN_REQUEST_URL = SERVER_URL + '/oauth2/jwt-token'; 
const CLIENT_ID = '8ddc46f2-f6a3-4077-9e04-74b55de934a5'; 
const CLIENT_SECRET = '06d4aaac-1412-45f6-bd7c-38b2bef0d706'; 
const CONSULTA_CPF_URL = SERVER_URL + '/api-cpf-light/v2/consulta/cpf';
/**
 * O token será considerado expirado um pouco antes da data de expiração 
 * para que tenhammos uma margem de segurança
 * Neste exemplo, o token tem duracao de 2 horas = 7200 segundos
 * Assim, definimos nossa janela de tempo como 5 minutos = 300 segundos
 */
const EXPIRATION_WINDOW_IN_SECONDS = 300
/**
 * O mesmo token pode ser utilizado em várias vezes até a sua expiração
 * Utilizamos um variável de escopo de módulo apenas como demonstração
 * É mais interessante utilizar um modo de armazenamento mais robusto, como um cache
 */
let tokenStorage;
const consulta = async (cpfDigitado) => {

  let data_exp;

  /**
   * Tratamento do tempo de vida do token
   * Primeiro verifica se temos um token armazenado
   */
  if (!tokenStorage) {
    // Vamos obter um novo token e armazená-lo
    try {
      const response = await getPromiseToken();
      tokenStorage = JSON.parse(response['body']);
    }
    catch(error) {
      console.error('Erro na obtenção do token:', error);
      return 'Erro na obtenção do token:'
    }
  } else {
    // Validando a data de expiração do token existente

    /**
     * Data de expiração do token.
     * Poder ser criado um cache para armazenar o token e controlar o tempo de vida do cache com a data de expiração.
     */
    const exp = extractExp(tokenStorage.access_token);
    data_exp = new Date(exp * 1000);
    console.log(`Data de expiração do token: ${data_exp}`);

    /**
     * Token expirado, deve-se obter um novo token
     * Utilizamos o EXPIRATION_WINDOW_IN_SECONDS para obter um novo token 
     * alguns minutos antes da expiração
     */
    if (isBefore(data_exp, Date.now() + EXPIRATION_WINDOW_IN_SECONDS * 1000)) {
      // Atualizando o token
      try {
        const response = await getPromiseToken();
        tokenStorage = JSON.parse(response['body']);
      }
      catch(error) {
        console.error('Erro na obtenção do token:', error);
        return 'Erro na obtenção do token:'
      }
    }
  }
  
  const access_token = tokenStorage.access_token;

  let listaCpf;
  try {
    const response = await getPromiseConsultaCpf(access_token);
    listaCpf = JSON.parse(response['body']);
  }
  catch(error) {
    console.error('Erro na consulta à API CPF Light:', error);
      return 'Erro na consulta à API CPF'
  }

//  console.log("---------------------------CONSULTA 1-----------------------------\");
  console.log(listaCpf);

  let listaCpf2;
  try {
    const response = await getPromiseConsultaCpf(access_token);
    listaCpf2 = JSON.parse(response['body']);
  }
  catch(error) {
    console.error('Erro na consulta à API CPF Light:', error);
      return 'Erro na consulta à API CPF Light'
  }

  //console.log(\"---------------------------CONSULTA 2-----------------------------\");
  return listaCpf2

  //res.status(200).json(listaCpf);


/**
 * Extrai a data de expiração (atributo exp do payload) de um token JWT
 * @param tokenJwt Token JWT válido
 */
function extractExp(tokenJwt) {
  if (tokenJwt) {
    const parts = tokenJwt.split('.');
    if (parts.length === 3) {
      const payload = parts[1];
      if (payload) {
        return JSON.parse(Buffer.from(payload, 'base64')).exp
      }
    }
  }
  return null;
}

/*
 Formato da requisição para obtenção do token de acesso para executar as consultas às API's do Conectagov. 
  METHOD: POST
  HEADERS:
    Content-Type: application/x-www-form-urlencoded
    Authorization: client_id + \":\" + client_secret codificado em Base64
*/ function getPromiseToken() {
  const options =  {
    method: 'POST',
    url: TOKEN_REQUEST_URL,
    headers: {
       'Content-Type' : 'application/x-www-form-urlencoded',
       'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString('base64'),
    },
    body: "grant_type=client_credentials",
  }

  return new Promise(function(resolve, reject) {
    request(options, (err, res, body) => {
      if (err) {
        reject(err)
      } else if (res.statusCode && res.statusCode === 200) {
        resolve({body, status: res.statusCode});
      } else {
        reject({body, status: res.statusCode});
      }
    })
  });
}

/*
 Formato da requisição para executar a consulta à API CPF Light:
  METHOD: POST
  HEADERS:
    Content-Type: application/json
    x-cpf-usuario: CPF do usuário que está executando a consulta.
    Authorization: \"Bearer \" + o token de acesso gerado de acordo com a descrição da função getPromiseToken acima.
  BODY: {
      \"listaCpf\": [
        \"cpf1\",
        \"cpf2\",
        \"cpf3\"
        (No Máximo 50 CPF's)
      ]
    }
 
*/
 function getPromiseConsultaCpf(access_token) {
  const options =  {
    method: 'POST',
    url: CONSULTA_CPF_URL,
    headers: {
       'Content-Type' : 'application/json',
       'x-cpf-usuario': cpfDigitado,
       'Authorization': 'Bearer ' + access_token,
    },
    body: '{\\\"listaCpf\\\": [\\\"00000000272\\\",\\\"00000000353\\\",\\\"00000000434\\\"]}',
  }

  return new Promise(function(resolve, reject) {
    request(options, (err, res, body) => {
      if (err) {
        reject(err)
      } else if (res.statusCode && res.statusCode === 200) {
        resolve({body, status: res.statusCode});
      } else {
        reject({body, status: res.statusCode});
      }
    })
  });
}
}

module.exports = consulta


