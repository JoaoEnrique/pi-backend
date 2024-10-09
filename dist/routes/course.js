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
const express_1 = __importDefault(require("express"));
const CourseController_1 = __importDefault(require("../controllers/CourseController"));
const courseValidator_1 = __importDefault(require("../middlewares/courseValidator"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    CourseController_1.default.index(req, res);
});
router.post('/store', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    courseValidator_1.default.validate(req, res, next);
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield CourseController_1.default.store(req, res);
}));
router.delete('/delete/:course_id', (req, res) => {
    CourseController_1.default.delete(req, res);
});
router.put('/update/:course_id', (req, res, next) => {
    courseValidator_1.default.validate(req, res, next);
}, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    CourseController_1.default.update(req, res);
}));
exports.default = router;
