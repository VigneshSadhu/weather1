const express=require("express")
const cors=require("cors")
const dotenv=require("dotenv")
const axios=require("axios")

const app = express();
dotenv.config();
app.use(express.json())
app.use(cors());
const port=5000;

app.listen(port,()=>{
    console.log(`sever is running in ${port}`)
})


app.get('/getweather', async (req, res) => {
    try {
        const cityName = req.query.q;
        const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=0fb310f36e5a3ca5f0d924ab3011abb8&units=metric`);
        const weatherData = {
            temperature: data.main.temp,
            humidity: data.main.humidity,
            description: data.weather[0].description,
      };
      res.json(weatherData);
    
    } catch (error) {
      console.error("Error fetching weather data:", error);
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  });