const should = require("should");
const { init } = require("../server");

describe("# Measurements", () => {
  let server;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
  });

  describe("## GET /measure", () => {
    it("should respond 200", async () => {
      const res = await server.inject({
        method: "GET",
        url: "/measure"
      });
      should(res.statusCode).equal(200);
    });
  });

  describe("## GET /measure", () => {
    it("should respond with an empty array", async () => {
      const res = await server.inject({
        method: "GET",
        url: "/measure"
      });
      const payload = JSON.parse(res.payload);
      console.log("TCL: res.payload", res.payload);
      should(payload).deepEqual([]);
    });
  });

  describe("## GET /measure", () => {
    it("should respond with a list of measure in an array", async () => {
      const measure1 = {
        date: "2019-04-22T01:00:00-05:00",
        chest: 82,
        hip: 84,
        weight: 49
      };
      const measure2 = {
        date: "2019-05-22T01:00:00-05:00",
        chest: 83,
        hip: 85,
        weight: 50
      };
      await Measure.create(measure1);
      await Measure.create(measure2);
      const res = await server.inject({
        method: "GET",
        url: "/measure"
      });
      should(res.payload).equal([measure1, measure2]);
    });
  });
});
