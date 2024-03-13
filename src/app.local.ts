import { app } from "./app";

const port = 9000;

app.listen(port, () => {
  console.log(`Competition app listening at http://localhost:${port}`);
});
