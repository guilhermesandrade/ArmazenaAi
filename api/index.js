const express = require("express");
const app = express();
const routes = require("./api/repository/routes");

app.use(express.json());


app.use("/api", routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
