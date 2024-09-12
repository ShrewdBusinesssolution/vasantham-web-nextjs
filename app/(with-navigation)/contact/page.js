import React from 'react'
import ContactForm from '../../form-components/contact-form'

const Contact = () => {
  return (
    <div className="px-[2rem] md:px-[6rem] lg:px-[20rem] bg-[#FCFCFC] py-10">
    <div className="brand-container text-center bg-gradient-to-br from-[#fff] to-[#CCF4FF] from-0% rounded-2xl py-5">
        <h6 className="text-primary uppercase text-sm">contact us</h6>
        <h4 className="mt-5 md:mt-10 text-[#222222] text-[26px] md:text-[32px]">Get In Touch</h4>
        <div className="mt-3 mx-auto w-full lg:w-[650px]">
            <p className="text-sm md:text-[16px] text-center">Have a question or feedback? We are here to help you. Send us a message and get a response within 24 hours.</p>
        </div>
        <div className="lg:px-20 py-5 mt-5">
        <ContactForm/>
        </div>
    </div>
   
</div>

  )
}

export default Contact