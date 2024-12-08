const { cekKey, limitAdd, isLimit } = require('../database/db');
const fetch = require('node-fetch');
const { consulta } = require("../lib/consulta");
/*
async function cpf(req, res) {
    const apikey = req.query.apikey;
    const cpfr = req.query.cpf;
   if (apikey === undefined || cpfr === undefined) return res.status(404).send({
        status: 404,
        message: `insira o parâmetro cpfr & apikey`
    });
    if(apikey !== `Av3a3T827dkK5hB5`) return res.status(403).send({
   entre_em_contato_para_obter_a_api:`https://wa.me/5562936180708`});
    fetch(encodeURI(`http://66.70.240.220/api/rick/consulta/cpf/${cpfr}`))
        .then(response => response.json())
        .then(result => {       
        res.json({status: 200, resultado: result});
        });
}

async function cpfull(req, res) {
    const apikey = req.query.apikey;
    const cpf = req.query.cpf;
   if (apikey === undefined || cpf === undefined) return res.status(404).send({
        status: 404,
        message: `insira o parâmetro cpf & apikey`
    });
   if(apikey !== `Aj3a5T627dkK5hB5`) return res.status(403).send({
   entre_em_contato_para_obter_a_api:`https://wa.me/5562936180708`});
    fetch(encodeURI(`http://51.255.55.134/receita.php?cpf=${cpf}`))
        .then(response => response.json())
        .then(data => {
    res.json({
    resultado: {
    criador: `Paulo`,
    cpf: `${data.pessoa.id}`,
    nome: `${data.pessoa.nome}`,
    nome_mãe: `${data.nomeMae}`,
    nascimento: `${data.dataNascimento}`,
    título_eleitor: `${data.numeroTituloEleitor}`,
    sexo: `${data.sexo}`,
    cidade_natal: `${data.pessoa.nomeMunicipioNaturalidade}`,
    bairro: `${data.pessoa.nomeBairro}`,
    rua: `${data.pessoa.nomeLogradouro}`,
    município: `${data.pessoa.nomeMunicipio}`,
    cep: `${data.pessoa.numeroCep}`,
    ddd: `${data.pessoa.numeroDdd}`,
    número: `${data.pessoa.numeroTelefone}`,
    sigla: `${data.pessoa.siglaUf}`
    },
    });
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            mensagem: 'Erro no Servidor Interno'
        })
    });
}

async function cpfull2(req, res) {
    const apikey = req.query.apikey;
    const cpfr = req.query.cpf;
   if (apikey === undefined || cpfr === undefined) return res.status(404).send({
        status: 404,
        message: `insira o parâmetro cpfr & apikey`
    });
    if(apikey !== `Av3a3T827dkK5hB5`) return res.status(403).send({
   entre_em_contato_para_obter_a_api:`https://wa.me/5562936180708`});
consulta(cpfr).then(result => {
  res.status(200).send({status: 200, resultado: result});
  });
}

async function nome(req, res) {
    const apikey = req.query.apikey;
    const nomer = req.query.nome;
   if (apikey === undefined || nomer === undefined) return res.status(404).send({
        status: 404,
        message: `insira o parâmetro nome & apikey`
    });
    if(apikey !== `Av3a3T827dkK5hB5`) return res.status(403).send({
   entre_em_contato_para_obter_a_api:`https://wa.me/5562936180708`});
    fetch(encodeURI(`http://ghostcenter.xyz/api/nome/${nomer}`))
        .then(response => response.json())
        .then(resultado => {
    res.json({criador: `@sayo`,resultado});
});
}
*/
async function ddd(req, res) {
    const apikey = req.query.apikey;
    const ddd = req.query.ddd;
   if (apikey === undefined || ddd === undefined) return res.status(404).send({
        status: 404,
        message: `insira o parâmetro ddd & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} não encontrada, por favor registre-se primeiro!`
    });
     let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'seu limit acabou volte amanhã ou compre o premium...'});
    fetch(encodeURI(`https://brasilapi.com.br/api/ddd/v1/${ddd}`))
        .then(response => response.json())
        .then(data => {
    res.json({
    resultado: {
    criador: `Paulo`,
    estado: `${data.state}`,
    cidades: `${data.cities}`
    },
    });
    limitAdd(apikey);
});
}


async function cep(req, res) {
    const apikey = req.query.apikey;
    const cep = req.query.cep;
   if (apikey === undefined || cep === undefined) return res.status(404).send({
        status: 404,
        message: `insira o parâmetro cep & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} não encontrada, por favor registre-se primeiro!`
    });
     let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'seu limit acabou volte amanhã ou compre o premium...'});
    fetch(encodeURI(`https://viacep.com.br/ws/${cep}/json/`))
        .then(response => response.json())
        .then(data => {
    res.json({
    resultado: {
    criador: `Paulo`,
    cep: `${data.cep}`,
    local: `${data.logradouro}`,
    complemento: `${data.complemento}`,
    bairro: `${data.bairro}`,
    localidade: `${data.localidade}`,
    uf: `${data.uf}`,
    ibge: `${data.ibge}`,
    gia: `${data.gia}`,
    ddd: `${data.ddd}`,
    siafi: `${data.siafi}`
    },
    });
    limitAdd(apikey);
});
}


async function ip(req, res) {
    const apikey = req.query.apikey;
    const ip = req.query.ip;
   if (apikey === undefined || ip === undefined) return res.status(404).send({
        status: 404,
        message: `insira o parâmetro ip & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} não encontrada, por favor registre-se primeiro!`
    });
     let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'seu limit acabou volte amanhã ou compre o premium...'});
    fetch(encodeURI(`http://ipwhois.app/json/${ip}`))
        .then(response => response.json())
        .then(data => {
    res.json({
    resultado: {
    criador: `Paulo`,
    ip: `${data.ip}`,
    tipo: `${data.type}`,
    continente: `${data.continent}`,
    continente_sigla: `${data.continent_code}`,
    país: `${data.country}`,
    país_sigla: `${data.country_code}`,
    capital: `${data.country_capital}`,
    ddd: `${data.country_phone}`,
    países_vizinhos: `${data.country_neighbours}`,
    cidade: `${data.city}`,
    região: `${data.region}`,
    latitude: `${data.latitude}`,
    longitude: `${data.longitude}`,
    asn: `${data.asn}`,
    orgão: `${data.org}`,
    isp: `${data.isp}`,
    fuso_horário: `${data.timezone}`,
    moeda: `${data.currency}`,
    moeda_code: `${data.currency_code}`,
    símbolo_da_moeda: `${data.currency_symbol}`
    },
    });
    limitAdd(apikey);
});
}


async function covid(req, res) {
    const apikey = req.query.apikey;
   if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `insira o parâmetro apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} não encontrada, por favor registre-se primeiro!`
    });
     let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'seu limit acabou volte amanhã ou compre o premium...'});
    fetch(encodeURI(`https://covid19-brazil-api.vercel.app/api/report/v1/brazil`))
        .then(response => response.json())
        .then(data => {
    res.json({
    resultado: {
    criador: `Paulo`,
    casos: `${data.data.cases}`,
    confirmados: `${data.data.confirmed}`,
    mortos: `${data.data.deaths}`,
    recuperados: `${data.data.recovered}`,
    dados_atualizado: `${data.data.updated_at}`
    },
    });
    limitAdd(apikey);
});
}


module.exports = { ddd, cep, ip, covid};