"use strict";
////////////STEP 2 ////////////
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTicketFactory = createTicketFactory;
const Ticket_1 = __importDefault(require("../models/Ticket"));
const Project_1 = __importDefault(require("../models/Project"));
async function createTicketFactory({ title, description, projectId, createdBy, status = 'todo' }) {
    const ticket = await Ticket_1.default.create({
        title,
        description,
        project: projectId,
        createdBy,
        status
    });
    await Project_1.default.findByIdAndUpdate(projectId, { $push: { tickets: ticket._id, members: createdBy } });
    return ticket;
}
