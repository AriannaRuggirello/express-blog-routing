// importo express
const express= require('express');
// importo json
const posts = require('../db/db.json')

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
// rotta index
function index(req,res){
    res.type('html')
    
    // Creo una pagina HTML con i post
    const html = [
        '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">',
        '<h1>benvenuto!</h1>',
        '<div class="row justify-content-between">'
    ];

    // Aggiungi i post alla pagina HTML
    for (const post of posts) {
        html.push(`
            <div class="col">
                <div class="card" style="width: 250px;">
                <img src="/imgs/posts/${post.image}" alt="">
                  
                    <h5 class="card-title">${post.title}</h5>
                    <div class="card-body">
                    <a class="card-text"> #${post.tags}</a>
                    </div>
                </div>
            </div>
        `);
    }

    html.push('</div>');

    // Invia la pagina HTML al client
    res.send(html.join(''));
  
      

}

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
function show(req, res) {
    res.type('json')
    // Ottengo lo slug del post dalla richiesta
    const postSlug = req.params.slug;
    // Cerco il post corrispondente nello slug nell'array dei post
    const post = posts.find((post) => post.slug == postSlug);

    // Se non ho trovato il post, restituisco un errrore
    if (!post) {
        res.status(404).send(`Post ${postSlug} non trovato`);
        return;
    }
    // Se ho trovato il post, lo restituisco come risposta JSON
    res.json(post);
  }


  /**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
  function create(req, res) {
    res.format({
        html: function(){
            return res.type("html").send("<h1>Creazione nuovo post</h1>");
        },
        default: function(){
            if (!req.get('Accept') || !req.get('Accept').includes('html')) {
                res.status(406).send("Not Acceptable");
            }
        }
    });
}




// esporto 
module.exports={
    index,
    show,
    create
}