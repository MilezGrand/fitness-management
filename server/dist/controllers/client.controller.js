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
const postgres_js_1 = __importDefault(require("../service/postgres.js"));
class ClientController {
    createClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, passport, phone, abonementType, expires } = req.body;
            yield postgres_js_1.default.query(`INSERT INTO clients(id, name, passport, contact, abonement, expires) VALUES ($1, $2, $3, $4, $5, $6)`, [id, name, passport, phone, abonementType, expires]);
            res.status(200);
        });
    }
    getClients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield postgres_js_1.default.query('SELECT name,id FROM clients');
            console.log(postgres_js_1.default.eventNames());
            res.send(data.rows);
        });
    }
    getClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = yield postgres_js_1.default.query('SELECT * FROM clients INNER JOIN abonements ON clients.abonement = abonements.id WHERE clients.id = $1 ', [id]);
            res.status(200).json(data.rows);
        });
    }
    updateClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { clientId, serviceId } = req.body;
            const data = yield postgres_js_1.default.query(`UPDATE clients SET expires = expires + (services.period::text||' days')::interval FROM services WHERE services.id = $2 AND clients.id = $1 `, [clientId, serviceId]);
            res.status(200).json(data.rows);
        });
    }
    deleteClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = yield postgres_js_1.default.query('DELETE FROM clients WHERE clients.id = $1', [id]);
            res.status(200).json(data.rows);
        });
    }
}
exports.ClientController = ClientController;
