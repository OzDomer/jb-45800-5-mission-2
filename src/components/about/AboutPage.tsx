import "./AboutPage.css"

export default function AboutPage() {
        return (
        <div className="AboutPage">
            <h2>About</h2>
            <p>This app allows you to search for current weather conditions in cities across Israel. Select a city from the list to see live temperature, wind speed, and weather conditions.</p>
            <p>not every city has a match in the api we deal with it by taking its piba key (region) if one exist and show the region weather some cities cant be handled with the api so and error page shows up</p>
            <h3>Developer</h3>
            <p>Name: Oz Domer</p>
            <p>Course: Full Stack</p>
        </div>
    )
}