import Link from "next/link";

const buildVersion = process.env.BUILD_VERSION
const copyrightYear = process.env.COPYRIGHT_YEAR
const companyName = process.env.COMPANY_NAME
export default function SignIn() {
    return (
        <div className="w-full max-w-sm mx-auto mt-20">
            <form className="space-y-10">
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl font-black text-yellow-600">Taskx</h1>
                    <p className="font-light">Please sign-in to proceed</p>
                </div>
                <div className="space-y-8">
                    <div className="space-y-4">
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="email" className="text-sm font-semibold text-neutral-500">Email</label>
                            <input id="email" type="email" placeholder="Your registered email address" className="appearance-none outline-none bg-neutral-700 px-4 py-2 rounded-md hover:bg-neutral-800 focus:bg-neutral-800 border border-transparent focus:border-yellow-600 hover:border-yellow-600 focus:ring-2 focus:ring-yellow-600 transition" autoFocus/>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="password" className="text-sm font-semibold text-neutral-500">Password</label>
                            <input id="password" type="password" placeholder="Your password" className="appearance-none outline-none bg-neutral-700 px-4 py-2 rounded-md hover:bg-neutral-800 focus:bg-neutral-800 border border-transparent focus:border-yellow-600 hover:border-yellow-600 focus:ring-2 focus:ring-yellow-600 transition"/>
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