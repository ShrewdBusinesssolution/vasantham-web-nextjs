import { Heading, Paragraph, ParagraphHeading, SubHeading } from "@/app/utility/components/utility-components";
import { handlePageError } from "@/app/utility/errorHandler";

const Privacy = async () => {

    const privacyPolicySections = [
        "WHAT INFORMATION DO WE COLLECT?",
        "HOW DO WE PROCESS YOUR INFORMATION?",
        "WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?",
        "DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?",
        "HOW DO WE HANDLE YOUR SOCIAL LOGINS?",
        "IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?",
        "HOW LONG DO WE KEEP YOUR INFORMATION?",
        "DO WE COLLECT INFORMATION FROM MINORS?",
        "WHAT ARE YOUR PRIVACY RIGHTS?",
        "CONTROLS FOR DO-NOT-TRACK FEATURES",
        "DO WE MAKE UPDATES TO THIS NOTICE?",
        "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?",
        "HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?"
    ];


    try {
        return (
            <main className="brand-container py-10 max-sm:space-y-3 space-y-8">
                <Heading>
                    PRIVACY NOTICE
                </Heading>
                <strong>Last updated December 17, 2024</strong>
                <Paragraph>
                    This Privacy Notice for __________ (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), describes how and why
                    we might access, collect, store, use, and/or share (&quot;process&quot;) your personal
                    information when you use our services (&quot;Services&quot;), including when you:
                    Questions or concerns? Reading this Privacy Notice will help you understand
                    your privacy rights and choices. We are responsible for making decisions about
                    how your personal information is processed. If you do not agree with our policies
                    and practices, please do not use our Services.
                </Paragraph>
                <SubHeading>
                    SUMMARY OF KEY POINTS
                </SubHeading>
                <Paragraph>
                    This summary provides key points from our Privacy Notice, but you can find
                    out more details about any of these topics by clicking the link following
                    each key point or by using our table of contents below to find the section
                    you are looking for.
                </Paragraph>
                <Paragraph>
                    What personal information do we process? When you visit, use, or navigate
                    our Services, we may process personal information depending on how you
                    interact with us and the Services, the choices you make, and the products and
                    features you use. Learn more about personal information you disclose to us.
                </Paragraph>
                <Paragraph>
                    Do we process any sensitive personal information? Some of the information
                    may be considered &quot;special&quot; or &quot;sensitive&quot; in certain jurisdictions, for example your
                    racial or ethnic origins, sexual orientation, and religious beliefs. We do not process
                    sensitive personal information.
                </Paragraph>
                <Paragraph>
                    Do we collect any information from third parties? We may collect information
                    from public databases, marketing partners, social media platforms, and other
                    outside sources. Learn more about information collected from other sources.
                </Paragraph>
                <Paragraph>
                    How do we process your information? We process your information to provide,
                    improve, and administer our Services, communicate with you, for security and
                    fraud prevention, and to comply with law. We may also process your information
                    for other purposes with your consent. We process your information only when we
                    have a valid legal reason to do so. Learn more about how we process your
                    information.
                </Paragraph>

                <Paragraph>
                    In what situations and with which parties do we share personal information?
                    We may share information in specific situations and with specific third parties.
                    Learn more about when and with whom we share your personal information.
                </Paragraph>
                <Paragraph>
                    What are your rights? Depending on where you are located geographically, the
                    applicable privacy law may mean you have certain rights regarding your personal
                    information. Learn more about your privacy rights.
                </Paragraph>
                <Paragraph>
                    How do you exercise your rights? The easiest way to exercise your rights is by
                    submitting a data subject access request, or by contacting us. We will consider
                    and act upon any request in accordance with applicable data protection laws.
                </Paragraph>
                <Paragraph>
                    Want to learn more about what we do with any information we collect? Review the
                    Privacy Notice in full.
                </Paragraph>

                <SubHeading>
                    TABLE OF CONTENTS
                </SubHeading>

                <ul className="space-y-3">
                    {privacyPolicySections.map((item, index) => (
                        <li key={index}>
                            <p className="text-blue-600 cursor-pointer">{index + 1}. {item}</p>
                        </li>
                    ))}
                </ul>

                <SubHeading>
                    1. WHAT INFORMATION DO WE COLLECT?
                </SubHeading>
                <ParagraphHeading>
                    Personal information you disclose to us
                </ParagraphHeading>

                <Paragraph>
                    In Short: We collect personal information that you provide to us.
                </Paragraph>
                <Paragraph>
                    We collect personal information that you voluntarily provide to us when you
                    register on the Services, express an interest in obtaining information about us or
                    our products and Services, when you participate in activities on the Services, or
                    otherwise when you contact us.
                </Paragraph>
                <Paragraph>
                    Sensitive Information. We do not process sensitive information.
                </Paragraph>
                <Paragraph>
                    All personal information that you provide to us must be true, complete, and
                    accurate, and you must notify us of any changes to such personal information.
                </Paragraph>

                <ParagraphHeading>
                    Information automatically collected
                </ParagraphHeading>
                <Paragraph>
                    In Short: Some information — such as your Internet Protocol (IP) address and/or
                    browser and device characteristics — is collected automatically when you visit our
                    Services.
                </Paragraph>
                <Paragraph>
                    We automatically collect certain information when you visit, use, or navigate the
                    Services. This information does not reveal your specific identity (like your name or
                    contact information) but may include device and usage information, such as your
                    IP address, browser and device characteristics, operating system, language
                    preferences, referring URLs, device name, country, location, information about
                    how and when you use our Services, and other technical information. This
                    information is primarily needed to maintain the security and operation of our
                    Services, and for our internal analytics and reporting purposes.
                </Paragraph>
                <Paragraph>
                    Like many businesses, we also collect information through cookies and similar
                    technologies.
                </Paragraph>
                <SubHeading>
                    2. HOW DO WE PROCESS YOUR INFORMATION?
                </SubHeading>
                <Paragraph>
                    In Short: We process your information to provide, improve, and administer our
                    Services, communicate with you, for security and fraud prevention, and to comply
                    with law. We may also process your information for other purposes with your
                    consent.
                </Paragraph>
                <Paragraph>
                    We process your personal information for a variety of reasons, depending
                    on how you interact with our Services, including:
                </Paragraph>
                <SubHeading>
                    3. WHEN AND WITH WHOM DO WE SHARE YOUR
                    PERSONAL INFORMATION?
                </SubHeading>
                <Paragraph>
                    In Short: We may share information in specific situations described in this section
                    and/or with the following third parties.
                </Paragraph>
                <Paragraph>
                    We may need to share your personal information in the following situations:
                </Paragraph>

                <ul className="ml-10 space-y-3 list-disc">
                    <li>
                        <Paragraph>
                            Business Transfers. We may share or transfer your information in
                            connection with, or during negotiations of, any merger, sale of company
                            assets, financing, or acquisition of all or a portion of our business to another
                            company.
                        </Paragraph>
                    </li>
                    <li>
                        <Paragraph>Affiliates. We may share your information with our affiliates, in which case
                            we will require those affiliates to honor this Privacy Notice. Affiliates include
                            our parent company and any subsidiaries, joint venture partners, or other
                            companies that we control or that are under common control with us.</Paragraph>
                    </li>
                    <li>
                        <Paragraph>
                            Business Partners. We may share your information with our business
                            partners to offer you certain products, services, or promotions.
                        </Paragraph>
                    </li>

                </ul>
                <SubHeading>
                    4. DO WE USE COOKIES AND OTHER TRACKING
                    TECHNOLOGIES?
                </SubHeading>
                <Paragraph>
                    In Short: We may use cookies and other tracking technologies to collect and store
                    your information.
                </Paragraph>
                <Paragraph>
                    We may use cookies and similar tracking technologies (like web beacons and
                    pixels) to gather information when you interact with our Services. Some online
                    tracking technologies help us maintain the security of our Services, prevent
                    crashes, fix bugs, save your preferences, and assist with basic site functions.
                </Paragraph>
                <Paragraph>
                    We also permit third parties and service providers to use online tracking
                    technologies on our Services for analytics and advertising, including to help
                    manage and display advertisements, to tailor advertisements to your interests, or
                    to send abandoned shopping cart reminders (depending on your communication
                    preferences). The third parties and service providers use their technology to
                    provide advertising about products and services tailored to your interests which
                    may appear either on our Services or on other websites.
                </Paragraph>
                <Paragraph>
                    Specific information about how we use such technologies and how you can refuse
                    certain cookies is set out in our Cookie Notice.
                </Paragraph>
                <SubHeading>
                    5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
                </SubHeading>
                <Paragraph>
                    In Short: If you choose to register or log in to our Services using a social media
                    account, we may have access to certain information about you.
                </Paragraph>
                <Paragraph>
                    Our Services offer you the ability to register and log in using your third-party social
                    media account details (like your Facebook or X logins). Where you choose to do
                    this, we will receive certain profile information about you from your social media
                    provider. The profile information we receive may vary depending on the social
                    media provider concerned, but will often include your name, email address, friends
                    list, and profile picture, as well as other information you choose to make public on
                    such a social media platform.
                </Paragraph>
                <Paragraph>
                    We will use the information we receive only for the purposes that are described in
                    this Privacy Notice or that are otherwise made clear to you on the relevant
                    Services. Please note that we do not control, and are not responsible for, other
                    uses of your personal information by your third-party social media provider. We
                    recommend that you review their privacy notice to understand how they collect,
                    use, and share your personal information, and how you can set your privacy
                    preferences on their sites and apps.
                </Paragraph>
                <SubHeading>
                    6. IS YOUR INFORMATION TRANSFERRED
                    INTERNATIONALLY?
                </SubHeading>
                <Paragraph>
                    In Short: We may transfer, store, and process your information in countries other
                    than your own.
                </Paragraph>
                <Paragraph>
                    Our servers are located in. If you are accessing our Services from outside, please
                    be aware that your information may be transferred to, stored by, and processed by
                    us in our facilities and in the facilities of the third parties with whom we may share
                    your personal information (see &quot;WHEN AND WITH WHOM DO WE SHARE
                    YOUR PERSONAL INFORMATION?&quot; above), in and other countries.
                </Paragraph>
                <Paragraph>
                    If you are a resident in the European Economic Area (EEA), United Kingdom (UK),
                    or Switzerland, then these countries may not necessarily have data protection
                    laws or other similar laws as comprehensive as those in your country. However,
                    we will take all necessary measures to protect your personal information in
                    accordance with this Privacy Notice and applicable law.
                </Paragraph>
                <SubHeading>
                    7. HOW LONG DO WE KEEP YOUR INFORMATION?
                </SubHeading>
                <Paragraph>
                    In Short: We keep your information for as long as necessary to fulfill the purposes
                    outlined in this Privacy Notice unless otherwise required by law.
                </Paragraph>
                <Paragraph>
                    We will only keep your personal information for as long as it is necessary for the
                    purposes set out in this Privacy Notice, unless a longer retention period is required
                    or permitted by law (such as tax, accounting, or other legal requirements).
                </Paragraph>
                <Paragraph>
                    When we have no ongoing legitimate business need to process your personal
                    information, we will either delete or anonymize such information, or, if this is not
                    possible (for example, because your personal information has been stored in
                    backup archives), then we will securely store your personal information and isolate
                    it from any further processing until deletion is possible.
                </Paragraph>
                <SubHeading>
                    8. DO WE COLLECT INFORMATION FROM MINORS?
                </SubHeading>
                <Paragraph>
                    In Short: We do not knowingly collect data from or market to children under 18
                    years of age.
                </Paragraph>
                <Paragraph>
                    We do not knowingly collect, solicit data from, or market to children under 18 years
                    of age, nor do we knowingly sell such personal information. By using the Services,
                    you represent that you are at least 18 or that you are the parent or guardian of
                    such a minor and consent to such minor dependent’s use of the Services. If we
                    learn that personal information from users less than 18 years of age has been
                    collected, we will deactivate the account and take reasonable measures to
                    promptly delete such data from our records. If you become aware of any data we
                    may have collected from children under age 18, please contact us at __________
                    .
                </Paragraph>
                <SubHeading>
                    9. WHAT ARE YOUR PRIVACY RIGHTS?
                </SubHeading>
                <Paragraph>
                    In Short: You may review, change, or terminate your account at any time,
                    depending on your country, province, or state of residence.
                </Paragraph>
                <Paragraph>Withdrawing your consent: If we are relying on your consent to process your
                    personal information, which may be express and/or implied consent depending on
                    the applicable law, you have the right to withdraw your consent at any time. You
                    can withdraw your consent at any time by contacting us by using the contact
                    details provided in the section &quot;HOW CAN YOU CONTACT US ABOUT THIS
                    NOTICE?&quot; below.</Paragraph>
                <Paragraph>However, please note that this will not affect the lawfulness of the processing
                    before its withdrawal nor, when applicable law allows, will it affect the processing
                    of your personal information conducted in reliance on lawful processing grounds
                    other than consent.</Paragraph>
                <ParagraphHeading>
                    Account Information
                </ParagraphHeading>
                <Paragraph>
                    If you would at any time like to review or change the information in your account or
                    terminate your account, you can:
                    Upon your request to terminate your account, we will deactivate or delete your
                    account and information from our active databases. However, we may retain some
                    information in our files to prevent fraud, troubleshoot problems, assist with any
                    investigations, enforce our legal terms and/or comply with applicable legal
                    requirements.
                </Paragraph>
                <SubHeading>
                    10. CONTROLS FOR DO-NOT-TRACK FEATURES
                </SubHeading>
                <Paragraph>
                    Most web browsers and some mobile operating systems and mobile applications
                    include a Do-Not-Track (&quot;DNT&quot;) feature or setting you can activate to signal your
                    privacy preference not to have data about your online browsing activities
                    monitored and collected. At this stage, no uniform technology standard for
                    recognizing and implementing DNT signals has been finalized. As such, we do not
                    currently respond to DNT browser signals or any other mechanism that
                    automatically communicates your choice not to be tracked online. If a standard for
                    online tracking is adopted that we must follow in the future, we will inform you
                    about that practice in a revised version of this Privacy Notice.
                </Paragraph>
                <SubHeading>
                    11. DO WE MAKE UPDATES TO THIS NOTICE?
                </SubHeading>
                <Paragraph>
                    In Short: Yes, we will update this notice as necessary to stay compliant with
                    relevant laws.
                </Paragraph>
                <Paragraph>
                    We may update this Privacy Notice from time to time. The updated version will be
                    indicated by an updated &quot;Revised&quot; date at the top of this Privacy Notice. If we
                    make material changes to this Privacy Notice, we may notify you either by
                    prominently posting a notice of such changes or by directly sending you a
                    notification. We encourage you to review this Privacy Notice frequently to be
                    informed of how we are protecting your information.
                </Paragraph>
                <SubHeading>
                    12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                </SubHeading>
                <Paragraph>
                    If you have questions or comments about this notice, you may contact us by post
                    at:
                </Paragraph>

                <SubHeading>
                    13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE
                    DATA WE COLLECT FROM YOU?
                </SubHeading>
                <Paragraph>
                    Based on the applicable laws of your country, you may have the right to request
                    access to the personal information we collect from you, details about how we have
                    processed it, correct inaccuracies, or delete your personal information. You may
                    also have the right to withdraw your consent to our processing of your personal
                    information. These rights may be limited in some circumstances by applicable law.
                    To request to review, update, or delete your personal information, please fill out
                    and submit a data subject access request.
                </Paragraph>





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

export default Privacy;

