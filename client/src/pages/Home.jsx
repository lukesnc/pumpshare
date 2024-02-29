import styles from "../style"
import { features } from "../constants"
import logo from "/images/logo-primary.png"

const Home = () => {
  return (
    <div className="">
      <div className="relative flex flex-col justify-center items-center h-screen overlay">
        <div className="relative z-80">
          <h1 className={`${styles.heading1}`}>experience the best workout tracker.</h1>
          <h4 className="text-center pt-10 font-lato text-secondary font-light text-[18px]">
            YOUR WORKOUTS <br /> 
            YOUR PROGRESS <br /> 
            YOUR TRACKER</h4>
        </div>
      </div>

      <img src={logo} alt="Your image" className="absolute top-50 right-[160px] transform translate-x-1/2 translate-y-[-20px] w-80" />

      <div className="flex flex-col relative items-end m-10 pt-10"> {/* description */}
        <p className={`${styles.paragraph} items-center`}>Embark on a transformative fitness journey with PumpShare, our cutting-edge workout tracker. Beyond the ordinary, this sophisticated tool offers an insightful and user-friendly platform to monitor your progress, set achievable goals, and celebrate achievements. Say goodbye to guesswork and hello to precision as PumpShare provides real-time data and personalized insights, empowering you to optimize performance and embrace holistic well-being. <br /> <br /> Regular exercise catalyzes mental clarity, boosts energy levels, and fortifies the immune system. With PumpShare, you're not just tracking workouts; you're unlocking the door to a vibrant and fulfilling life. Download our app today and make every workout count. The journey to a healthier you starts here.</p>
        <button className="border border-solid border-1 border-emeraldMist rounded-full text-emeraldMist px-6 py-2 mt-5 focus:outline-none focus:ring-2 focus:ring-emeraldMist transition-colors duration-300">
          Sign-Up <i class="fa-solid fa-chevron-right fa-sm ml-2"></i>
        </button>
      </div>

      <div className="flex flex-col">
        {features.map((feature) => (
          <div key={feature.id} className={`flex-1 bg-${feature.color} pt-40 pb-40 px-8`}>
            <h2 className="text-xl font-semibold text-center text-white mb-2 uppercase tracking-custom">{feature.title}</h2>
            <p className="text-center text-white font-thin font-merriweather">{feature.content}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col justify-center bg-high-jump h-screen relative ">
        <h1 className="font-poppins font-semibold text-[32px] text-primary w-full text-center text-white mt-[550px]">Call to Action</h1>
      </div> 
    </div>
  )
}

export default Home