import express,{json} from "express";
import cors from "cors";
import authRouter from "./routes/AuthRoutes.js";


const PORT = process.env.PORT || 5008;
const app = express();


app.use([cors(),json()],authRouter);


app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));