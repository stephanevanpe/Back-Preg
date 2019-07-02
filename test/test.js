const should = require("should");
const { init } = require("../server");
const Measure = require("../resources/measure/measure.model");

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
      const payload = JSON.parse(res.payload);
      should(payload).match([measure1, measure2]);
    });
  });

  describe("## POST /measure", () => {
    it("should respond 200", async () => {
      const req = {
        method: "POST",
        url: "/measure"
      };
      server.inject(req, res => {
        should(res.statusCode).equal(200);
        done();
      });
    });
  });

  describe("## POST /measure", () => {
    it("should be equal to injected data", async () => {
      const req = {
        method: "POST",
        url: "/measure",
        payload: JSON.stringify({
          date: "2019-04-22T01:00:00-05:00",
          chest: 82,
          hip: 84,
          weight: 49
        })
      };
      server.inject(req, res => {
        should(res.payload).equal({
          date: "2019-04-22T01:00:00-05:00",
          chest: 82,
          hip: 84,
          weight: 49
        });
        done();
      });
    });
  });
});
