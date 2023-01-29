import { signInSchema, signUpSchema } from "../schema/AuthSchema.js";
import { usersCollection, sessionsCollection } from "../config/database.js";
import bcrypt from "bcrypt";

export async function signUpValidation(req, res, next) {
  const newUser = req.body;

  if (!newUser.name || !newUser.email || !newUser.password)
    return res
      .status(422)
      .send(
        "All fields (name, email, password and confirmPassword) are required"
      );

  const { error } = signUpSchema.validate(newUser, { abortEarly: false });

  if (error) {
    const errorsMessage = error.details.map((detail) => detail.message);
    return res.status(400).send(errorsMessage);
  }

  const checkUser = await usersCollection.findOne({ email: newUser.email });
  if (checkUser) return res.status(409).send("Esse usuário já existe");

  res.locals.newUser = newUser;

  next();
}

export async function signInValidation(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(422).send("All fields (email and password) are required");

  const { error } = signInSchema.validate(
    { email, password },
    { abortEarly: false }
  );

  if (error) {
    const errorsMessage = error.details.map((detail) => detail.message);
    return res.status(400).send(errorsMessage);
  }
  try {
    const userRegistered = await usersCollection.findOne({ email });

    if (!userRegistered) return res.status(401).send("Não autorizado");

    const checkPassword = bcrypt.compareSync(password, userRegistered.password);

    if (!checkPassword) return res.status(401).send("Não autorizado");

    if (userRegistered && checkPassword) {
      const tokenExists = await sessionsCollection.findOne({
        idUser: userRegistered._id,
      });
      if (tokenExists) {
        res.locals.tokenExists = tokenExists;
      }
    } else {
      return res
        .status(422)
        .send("User not registered or Invalid UserName or Invalid Password");
    }
    
    res.locals.userRegistered = userRegistered;
  } catch (error) {
    console.error(error);
    res.status(500).send("Houve um problema no servidor");
  }

  next();
}

export async function authRoutesValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.status(401).send("Não autorizado");

  try {
    const session = await sessionsCollection.findOne({ token });
    if (!session) return res.status(401).send("Não autorizado");

    const user = await usersCollection.findOne({ _id: session.userId });

    if (!user) return res.status(401).send("Não autorizado");

    res.locals.user = user;
  } catch (error) {
    console.erro(error);
    res.status(500).send("Houve um problema no servidor");
  }

  next();
}
