import BasicService from "../../services/api-services/basic-service";
import { handlePageError } from "../../utility/errorHandler";

const Terms = async () => {
    try {
        const data = (await BasicService.TermsCondition());
        return (
            <div className="brand-container py-10 space-y-3">
                <Heading>
                    Terms and Conditions
                </Heading>
                <Paragraph>
                    Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern Compamy Name relationship with you in relation to this website.
                </Paragraph>
                <SubHeading>
                    The use of this website is subject to the following terms of use:
                </SubHeading>
                <Paragraph>
                    The content of the pages of this website is for your general information and use only. It is subject to change without notice.
                </Paragraph>
            </div>
        );
    } catch (error) {
        const errorMessage = await handlePageError(error);
        return (
            <>
                {errorMessage}
            </>
        )

    }
};

export default Terms;


const Heading = ({ children }) => {
    return (
        <h3>
            {children}
        </h3>
    )
}

const SubHeading = ({ children }) => {
    return (
        <h5>
            {children}
        </h5>
    )
}

const Paragraph = ({ children }) => {
    return (
        <p>
            {children}
        </p>
    )
}