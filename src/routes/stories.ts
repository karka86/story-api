const express = require('express');
const router = express.Router();
import {StoryController} from "../controller/StoryController";
const checkRole = require('./../middlewares').checkRole;
const constants = require('../constants');

router.post('/',  StoryController.create_story);
router.get('/:id([0-9]+)',  StoryController.get_story);
router.get('/',  StoryController.list_stories);
router.post('/update', checkRole(constants.roles.admin), StoryController.update_story);






module.exports = router;