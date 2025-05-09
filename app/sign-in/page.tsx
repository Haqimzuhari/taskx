"use client"
import Link from "next/link";
import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { BUILD_VERSION, COMPANY_NAME, COPYRIGHT_YEAR } from "@/lib/constants";

const buildVersion = BUILD_VERSION
const copyrightYear = COPYRIGHT_YEAR
const companyName = COMPANY_NAME

export default function SignIn() {
    const router = useRouter()

    const [auth_data, set_auth_data] = useState({email: '', password: ''})
    const [error, set_error] = useState('')
    // const [auth_verify, set_auth_verify] = useState(true)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        set_auth_data(prev => ({...prev, [name]: value}))
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        set_error('');
        const { email, password } = auth_data
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) return set_error(error.message);
        router.push('/');
    }

    return (
        <div className="w-full max-w-sm mx-auto mt-20">
            <form className="space-y-10" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl font-black text-yellow-600">Taskx</h1>
                    <p className="font-light">Please sign-in to proceed</p>
                </div>
                { error && <p style={{ color: 'red' }}>{error}</p> }
                <div className="space-y-8">
                    <div className="space-y-4">
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="email" className="text-sm font-semibold text-neutral-500">Email</label>
                            <input id="email" type="email" placeholder="Your registered email address" onChange={handleChange} className="appearance-none outline-none bg-neutral-700 px-4 py-2 rounded-md hover:bg-neutral-800 focus:bg-neutral-800 border border-transparent focus:border-yellow-600 hover:border-yellow-600 focus:ring-2 focus:ring-yellow-600 transition"/>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="password" className="text-sm font-semibold text-neutral-500">Password</label>
                            <input id="password" type="password" placeholder="Your password" onChange={handleChange} className="appearance-none outline-none bg-neutral-700 px-4 py-2 rounded-md hover:bg-neutral-800 focus:bg-neutral-800 border border-transparent focus:border-yellow-600 hover:border-yellow-600 focus:ring-2 focus:ring-yellow-600 transition"/>
                        </div>
                    </div>
                    <div>
                        <button type="submit" name="sign-in-submit" className="appearance-none outline-none block w-full px-4 py-2 rounded-md bg-yellow-600 text-neutral-800 cursor-pointer font-semibold hover:bg-yellow-500 transition focus:ring-2 focus:ring-yellow-500">Proceed</button>
                    </div>
                </div>
                <div>
                    <p className="text-center text-sm">New user? <Link href={'sign-up'} id="route-to-sign-up-link" className="text-yellow-600 hover:text-yellow-500 transition cursor-pointer underline underline-offset-2 decoration-2">Create account</Link></p>
                </div>
                <div className="text-sm text-neutral-600 text-center">
                    <p>All rights reserved &copy; {copyrightYear} by {companyName}</p>
                    <p>Build {buildVersion}</p>
                </div>
            </form>
        </div>
    )
}