import BasicService from "../services/api-services/basic-service";
import { handlePageError } from "../utility/errorHandler";

const Privacy = async () => {
    try {
        const data = (await BasicService.PrivacyPolicy());
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

export default Privacy;
