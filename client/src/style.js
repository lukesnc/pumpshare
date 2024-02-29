// Description: Contains styles that are used throughout the application. This is a good place to store styles that are used in multiple components.

const styles = {
    heading1: "font-poppins font-semibold text-[32px] text-primary leading-[48px] w-full text-center",
    paragraph: "font-merriweather font-normal text-primary text-[18px] leading-[30.8px]",
    flexCenter: "flex justify-center items-center",
    flexStart: "flex justify-center items-start",
    paddingX: "sm:px-16 px-6",
    paddingY: "sm:py-16 py-6",
    padding: "sm:px-16 px-6 sm:py-12 py-4",
    marginX: "sm:mx-16 mx-6",
    marginY: "sm:my-16 my-6",
    };

export const layout = {
    section: `flex md:flex-row flex-col ${styles.paddingY}`,
    sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,
    sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
    sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,
    sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
};

export default styles;