'use client'
import Link from "next/link"

// Error boundaries must be Client Components

export default function Error({ error, reset }) {
    return (
        <section className="bg-gray-900 h-[90vh] w-screen flex items-center justify-center">
            <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div class="mx-auto max-w-screen-sm text-center">
                    <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-500">Whoops!</h1>
                    <p class="mb-4 text-3xl tracking-tight font-bold md:text-4xl text-white">Something's went wrong!</p>
                    <p class="mb-4 text-lg font-light text-gray-400">
                        Sorry, we can't find that page. Please contact your <Link className="text-blue-500" href={"https://www.instagram.com/naveednaveedali4483/"}>Admin</Link> for further Queries.
                    </p>
                    <button onClick={() => reset()} class="inline-flex text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-blue-900 my-4">
                        Try Again!
                    </button>
                </div>
            </div>
        </section>
    )
}