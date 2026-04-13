export default interface CurrentWeather {
    location: {
    name: string,
    country: string,
    localtime: string
    }
    current: {
        last_updated: string,
        temp_c: number,
        condition: {
            text: string,
            icon: string
        }
        wind_kph: number,
        wind_dir: string,
        humidity: number,
        feelslike_c: number
    }
}