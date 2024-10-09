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
const uploadFile = require('../middlewares/uploadFile');
const express_1 = __importDefault(require("express"));
const StudentValidator_1 = __importDefault(require("../middlewares/StudentValidator"));
const StudentController_1 = __importDefault(require("../controllers/StudentController"));
const router = express_1.default.Router();
router.post('/store-by-file', uploadFile.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield StudentController_1.default.storeByFile(req, res);
}));
router.get('/', (req, res) => {
    StudentController_1.default.index(req, res);
});
router.post('/store', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    StudentValidator_1.default.validate(req, res, next);
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield StudentController_1.default.store(req, res);
}));
router.post('/store-by-file', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    StudentValidator_1.default.validate(req, res, next);
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield StudentController_1.default.store(req, res);
}));
router.delete('/delete/:user_id', (req, res) => {
    StudentController_1.default.delete(req, res);
});
router.put('/update/:user_id', (req, res, next) => {
    StudentValidator_1.default.validate(req, res, next);
}, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    StudentController_1.default.update(req, res);
}));
exports.default = router;
