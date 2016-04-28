var express = require('express');
var router = express.Router();
var ctrlVideos = require('../controllers/videos');
var ctrlOptions = require('../controllers/options');

router.get('/videos', ctrlVideos.videosListByDate);
router.post('/videos', ctrlVideos.videosCreate);
router.get('/videos/:videoid', ctrlVideos.videosReadOne);
router.put('/videos/:videoid', ctrlVideos.videosUpdateOne);
router.delete('/videos/:videoid', ctrlVideos.videosDeleteOne);

router.get('/options/general', ctrlOptions.optionsGeneral);

module.exports = router;
