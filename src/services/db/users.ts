import { users, type User } from "../../schema";
import { drizzle } from "drizzle-orm/d1";
import { eq, isNull } from 'drizzle-orm/expressions'


export async function createUser(DB: D1Database, data: { id: string, email: string, name?: string, isVerified: boolean }) {
  const db = drizzle(DB);
  await db.insert(users)
    .values(data)
    .run();
}

export async function deleteUser(DB: D1Database, id: string) {
  const db = drizzle(DB);
  await db.delete(users)
    .where(eq(users.id, id))
    .run()
}

export async function getUser(DB: D1Database, id: string): Promise<User> {
  const db = drizzle(DB);
  const res = await db.select().from(users)
    .where(eq(users.id, id))
    .run()

  return (res.results as User[])[0];
}
