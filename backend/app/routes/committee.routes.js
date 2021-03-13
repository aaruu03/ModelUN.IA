const { authJwt } = require("../middlewares");
const controller = require("../controllers/committee.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //new
  app.post("/api/test/createc", controller.createc);
  app.post("/api/test/committee/:id", controller.getCommittee);
  app.post("/api/test/deletec/:id", controller.deleteCommittee);
};