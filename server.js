import express from "express";
const port = 3000;

const app = express();
app.use(express.json());
app.set('trust proxy', true);

app.get("/", async (req, res) => {

    let ips = (
        req.headers['cf-connecting-ip'] ||
        req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress || ''
    ).split(',');

    console.log(ips[0].trim());

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
