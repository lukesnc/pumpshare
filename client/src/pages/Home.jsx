const Home = () => {
  return (
    <div className="home">
      <div className=""> {/* main section */}
        <h1>logo</h1>
        <h4>heading</h4>
      </div>

      <div className=""> {/* description */}
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quaerat vitae facilis non dolor praesentium magnam provident? Suscipit, consequuntur tempore consectetur mollitia cumque eos nobis modi aliquid ratione ipsam voluptas debitis quibusdam perferendis, sed fugit est quod unde ut rerum eius corrupti repudiandae assumenda sit officiis. Deserunt, a! Officia, eius!</p>
        <button>Learn More</button>
      </div>

      <div className=""> {/* images section */}
      {/* image containers (3) */}
        <div className=""> 
          <img src="../../public/images/high-jump-outside.jpg" alt="image" />
        </div>
        <div className="">
          <img src="../../public/images/bw-wave-ropes.jpg" alt="image" />
        </div>
        <div className=""> 
          <img src="../../public/images/girl-with-kettlebell.jpg" alt="image" />
        </div>
      </div>

      <div className="">
        <h3>Call to Action</h3>
        <button>Get Started</button>
      </div> 
    </div>
  )
}

export default Home