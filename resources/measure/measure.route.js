const Measure = require("./measure.model");

module.exports = [
  {
    method: "GET",
    path: "/measure",
    handler: (request, h) => {
      return Measure.findAll();
    }
  },
  {
    method: "POST",
    path: "/measure",
    handler: (request, h) => {
      return Measure.create(request.payload);
    }
  }
];
