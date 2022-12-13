const urlModel = require("../models/urlModel")
const shortId = require("shortid")
const validUrl = require("valid-url")
const shortUrlData = async function (req, res) {
    try {
        let baseUrl = "http://localhost:3000"
        let url = req.body.longUrl

        if(Object.keys(req.body)==0 || !url || typeof(url)!="string") return res.status(400).send({status:false,
            message:"Please Provide Url"})
    
 if (!validUrl.isUri(url)) return res.status(400).send({ status: false, message: "Invalid Url" })
    
            let checkedUrl=await urlModel.findOne({longUrl:url}).select({ _id: 0, __v: 0 })
    
            if(!checkedUrl){
                let urlCode = shortId.generate(url).toLowerCase()
                let shortUrl = baseUrl + "/" + urlCode
                const saveData = await urlModel.create( {longUrl: url,shortUrl: shortUrl,urlCode: urlCode })
                let saveData1 = await urlModel.findById(saveData._id).select({ _id: 0, __v: 0 })
                return res.status(201).send({ status: true, data: saveData1 })
            }
            else return res.status(200).send({ status: true, data: checkedUrl })
            }
    catch (err) {
        res.status(500).send({ status: false, message: err.mesaage })
    }
}

//==================================================[Redirecting to LongUrl]===========================================================


const redirect = async function (req, res) {
    try {

       
    const url = await urlModel.findOne({ urlCode: req.params.urlCode });
            if (!url) return res.status(404).send({ status: false, message: "No url found" })
           else  return res.redirect(302,url.longUrl)
                  }catch (err) {return res.status(500).send({ status: false, message: err.message })
            }
              }
      

module.exports = {shortUrlData,redirect}

