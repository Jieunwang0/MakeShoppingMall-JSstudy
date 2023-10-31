import express from "express";
import cors from 'cors';
const app = express();
const port = 3000;

app.use(express.static("dist"));
app.use(cors());

app.get("/api/test", (req, res) => {
    res.json({
        name: "Jieun",
    });
});

app.listen(port, () => {
    console.log(`Server id running at http://localhost:${port}`);
});
