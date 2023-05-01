import request from "supertest";
import { server } from "../tests/server";
import connectToDatabaseTest from "../helpers/connectMongoTest";
import UserModel from "../models/UserModel";
describe("This should create a user", () => {
	beforeAll(async () => {
		await connectToDatabaseTest();
		await UserModel.deleteMany({ name: "name test" });
	});

	it("should create a user", async () => {
		const response = await request(server).post("/user/create").send({
			name: "name test",
			email: "test@gmail.com",
			password: "123",
			cpf: 123,
		});
		expect(response.status).toBe(200);
	});
});

afterAll((done) => {
	server.close(done);
});
