import BasicService from "../services/api-services/basic-service";
import { handlePageError } from "../utility/errorHandler";

const Terms = async () => {
    try {
        const data = (await BasicService.TermsCondition());
        return (
            <div className='brand-container py-10'>
                <div className="w-full" dangerouslySetInnerHTML={{ __html: data.content }} />
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
