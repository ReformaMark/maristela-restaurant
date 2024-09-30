import { ConvexClientProvider } from "@/components/convex-client-provider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
// import localFont from "next/font/local";

import "@/lib/globals.css";

// const geistSans = localFont({
//     src: "../fonts/GeistVF.woff",
//     variable: "--font-geist-sans",
//     weight: "100 900",
// });
// const geistMono = localFont({
//     src: "../fonts/GeistMonoVF.woff",
//     variable: "--font-geist-mono",
//     weight: "100 900",
// });

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ConvexAuthNextjsServerProvider>
            <html lang="en">
                <body
                    className={''}
                >
                    <ConvexClientProvider>
                        {children}
                    </ConvexClientProvider>
                </body>
            </html>
        </ConvexAuthNextjsServerProvider>
    )
}

export default DashboardLayout;