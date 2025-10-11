"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTicket = createTicket;
exports.updateTicket = updateTicket;
exports.listTicketsForProject = listTicketsForProject;
const Ticket_1 = __importDefault(require("../models/Ticket"));
const ticket_factory_1 = require("./ticket.factory");
async function createTicket(payload) {
    return (0, ticket_factory_1.createTicketFactory)(payload);
}
async function updateTicket(ticket_Id, update) {
    return Ticket_1.default.findByIdAndUpdate(ticket_Id, update, { new: true });
}
async function listTicketsForProject(projectId) {
    return Ticket_1.default.find({ project: projectId }).sort({ order: 1 }).lean();
}
