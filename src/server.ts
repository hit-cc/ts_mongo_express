import app from "./config/app";
import env from "./environment";
const PORT = env.getPort();
console.log("PORT==>>", PORT);

app.listen(PORT, () => {
  console.log("Express server listening on port " + PORT);
});
