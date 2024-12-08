const axios = require("axios");
const cheerio = require("cheerio");

const getZahwazein = "zenzkey_6e1fb91336"
const getLolhuman = "GataDios"

function instagramStoryUser(user) {
  return new Promise((resolve, reject) => {
    try {
      axios.get(`https://api.zahwazein.xyz/downloader/instagram/story?apikey=${getZahwazein}&username=${user}`)
      .then((res) => {
         resolve(res.data.result)
     })    
      } catch(e) {
       reject(e)
     }
   })
}

function igProfileStalk(user) {
  return new Promise((resolve, reject) => {
    try {
      axios.get(`https://api.lolhuman.xyz/api/stalkig/${user}?apikey=${getLolhuman}`)
      .then((res) => {
      axios.get(`https://api.zahwazein.xyz/stalker/ig?username=${user}&apikey=${getZahwazein}`)
      .then((data) => {
         resolve({
         FOTO: data.data.result.hd_profile_pic_url_info.url, 
         NOME: res.data.result.username, 
         NOMECPLT: res.data.result.fullname, 
         PRIVADO: data.data.result.is_private, 
         POSTS: res.data.result.posts, 
         SEGUIDORES: res.data.result.followers, 
         SEGUINDO: res.data.result.following, 
         BIO: res.data.result.bio,
         })
        })
     })
    } catch(e) {
    resolve({status: false, message: e.message})
    }
  })
}

function unsplashSearch(query) {
  return new Promise((resolve, reject) => {
    try {
      axios.get(`https://vihangayt.me/search/unsplash?q=${query}`)
      .then((res) => {
         resolve(res.data.data)
     })    
      } catch(e) {
       reject(e)
     }
   })
}

module.exports = { 
     instagramStoryUser,
     igProfileStalk,
     unsplashSearch
} 