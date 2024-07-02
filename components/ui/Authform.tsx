"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authFormSchema } from "@/lib/utils";
import CustomInput from "./CustomInput";
import { Loader2 } from "lucide-react";

// Define the form schema using Zod

const Authform = ({ type }: { type: string }) => {

  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
    },
  });

  // Handle form submission
  function onSubmit(values: z.infer<typeof authFormSchema>) {
    setLoading(true)
    console.log(values);
    setLoading(false)
  }

 

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href={"/"} className="cursor-pointer flex items-center gap-1">
          <Image src={"/icons/logo.svg"} width={34} height={34} alt="Logo" />
          <h1 className="text-26 font-ibm-plex-serif text-black-1 font-bold">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link your account to get started"
              : "Please Enter your details"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">PLAID LINK</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {type === 'sign-up' && (
                    <>
                <CustomInput control={form.control} name="firstName" placeholder="ex: John " label="First Name"/>
                <CustomInput control={form.control} name="lastName" placeholder="ex: Doe" label="Last Name"/>
                <CustomInput control={form.control} name="address" placeholder="Enter your specific address" label="Address"/>
                <CustomInput control={form.control} name="state" placeholder="ex: NY" label="State"/>
                <CustomInput control={form.control} name="postalCode" placeholder="ex: 11011" label="Postal Code"/>
                <CustomInput control={form.control} name="dob" placeholder="yyyy-mm-dd" label="Date of Birth"/>
                <CustomInput control={form.control} name="ssn" placeholder="ex: 1234" label="SSN"/>
                    
                    </>
                )}
                <CustomInput control={form.control} name="email" placeholder="johndoe@gmail.com" label="Email"/>
                <CustomInput control={form.control} name="password" placeholder="Enter Password" label="Password"/>
              <div className="flex flex-col gap-4">
              <Button type="submit" className="form-btn" disabled={loading}>
                {loading?(<><Loader2 size={20} className="animate-spin"/> &nbsp; Loading...</>):(type === "sign-in"? "Sign In":"Sign Up")}
              </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
                {type === 'sign-in' ? "Don't have any account?":"Already have an account "}
            </p>
            <Link href={type === 'sign-in'?'/sign-up':'/sign-in'} className="form-link">
             {type === 'sign-in' ? 'Sign up' : 'Sign in'}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default Authform;
