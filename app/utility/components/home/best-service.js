import React from "react";

const servicesData = [
  {
    title: "Instructors",
    value: "90",
    description: "Tempus imperdiet nulla malpellen tesque",
  },
  {
    title: "Total Courses",
    value: "1392",
    description: "Tempus imperdiet nulla malpellen tesque",
  },
  {
    title: "Registered Enrolls",
    value: "5469",
    description: "Tempus imperdiet nulla malpellen tesque",
  },
  {
    title: "Satisfaction rate",
    value: "96",
    description: "Tempus imperdiet nulla malpellen tesque",
  },
];

const ServiceCard = ({ title, value, description }) => (
  <div className="relative bg-white flex flex-col gap-5 p-3 rounded-xl hover:bg-gradient-to-br from-white to-blue-100 from-20% transition-all duration-300">
    <h3 className="text-[16px] font-bold text-[#222]">{title}</h3>
    <h2 className="text-primary">{value}</h2>
    <p className="text-[15px] text-[#535967]">{description}</p>
  </div>
);

const BestService = () => {
  return (
    <main>
      <div className="flex flex-col space-y-4">
        <h4 className="text-[#20ad96] text-[14px] font-semibold uppercase mt-5 md:mt-10">
          Our Best Service
        </h4>
        <p className="text-2xl md:text-[32px] lg:text-[36px] font-bold md:leading-10 w-full  text-[#222]">
          We break down barriers so teams can focus on what matters – learning
          together to create an online career you love.
        </p>
      </div>
      {/* Cards */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-10 py-10 justify-between">
        {servicesData.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            value={service.value}
            description={service.description}
          />
        ))}
      </div>
    </main>
  );
};

export default BestService;
