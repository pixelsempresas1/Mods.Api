__path = process.cwd()
const express = require("express");
const fs = require('fs');
const fetch = require('node-fetch')
const FileType = require('file-type')
const router = express.Router()
const path = require('path')
const { spawn } = require('child_process')
const { 
  toAudio,
  toPTT,
  toVideo,
  ffmpeg, 
  } = require('../lib/converter')
const { webp2gifFile } = require('../lib/gif')
const { cekKey, limitAdd, isLimit } = require('../database/db');
const { getBuffer , getRandom} = require("../lib/buff");

//Get Buffer
async function getFile(path) {
      let res
      let data = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (res = await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : typeof path === 'string' ? path : Buffer.alloc(0)
      if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
      let type = await FileType.fromBuffer(data) || {
        mime: 'application/octet-stream',
        ext: '.bin'
      }

      return {
        res,
        ...type,
        data
      }
    }

/**
 * Image to Webp
 * @param {String} url Image/Video URL
 */
 async function sticker(url) {
    if (url) {
      let res = await fetch(url)
      if (res.status !== 200) throw await res.text()
      img = await res.buffer()
    }
    return await ffmpeg(img, [
      '-vf', 'scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1'
    ], 'jpeg', 'webp')
  }

 async function sticker2(img) {
    return await ffmpeg(img, [
      '-vf', 'scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1'
    ], 'jpeg', 'webp')
  }


async function towebp(req, res) {
    const apikey = req.query.apikey;
    const img = req.query.img;
     if (img === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `insira o parâmetro img & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        mensagem: `apikey: ${apikey} não encontrada, por favor registre-se primeiro!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'seu limit acabou volte amanhã ou compre o premium...'});
    limitAdd(apikey);
    var stc = await sticker(img)
    await fs.writeFileSync(__path + '/tmp/figurinha.webp', stc)
   	await res.sendFile(__path + '/tmp/figurinha.webp')
  }
  async function tomp3(req, res) {
    const apikey = req.query.apikey;
    const video = req.query.video;
     if (video === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `insira o parâmetro video & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        mensagem: `apikey: ${apikey} não encontrada, por favor registre-se primeiro!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'seu limit acabou volte amanhã ou compre o premium...'});
    limitAdd(apikey);
    const Buffer = await fetch(video)
	  const getBuffer = await Buffer.buffer()
    let audio = await toAudio(getBuffer, 'mp4')
    await fs.writeFileSync(__path + '/tmp/audio.mp3', audio)
	await res.sendFile(__path + '/tmp/audio.mp3')
  }
  
  async function togif(req, res) {
    const apikey = req.query.apikey;
    const link = req.query.link;
     if (link === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `insira o parâmetro link & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        mensagem: `apikey: ${apikey} não encontrada, por favor registre-se primeiro!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'seu limit acabou volte amanhã ou compre o premium...'});
    limitAdd(apikey);
    const Buffer = await fetch(link)
	  const getBuffer = await Buffer.buffer()
    let fiugll = await toAudio(getBuffer, 'webp')
    await fs.writeFileSync(__path + '/tmp/figurinha.mp4', fiugll)
	await res.sendFile(__path + '/tmp/figurinha.mp4')
  }

module.exports = { towebp, tomp3, sticker, sticker2, togif };
