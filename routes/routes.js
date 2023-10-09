const router = require('express').Router();
const tier = require('../controllers/InitializeTier')
const round = require('../controllers/SetRound')
const whitelist = require('../controllers/Whitelist')
const price = require('../controllers/GetPrice')
const max = require('../controllers/GetMax')
const invest = require("../controllers/Invest")
const tokenPrice = require("../controllers/TokenPrice")
const claim = require("../controllers/Claim")
const verifyToken = require("../middleware/verifyToken")
const adminLogin = require("../controllers/admin/Login")
const presaleSetting = require("../controllers/PresaleSetting")
const setting = require("../controllers/Setting")
router.route('/login').post([], async (req, res) => {
    try {
        const result = await adminLogin.adminLogin(req, res);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
router.route('/initializetier').post([], async (req, res) => {
    try {
        const result = await tier.InitializeTier(req, res);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
router.route('/setround').post([], async (req, res) => {
    let result = await round.SetRound(req, res);
    res.send(JSON.parse(JSON.stringify(result)))
})
router.route('/gettiers').get([], async (req, res) => {
    let result = await tier.GetTier(req, res);
    res.send(JSON.parse(JSON.stringify(result)))
})
router.route('/getround').get([], async (req, res) => {
    let result = await round.GetRound(req, res);
    res.send(JSON.parse(JSON.stringify(result)))
})

router.route('/addtowhitelist').post([], async (req, res) => {
    try {
        const result = await whitelist.Whitelist(req, res);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
router.route('/getallwhitelistedaddress').get([], async (req, res) => {
    let result = await whitelist.GetWhitelistedAddress(req, res);
    res.send(JSON.parse(JSON.stringify(result)))
})
router.route('/getethprice').get([], async (req, res) => {
    let result = await price.GetPrice(req, res);
    res.send(JSON.parse(JSON.stringify(result)))
})
router.route('/setprice').post([], async (req, res) => {
    let result = await price.SetPrice(req, res);
    res.send(JSON.parse(JSON.stringify(result)))
})
router.route('/getwhitelisted').get([], async (req, res) => {
    let result = await whitelist.GetWhitelistedAddress(req, res);
    res.send(JSON.parse(JSON.stringify(result)))
})
router.route('/getmax').get([], async (req, res) => {
    let result = await max.GetMax(req, res);
    res.send(JSON.parse(JSON.stringify(result)))
})
router.route('/invest').post([], async (req, res) => {
    let result = await invest.Invest(req, res);
    res.send(JSON.parse(JSON.stringify(result)))
})
router.route('/settokenprice').post([], async (req, res) => {
    let result = await tokenPrice.TokenPrice(req, res);
    res.send(JSON.parse(JSON.stringify(result)))
})
router.route('/gettokenprice').get([], async (req, res) => {
    let result = await tokenPrice.GetTokenPrice(req, res);
    res.send(JSON.parse(JSON.stringify(result)))
})
router.route('/claim').post([], async (req, res) => {
    let result = await claim.Claim(req, res);
    res.send(JSON.parse(JSON.stringify(result)))
})
router.route('/set-presale-setting').post([], async (req, res) => {
    try {
        const result = await presaleSetting.PresaleSetting(req, res);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
router.route('/get-presale-setting').get([], async (req, res) => {
    try {
        const result = await presaleSetting.GetPresaleSetting(req, res);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
router.route('/setting').post([], async (req, res) => {
    try {
        const result = await setting.SetPresaleSetting(req, res);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
router.route('/get-presale-setting2').get([], async (req, res) => {
    try {
        const result = await setting.GetPresaleSetting2(req, res);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
module.exports = router