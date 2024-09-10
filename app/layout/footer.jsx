import Image from "next/image";
import { WHITELOGOPATH } from "../utility/constant";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Footer() {
  const socialLink = [
    {
      icon: "linkedin.svg",
      link: "https://www.linkedin.com/your-profile"
    },
    {
      icon: "instagram.svg",
      link: "https://www.instagram.com/your-profile"
    },
    {
      icon: "facebook.svg",
      link: "https://www.facebook.com/your-profile"
    },
    {
      icon: "x.svg",
      link: "https://x.com/your-profile" // X is the new name for Twitter
    }
  ];
  return (
    <footer className="bg-[#2F2F2F]">

      <div className="brand-container py-10 flex justify-between flex-wrap gap-5">
        <div className="space-y-4">
          <Image src={WHITELOGOPATH} width={200} height={100} className="w-[200px] h-auto" alt="logo" />
          <p className="text-white font-light lg:w-[450px] xl:w-[450px]">
            Veniam Sequi molestias aut necessitatibus optio magni at
            natus accusamus.Lorem ipsum dolor sit amet,
            consectetur adipisicin gelit, sed do eiusmod tempor
            incididunt .
          </p>
        </div>
        <ul className="flex flex-col gap-3 text-white">
          <li><p className="text-white font-bold text-lg md:text-lg xl:text-xl mb-3">Explore</p></li>
          <li>
            <Link className="font-light  text-sm md:text-[15px] lg:text-[15px] xl:text-[15px]" href={'/about'}>
              About
            </Link>
          </li>
          <li>
            <Link className="font-light  text-sm md:text-[15px] lg:text-[15px] xl:text-[15px]" href={'/contact'}>
              contact
            </Link>
          </li>
        </ul>
        <ul className="flex flex-col gap-3 text-white">
          <li><p className="text-white font-bold text-lg md:text-lg xl:text-xl mb-3">Courses</p></li>
          <li>
            <Link className="font-light text-sm md:text-[15px] lg:text-[15px] xl:text-[15px]" href={'/seo'}>
            SEO Business
            </Link>
          </li>
          <li>
            <Link className="font-light text-sm md:text-[15px] lg:text-[15px] xl:text-[15px]" href={'/digital-marketing'}>
            Digital Marketing
            </Link>
          </li>
          <li>
            <Link className="font-light text-sm md:text-[15px] lg:text-[15px] xl:text-[15px]" href={'/site-development'}>
            Site Development
            </Link>
          </li>
          <li>
            <Link className="font-light text-sm md:text-[15px] lg:text-[15px] xl:text-[15px]" href={'/social-marketing'}>
            Social Marketing
            </Link>
          </li>
          <li>
            <Link className="font-light text-sm md:text-[15px] lg:text-[15px] xl:text-[15px] underline text-[#07A889]" href={'/cources'}>
            View All
            </Link>
          </li>
        </ul>
        <ul className="flex flex-col gap-3 text-white">
          <li><p className="text-white font-bold text-lg md:text-lg xl:text-xl mb-3">Legal</p></li>
          <li>
            <Link className="font-light text-sm md:text-[15px] lg:text-[15px] xl:text-[15px]" href={'/terms-and-conditions'}>
              Terms & Condition
            </Link>
          </li>
          <li>
            <Link className="font-light text-sm md:text-[15px] lg:text-[15px] xl:text-[15px]" href={'/privacy-policy'}>
              Privacy policy
            </Link>
          </li>
          <li>
            <Link className="font-light text-sm md:text-[15px] lg:text-[15px] xl:text-[15px]" href={'/return-policy'}>
            Return policy
            </Link>
          </li>
        </ul>
      </div>

      <Separator className=" bg-white/40" />

      <div className="brand-container flex justify-between items-center flex-wrap gap-5 py-3">

        <p className="text-white text-sm">&copy; Copyright 2024 Vasantham E- Learning All rights reserved.</p>
        <div className="flex items-center gap-3">
          {
            socialLink.map((item, index) => (
              <Link key={index} href={item.link} target='_blank'>
                <Image src={`/assets/svg/${item.icon}`} width={32} height={32} alt={item.icon} ></Image>
              </Link>
            ))
          }
        </div>
      </div>


    </footer>
  )
}
