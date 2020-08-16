const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const swaggerTools = require('swagger-tools');
const jsyaml = require('js-yaml');
const spec = fs.readFileSync(
  path.join(__dirname, '../doc/swagger.yaml'),
  'utf8'
);
const swaggerDoc = jsyaml.safeLoad(spec);

swaggerTools.initializeMiddleware(swaggerDoc, (middleware) => {
  router.use(middleware.swaggerUi());
});

module.exports = router;
