import { handlePageError } from "@/app/utility/errorHandler";
import TestClientComponent from "./component/test-client-component";
import TestService from "@/app/services/api-services/test-service";


const Test = async ({ params }) => {
  try {
    const Response = (await TestService.GetQuestions({
      lecture_id: params.id
    })).data;
    return (
      <main className="bg-[#fcfcfc]">
        <div className="brand-container px-5 py-10">
          <h3 className="text-[24px]">{Response?.lecture_name}</h3>
          <TestClientComponent lectureId={params.id} questions={Response?.list} />
        </div>
      </main>
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

export default Test;
