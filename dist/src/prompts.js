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
exports.loadMainPrompts = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
function loadMainPrompts() {
    return __awaiter(this, void 0, void 0, function* () {
        return inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    { name: 'View All Employees', value: 'VIEW_EMPLOYEES' },
                    { name: 'View All Departments', value: 'VIEW_DEPARTMENTS' },
                    { name: 'View All Roles', value: 'VIEW_ROLES' },
                    { name: 'Add Employee', value: 'ADD_EMPLOYEE' },
                    { name: 'Exit', value: 'EXIT' }
                ]
            }
        ]);
    });
}
exports.loadMainPrompts = loadMainPrompts;
