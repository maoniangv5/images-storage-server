const qiniu = require('qiniu');
const express = require('express');
const Config = require('../../congig');
const RestMsg = require('../../common/restmsg');

const router = express.Router();

router.route('/')
    .get(function (req, res, next) {

        let reqOrigin = req.headers.origin;
        console.log(reqOrigin)
        if (reqOrigin && reqOrigin.includes('localhost')) {
            res.header("Access-Control-Allow-Origin", reqOrigin);
            res.header('Access-Control-Allow-Credentials', 'true');
        }


        const rm = new RestMsg();
        const AKey = Config.AK;
        const SKey = Config.SK;
        const BKey = Config.BK;

        const MAC = new qiniu.auth.digest.Mac(AKey, SKey);
        const options = {
            scope: BKey,
            expires: 3600
        };
        const putPolicy = new qiniu.rs.PutPolicy(options);
        const uploadToken = putPolicy.uploadToken(MAC);
        if (uploadToken) {
            rm.successMsg();
            rm.setResult({
                uploadToken: uploadToken
            });
            res.send(rm);
        }
    })

module.exports = router;