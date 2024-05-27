"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogInput = exports.createBlogInput = exports.singinBodyInput = exports.signupBodyInput = void 0;
const zod_1 = __importDefault(require("zod"));
//Zod validations 
exports.signupBodyInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    name: zod_1.default.string().optional(),
    password: zod_1.default.string()
});
//Zod validations for signin 
exports.singinBodyInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string()
});
exports.createBlogInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
});
exports.updateBlogInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    id: zod_1.default.string()
});
