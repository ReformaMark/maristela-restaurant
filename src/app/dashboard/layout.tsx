import localFont from "next/font/local";

const geistSans = localFont({
    src: "../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "../fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            {children}
        </div>
    )
}

export default DashboardLayout;