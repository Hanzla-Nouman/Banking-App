"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../server/appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";
import { CountryCode, Products } from "plaid";
import { plaidClient } from "../plaid";

export const signIn = async ({email,password}:signInProps) => {
  try {
    const { account } = await createAdminClient();
    const response = await account.createEmailPasswordSession(email, password);
return parseStringify(response)
  } catch (error) {
    console.log("Error in Signin", error);
  }
};

export const signUp = async (userData: SignUpParams) => {
  const { email, password, firstName, lastName } = userData;
  try {
    const { account } = await createAdminClient();
    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );
    const session = await account.createEmailPasswordSession(email, password);
    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    return parseStringify(newUserAccount);
  } catch (error) {
    console.log("Error in Signup", error);
  }
};

export async function getLoggedInUser() {
  try {
    console.log("1")
    const { account } = await createSessionClient();
    console.log("2")
    const user = await account.get();
    console.log("3")
    return parseStringify(user);
  } catch (error) {
    console.log("Error in getting login user", error);

    return null;
  }
}
export async function logoutAccount() {
  try {
    const { account } = await createSessionClient();
    cookies().delete('appwrite-session')
    await account.deleteSession('current')
  } catch (error) {
    return null;
  }
}
export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id
      },
      client_name: `${user.firstName} ${user.lastName}`,
      products: ['auth'] as Products[],
      language: 'en',
      country_codes: ['US'] as CountryCode[],
    }

    const response = await plaidClient.linkTokenCreate(tokenParams);

    return parseStringify({ linkToken: response.data.link_token })
  } catch (error) {
    console.log(error);
  }
}