"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_routes_js_1 = __importDefault(require("./routes/client.routes.js"));
const service_routes_js_1 = __importDefault(require("./routes/service.routes.js"));
const db_js_1 = require("./db.js");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', client_routes_js_1.default);
app.use('/api', service_routes_js_1.default);
(0, db_js_1.openConnection)();
app.listen(4000, () => {
    console.log('Server OK');
});
app.on('error', err => console.log(err));
