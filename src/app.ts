import express from "express";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/router-not-found";
import appConfig from "./4-utils/app-config";
import productsRoute from "./6-routes/product-routes";
import employeesRoute from "./6-routes/employees-routes"
import dal from "./4-utils/dal";

const server = express();

server.use(express.json());
server.use("/", productsRoute);
server.use("/", employeesRoute);
server.use(routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, async () => {
  await dal.connect();
  console.log("Listening on http://localhost:" + appConfig.port);
});
