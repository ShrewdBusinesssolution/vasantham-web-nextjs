const HeadingSection = ({ title = "Why choose us", subtitle= "Why choose our courses?"}) => {
    return (
       <div className="flex flex-col justify-center items-center py-6 md:py-10 gap-2 md:gap-3">
        <h4 className="uppercase text-sm text-[#20AD96]">{title}</h4>
        <p className="font-bold text-[22px] md:text-[32px] text-center">{subtitle}</p>
       </div>
    )
}

export { HeadingSection }