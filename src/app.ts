import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import express, { Request, Response } from "express";

const app = express();

const dabaseURL = process.env.DATABASE_URL || "";

app.get("/", async (request: Request, response: Response) => {
  const client = postgres(dabaseURL);
  const db = drizzle(client);

  const user = pgTable("user_drizzle", {
    id: serial("id"),
    name: text("name"),
  });

  const allUsers = await db.select().from(user);

  console.log({ allUsers });
  response.json(allUsers).status(200);
});

app.listen(2000);
