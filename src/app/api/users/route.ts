import { db } from "@/drizzle/client";
import { users } from "@/drizzle/schema";
import { NextResponse } from "next/server";
import { z } from "zod";

const userSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
});

export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        const { name, email } = userSchema.parse(body);
        const newUser = await db.insert(users).values({
            name,
            email,
        }).returning();
        return NextResponse.json(newUser, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }
}