const express = require('express'); 
const bodyParser = require('body-parser') 
const youtubedl = require('youtube-dl-exec') 

//init app 
const app = express();
  
//body parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
 
 

app.post("/getYtjson/", (req, res) =>{
    let url = decodeURIComponent(req.body.url)

    try
    {
        youtubedl(url, {
            dumpSingleJson: true,
            noWarnings: true,
            noCallHome: true,
            noCheckCertificate: true,
            preferFreeFormats: true,
            youtubeSkipDashManifest: true,
            referer: url
          }).then(output =>
            {
                res.status(200).json(output)
            })
    }catch(e)
    {
        res.status(500).json({})
    }
    

});


 

//start server
app.listen(8081,()=>{
    console.log("server started on 8081")
})