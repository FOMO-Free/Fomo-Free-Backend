const server = require('./api/server.js');
const cron = require("node-cron");

const PORT = process.env.PORT || 3300;

cron.schedule("* 0 * * *", function() {
  
});

server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});
