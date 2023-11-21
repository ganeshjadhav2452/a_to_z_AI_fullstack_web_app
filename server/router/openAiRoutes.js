const express = require('express')
const { paragraphController,
    chatbotController,
    scifiImageController,
    jsconverterController,
    summaryController } = require('../controllers/openAiControllers')
const router = express.Router()

//route
router.post("/summary", summaryController);
router.post("/paragraph", paragraphController);
router.post("/chatbot", chatbotController);
router.post("/js-converter", jsconverterController);
router.post("/scifi-image", scifiImageController);



module.exports = router;