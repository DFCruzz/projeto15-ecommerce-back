import express,{json} from "express";
import cors from "cors";
import authRouter from "./routes/AuthRoutes.js";
import ProductRouter from "./routes/ProductRouter.js";


const PORT = process.env.PORT || 5008;
const app = express();


app.use([cors(),json()],[authRouter, ProductRouter]);

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));