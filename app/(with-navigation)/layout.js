import { getServerSession } from "next-auth";
import Footer from "../layout/footer";
import Header from "../layout/header";


export default async function Layout({ children }) {
    const session = await getServerSession()

    return (
        <>
            <Header isLoggedin={session ? true : false} />
            {children}
            <Footer />
        </>

    )
}
