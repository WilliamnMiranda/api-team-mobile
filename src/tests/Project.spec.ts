import request from "supertest";
import { server } from "../tests/server";
import connectToDatabaseTest from "../helpers/connectMongoTest";
describe("This should crud the project", () => {
	beforeAll(async () => {
		await connectToDatabaseTest();
	});
	it("should create a project", async () => {
		const response = await request(server)
			.post("/project/create")
			.set(
				"x-access-token",
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RpbmdAZ21haWwuY29tIiwiaWF0IjoxNjgyOTYxODgwLCJleHAiOjE5ODI5NjE4ODB9.D-O9GJTb4frVxCG8Ep6GiStX77KZrNeYFW-YPXrLQkU",
			) // adiciona o token no cabeçalho
			.send({
				name: "Testing",
				technologies: ["'js'"],
				description: "dasfjdsjgsdgkksfhkfdkhkfdhkdfkhkdfkhkfd",
			});
		expect(response.status).toBe(200);
	});
});

afterAll((done) => {
	server.close(done);
});
