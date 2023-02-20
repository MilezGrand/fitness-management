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
const postgres_js_1 = __importDefault(require("../service/postgres.js"));
class ServiceController {
    getServices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = yield postgres_js_1.default.query('SELECT * FROM rented_services INNER JOIN services ON rented_services.service_id = services.id WHERE client_id = $1 ORDER BY rented_services.timestamp DESC', [id]);
            res.status(200).json(data.rows);
        });
    }
    createService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, clientId, serviceId } = req.body;
            const data = yield postgres_js_1.default.query(`INSERT INTO rented_services(timestamp, client_id, service_id ) VALUES ($1, $2, $3)`, [id, clientId, serviceId]);
            res.status(200).json(data.rows);
        });
    }
}
exports.ServiceController = ServiceController;
