import styles from "../style"
import { features } from "../constants"

const Home = () => {
  return (
    <div className="">
      <div className="relative flex flex-col justify-center items-center h-screen overlay">
        <div className="relative z-80">
          <h1 className={`${styles.heading1}`}>experience the best workout tracker.</h1>
          <h4 className="text-center pt-10 font-lato text-secondary font-light">
            YOUR WORKOUTS <br /> 
            YOUR PROGRESS <br /> 
            YOUR TRACKER</h4>
        </div>
      </div>

      <div className="flex flex-col relative items-end m-14"> {/* description */}
        <p className={`${styles.paragraph} items-center`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quaerat vitae facilis non dolor praesentium magnam provident? Suscipit, consequuntur tempore consectetur mollitia cumque eos nobis modi aliquid ratione ipsam voluptas debitis quibusdam perferendis, sed fugit est quod unde ut rerum eius corrupti repudiandae assumenda sit officiis. Deserunt, a! Officia, eius!</p>
        <button className="border border-solid border-1 border-emeraldMist rounded-full text-emeraldMist px-3 py-1 mt-5 focus:outline-none focus:ring-2 focus:ring-emeraldMist transition-colors duration-300">
          Sign-Up
        </button>
      </div>

      <div className="flex flex-col">
        {features.map((feature) => (
          <div key={feature.id} className={`flex-1 bg-${feature.color} pt-40 pb-40`}>
            <h2 className="text-xl font-bold text-center text-white mb-2">{feature.title}</h2>
            <p className="text-center text-white">{feature.content}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col justify-center bg-high-jump h-screen relative ">
        <h1 className="font-poppins font-semibold text-[32px] text-primary w-full text-center text-white">Call to Action</h1>
      </div> 
    </div>
  )
}

export default Home