import mongoose, { ConnectOptions } from "mongoose";
import { Request, Response } from "express";
import request from "supertest";
import { server } from "../server";
require("dotenv").config();

describe("This should create a user", () => {
	const MONGO_URL = process.env.DATABASE || "";
	beforeAll(async () => {
		mongoose.connect(MONGO_URL);
	});

	it("a", async () => {
		const response = await request(server).post("/create").send({
			name: "name test",
			email: "email@test.com",
			password: "123",
			cpf: 123,
		});
		expect(response.status).toBe(200);
	});
});
