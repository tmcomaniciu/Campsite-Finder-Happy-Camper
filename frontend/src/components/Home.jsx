import { useState, useEffect } from 'react';
import '../home.css'

const Home = () => {
    const [isEvening, setIsEvening] = useState(false);

    useEffect(() => {
        const updateStylesBasedOnTime = () => {
            const now = new Date();
            const currentHour = now.getHours();

            // Change styles at 6:00 PM (18:00)
            setIsEvening(currentHour >= 18);
            //console.log(currentHour);
            // console.log(isEvening);
        };

        const intervalId = setInterval(updateStylesBasedOnTime, 1000 * 60); // Check every minute

        // Initial check
        updateStylesBasedOnTime();

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);

    return (
        <div className={isEvening ? 'evening' : 'homepage'}>
            <div  >
                <h2 className="text-5xl text-white font-bold tracking-tight">
                    Life is Best when you are Camping!
                </h2>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <h2 className="text-8xl text-white font-bold tracking-tight">
                    Making 
                </h2>
                <h2 className="text-8xl text-white font-bold tracking-tight">
                    memories
                </h2>
                <h2 className="text-8xl text-white font-bold tracking-tight">
                    one campsite
                </h2>
                <h2 className="text-8xl text-white font-bold tracking-tight">
                    at a time
                </h2>
            </div>
        </div>
    );
};

export default Home;