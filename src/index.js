const sequelize = require("./utils/database");

sequelize
  .sync({ force: true })
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
