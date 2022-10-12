import app from "./config/app";
import env from "./environment";
const PORT = env.getPort();

app.listen(PORT, () => {
  console.info("Express server listening on port " + PORT);
});
