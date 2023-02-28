

const getData = async (url) => {

    try {
        const body = await fetch(url)
        const data = await body.json()
        displayData(data)
    } catch (error) {
        console.log(error)
    }

}

const displayData = (data) => {

    console.log(data)
}

getData("https://api.openweathermap.org/data/2.5/weather?q=morocco&appid=1f8477c0ecddc564b9091bb123c6f6c4&units=")