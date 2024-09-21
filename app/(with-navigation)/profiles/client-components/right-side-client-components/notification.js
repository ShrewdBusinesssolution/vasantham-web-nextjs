import React from "react";
import Image from "next/image";

const Notification = () => {
  return (
    <main>
      <div className="flex flex-col gap-5">
        {/* card 1 */}
      <div className="flex bg-[#f7f7f7]/80 p-5 gap-5 rounded-lg">
        <div>
        <p className="rounded-full bg-white border p-2">
          <Image
            src="/assets/profile/icon.webp"
            classname=""
            alt="icon"
            width={25}
            height={25}
          />
        </p></div>
        <div className="flex flex-col gap-2">
          <h5 className="font-medium text-[17px]">Course Purchased Successfully! </h5>
          <p className="text-[16px] text-[#737373]">Once you logout, the features for you will not available.</p>
          <p className="font-medium text-[17px]">2 days ago</p>
        </div>
      </div>
        {/* card 2 */}
        <div className="flex bg-[#f7f7f7]/80 p-5 gap-5 rounded-lg">
        <div>
        <p className="rounded-full bg-white border p-2">
          <Image
            src="/assets/profile/icon.webp"
            classname=""
            alt="icon"
            width={25}
            height={25}
          />
        </p></div>
        <div className="flex flex-col gap-2">
          <h5 className="font-medium text-[17px]">Settings Updated</h5>
          <p className="text-[16px] text-[#737373]">Once you logout, the features for you will not available.</p>
          <p className="font-medium text-[17px]">2 days ago</p>
        </div>
      </div>
      </div>
    </main>
  );
};

export default Notification;
