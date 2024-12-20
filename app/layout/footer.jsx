"use client"
import Image from "next/image";
import { WHITELOGOPATH } from "../utility/constant";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React, { useContext } from "react";
import { AppContext } from "../utility/context/context-api";
import { TruncateText } from "../utility/helper";


export default function Footer() {
  const { companyInfo } = useContext(AppContext)


  const socialLink = [
    {
      icon: "linkedin.svg",
      link: companyInfo?.social_media?.linkedin_link ?? '/'
    },
    {
      icon: "instagram.svg",
      link: companyInfo?.social_media?.instagram_link ?? '/'
    },
    {
      icon: "facebook.svg",
      link: companyInfo?.social_media?.facebook_link ?? '/'
    },
    {
      icon: "x.svg",
      link: companyInfo?.social_media?.twitter_link ?? '/'
    }
  ];


  return (
    <footer className="bg-[#2F2F2F]">
      <div className="brand-container py-10 flex justify-between flex-wrap gap-5">
        <div className="">
          <Image src={WHITELOGOPATH} width={200} height={100} className="w-[300px] h-auto" alt="logo" />
          {/* <p className="text-white font-light lg:w-[450px] xl:w-[450px]">
            Veniam Sequi molestias aut necessitatibus optio magni at
            natus accusamus.Lorem ipsum dolor sit amet,
            consectetur adipisicin gelit, sed do eiusmod tempor
            incididunt .
          </p> */}
        </div>
        <ul className="flex flex-col gap-3 text-white">
          <li><p className="text-white font-bold text-lg md:text-lg xl:text-xl mb-3">Explore</p></li>
          <li><Link href={'/about'}>About</Link></li>
          <li><Link href={'/contact'}>Contact</Link></li>
        </ul>
        <ul className="flex flex-col gap-3 text-white">
          <li><p className="text-white font-bold text-lg md:text-lg xl:text-xl mb-3">Courses</p></li>
          {companyInfo?.course?.map((item,index)=>(
          <li key={index}><Link href={`/course-detail/${item.slug}`}>{TruncateText(item.name, 20)}</Link></li>
          ))}
          <li><Link href={'/courses'} className="underline text-[#07A889]">View All</Link></li>
        </ul>
        <ul className="flex flex-col gap-3 text-white">
          <li><p className="text-white font-bold text-lg md:text-lg xl:text-xl mb-3">Legal</p></li>
          <li><Link href={'/terms-and-conditions'} scroll={false}>Terms & Condition</Link></li>
          <li><Link href={'/privacy-policy'}>Privacy Policy</Link></li>
        </ul>
      </div>

      <Separator className="bg-white/40" />

      <div className="brand-container flex justify-between items-center flex-wrap gap-5 py-3">
        <p className="text-white text-sm">&copy; Copyright 2024 Vasantham E-Learning. All rights reserved.</p>
        <p className="text-white text-sm">Developed and Maintained by Shrewd Business Solutions.</p>

        <div className="flex items-center gap-3">
          {socialLink.length > 0 ? (
            socialLink.map((item, index) => (
              <Link key={index} href={item.link} target="_blank">
                <Image src={`/assets/svg/${item.icon}`} width={32} height={32} alt={item.icon} />
              </Link>
            ))
          ) : (
            <p className="text-white">Follow us on social media!</p>
          )}
        </div>
      </div>

      <div className="w-fit h-fit fixed z-50 bottom-5 right-5">
        <Link href="https://wa.me/1234567890" target="_blank" >
          <Image src={`/assets/svg/whatsapp.svg`} width={32} height={32} alt={"whatsapp"} />

        </Link>
      </div>
    </footer>

  )
}
