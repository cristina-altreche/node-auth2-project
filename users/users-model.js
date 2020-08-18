const db = require("../data/connection");

module.exports = {
  find,
};

function find() {
  return db("users").select("id", "username").orderBy("id");
}
