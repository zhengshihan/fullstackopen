const app = require("./app"); // the actual Express application
const config = require("./utils/config");
const logger = require("./utils/logger");

app.listen(3003, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
