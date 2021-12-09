import config from "@/config";
import app from "@/server";
import { connect } from "@/db/sequelize";

app.listen(config.server.port, () => {
  console.log(`started on http://localhost:${config.server.port}`);
  connect();
});
