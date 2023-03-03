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
exports.ClientController = void 0;
const client_model_js_1 = __importDefault(require("../models/client.model.js"));
const abonement_model_js_1 = __importDefault(require("../models/abonement.model.js"));
const service_model_js_1 = __importDefault(require("../models/service.model.js"));
class ClientController {
    createClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, passport, phone, abonementType, expires } = req.body;
            const data = yield client_model_js_1.default.create({
                id: id,
                name: name,
                passport: passport,
                contact: phone,
                abonement: abonementType,
                expires: expires,
            });
            res.status(200).send(data);
        });
    }
    getClients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield client_model_js_1.default.findAll({ order: [['name', 'ASC']] });
            res.status(200).send(data);
        });
    }
    getClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = yield client_model_js_1.default.findOne({
                where: { id: id },
                include: { model: abonement_model_js_1.default, as: 'abonement_info' },
            });
            res.status(200).send(data);
        });
    }
    updateClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { clientId, serviceId } = req.body;
            const service = yield service_model_js_1.default.findOne({ where: { id: serviceId } });
            const client = yield client_model_js_1.default.findOne({ where: { id: clientId } });
            const actualExpires = new Date(client === null || client === void 0 ? void 0 : client.dataValues.expires).getTime();
            const data = yield (client === null || client === void 0 ? void 0 : client.update({
                expires: new Date(actualExpires + (service === null || service === void 0 ? void 0 : service.dataValues.period) * 86400 * 1000),
            }));
            res.status(200).send(data);
        });
    }
    deleteClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield client_model_js_1.default.destroy({ where: { id: id } });
            res.status(200).json({});
        });
    }
}
exports.ClientController = ClientController;
