import React from "react";

const BestService = () => {
  return (
    <main>
    <div className="flex flex-col space-y-4">
      <h4 className="text-[#20ad96] text-[14px] font-semibold uppercase mt-5 md:mt-10">Our Best Service</h4>
      <p className="text-2xl md:text-[32px] lg:text-[36px] font-bold md:leading-10 w-full lg:w-[1000px] text-[#222]">We break down barriers so teams can focus on what matters
      – learning together to create online career you love.</p>
    </div>
{/* Cards */}
<div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-10 py-10">
<div className="bg-white flex flex-col gap-5 p-3 rounded-xl">
    <h3 className="text-[16px] font-bold text-[#222]">Instructors</h3>
    <h2 className="text-primary">90</h2>
    <p className="text-[15px] text-[#535967]">Tempus imperdiet nulla malpellen tesque</p>
</div>
<div className="bg-white flex flex-col gap-5 p-3 rounded-xl">
    <h3 className="text-[16px] font-bold text-[#222]">Total Courses</h3>
    <h2 className="text-primary">1392</h2>
    <p className="text-[15px] text-[#535967]">Tempus imperdiet nulla malpellen tesque</p>
</div>
<div className="bg-white flex flex-col gap-5 p-3 rounded-xl">
    <h3 className="text-[16px] font-bold text-[#222]">Registered Enrolls</h3>
    <h2 className="text-primary">5469</h2>
    <p className="text-[15px] text-[#535967]">Tempus imperdiet nulla malpellen tesque</p>
</div>
<div className="bg-white flex flex-col gap-5 p-3 rounded-xl">
    <h3 className="text-[16px] font-bold text-[#222]">Satisfaction rate</h3>
    <h2 className="text-primary">96</h2>
    <p className="text-[15px] text-[#535967]">Tempus imperdiet nulla malpellen tesque</p>
</div>

</div>


    </main>
  );
};

export default BestService;
