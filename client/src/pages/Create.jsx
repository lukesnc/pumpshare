
const Create = () => {

   

      
    return <section className="create-section">
      
            
            <h1>Log Exercise</h1>

            
            <form className="create-form">
                <label htmlFor="date">Date</label>
                <input type="date" name="date" id="date" className="createInput createTextInput"/>

                <label htmlFor="sets">Sets</label>
                <input type="text" name="sets" id="sets" className="createInput createTextInput"/>

                <label htmlFor="reps">Reps</label>
                <input type="text" name="reps" id="reps" className="createInput createTextInput"/>

                <label htmlFor="weight">Weight</label>
                <input type="text" name="weight" id="weight" className="createInput createTextInput"/>

                <label htmlFor="about">About</label>
                <textarea name="about" id="about" cols="30" rows="6" className="createInput"></textarea>

                <button type="submit" className="create-btn">Submit</button>
            </form>
          </section>
    
}

export default Create;