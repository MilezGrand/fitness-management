"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceController = void 0;
const order_model_js_1 = __importDefault(require("../models/order.model.js"));
const service_model_js_1 = __importDefault(require("../models/service.model.js"));
class ServiceController {
    getServices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = yield order_model_js_1.default.findAll({
                where: { client_id: id },
                include: { model: service_model_js_1.default, as: 'service_info' },
                order: [['id', 'DESC']]
            });
            res.status(200).send(data);
        });
    }
    createService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, clientId, serviceId } = req.body;
            const data = yield order_model_js_1.default.create({
                id: id,
                client_id: clientId,
                service_id: serviceId,
            });
            res.status(200).send(data);
        });
    }
}
exports.ServiceController = ServiceController;
