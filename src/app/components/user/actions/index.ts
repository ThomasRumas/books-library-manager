"use server";

import { createUser, findUserByEmail } from "../../../services/prisma/index";
import * as crypto from "crypto";
import { cookies } from 'next/headers'

interface UserRequest {
  email: string;
  password: string;
}

export async function registerUser({ email, password }: UserRequest) {
  try {
    // Validate input (e.g., check email format, password strength)
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Create the user in the database
    const user = await createUser(email, password);

    return {
      success: true,
      user,
    };
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    console.error("Error registering user:", error);
    return {
      success: false,
      error: error.message || "An error occurred during registration",
    };
  }
}

export async function loginUser({ email, password }: UserRequest) {
  try {
    // Validate input (e.g., check email format)
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const hashedPassword = crypto
      .createHash("sha512")
      .update(password)
      .digest("hex");

    // Check if user exists in the database
    const user = await findUserByEmail(email);
    if(!user) {
      return {
        success: false,
        error: "User not found",
      }
    }

    if(user.password !== hashedPassword) {
      return {
        success: false,
        error: "Invalid password",
      }
    }

    // Create a session cookie to keep our user id, normally need to be encrypted in JWT
    const cookieStore = await cookies();
    cookieStore.set('user', user.id, {
      httpOnly: true
    });

    return {
      success: true,
      user,
    };
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    console.error("Error registering user:", error);
    return {
      success: false,
      error: error.message || "An error occurred during registration",
    };
  }
}
