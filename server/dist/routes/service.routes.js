"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const service_controller_js_1 = require("../controllers/service.controller.js");
const router = (0, express_1.Router)();
const serviceController = new service_controller_js_1.ServiceController();
router.get('/service/:id', serviceController.getServices);
router.post('/service', serviceController.createService);
exports.default = router;
