// import clientPromise from "@/lib/MongodbClient";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password,phoneNumber, name } = await request.json();
  

    console.log({email, password,phoneNumber, name })
    // const bcrypt = require("bcrypt");

    // const hashedPassword = await bcrypt.hash(password, 10);

    // const client = await clientPromise;
    // const db = client.db();

    // const createAccount = await db
    //   .collection("users")
    //   .insertOne({ email: email, password: hashedPassword });

    return NextResponse.json({ success: "Account created" },  { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
