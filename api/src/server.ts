import { app } from "./app";

let base_url = process.env.BASE_URL
let port = Number(base_url.split(':')[2])

if (!port) {
  port = 80
}

app.listen(port, () => {
  console.log(`Server is running on ${base_url}`);
});