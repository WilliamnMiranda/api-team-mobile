import request from "supertest";
import { server } from "../server";
import connectToDatabase from "../helpers/connectMongo";
require("dotenv").config();

describe("This should create a user", () => {
	beforeAll(async () => {
		await connectToDatabase();
	});

	it("should create a user", async () => {
		const response = await request(server).post("/user/create").send({
			name: "name test",
			email: "email@test.com",
			password: "123",
			cpf: 123,
		});
		expect(response.status).toBe(200);
	});
});
