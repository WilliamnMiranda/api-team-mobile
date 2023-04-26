export default {
	// ...
	testEnvironment: "node",
	transform: {
		"^.+\\.tsx?$": "ts-jest",
		"^.+\\.js$": "babel-jest",
	},
	transformIgnorePatterns: ["/node_modules/(?!@babel/runtime-corejs3/)"],
	extensionsToTreatAsEsm: [".ts"],
	globals: {
		"ts-jest": {
			useESM: true,
		},
	},
};
