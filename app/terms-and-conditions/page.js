import { redirect } from "next/navigation";
// import fetcher from "../services/api-services/fetch-api-service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export const metadata = {
    title: "Terms and Conditions",
    description: "Review the terms and conditions for using Wood Freaks' website and purchasing our wood-based products."
}



export default async function Terms() {

    try {
        const response = await fetcher('/api/company/terms-and-conditions')
        const innerHtml = { __html: `${response.data.content}` };
        return (
            <div className='brand-container py-10'>
                <div className="ignore-tailwind" dangerouslySetInnerHTML={innerHtml}></div>
            </div>
        );
    } catch (error) {
        if (error?.status == 503) {
            redirect('/maintenance')
        }
        if (error?.status == 401) {
            const session = await getServerSession(authOptions);
            if (session) {
                signOut({ callbackUrl: '/' })
            }

        }

        return (
            <div className='brand-container py-10'>
                <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
                {/* <p>Error fetching Terms and Conditions. Please try again later.</p> */}
                
                <ul><li>Personal Information: Name, email address, phone number, and any other information you provide.</li>
<li>Usage Data: Information about how you use our website, including your IP address, browser type, and access times.</li>
<li>Cookies: We use cookies to enhance your experience. You can manage cookie preferences through your browser settings.</li>
</ul>
            </div>
        );
    }
}
