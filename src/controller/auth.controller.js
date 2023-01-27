import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import { usersCollection, sessionsCollection } from "../config/database.js";

export async function signUp(req, res) {
  const newUser = res.locals.newUser;

  const hashPassword = bcrypt.hashSync(newUser.password, 10);

  try {
    await usersCollection.insertOne({ ...newUser, password: hashPassword });
    return res.status(201).send("Usuário cadastrado com sucesso");
  } catch (error) {
    return res.status(500).send("Deu algo errado no servidor");
  }
}

export async function signIn(req, res) {
  
  const userRegistered = res.locals.userRegistered;
  const tokenExists = res.locals.tokenExists;
  const token = uuidV4();

  try {
    if (tokenExists) {
      await sessionsCollection.updateOne(
        { idUser: userRegistered._id },
        { $set: { token } }
      );
      return res.status(200).send({ token });
    } else {
      await sessionsCollection.insertOne({ idUser: userRegistered._id, token });
      return res.status(200).send({ token });
    }
  } catch (error) {
    return res.status(500).send("Deu algo errado no servidor");
  }
}
