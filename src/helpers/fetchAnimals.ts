import { client } from "../utils/fetchClient";

export const getAllAnimals = () => {
  return client.get("/api/animals");
}