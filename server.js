import express from "express";
const port = 3000;

app.use(express.json());
app.set('trust proxy', true);

app.get("/", async (req, res) => {
 console.log(req.ip)
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
