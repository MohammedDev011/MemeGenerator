import {useState, useEffect} from "react"

export default function Meme() {

    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        imgUrl: "http://i.imgflip.com/1bij.jpg"
    })

    const [allMemes, setAllMemes] = useState([])

    function handleChange(event) {
        const {name, value} = event.target
        setMeme(preveMeme => ({
            ...preveMeme,
            [name]: value
        }))
    }

    function getImg() {
        const randomImg = allMemes[Math.floor(Math.random() * allMemes.length)].url
        setMeme(preveMeme => ({
            ...preveMeme,
            imgUrl: randomImg
        }))
    }

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])
    return (
        <div className="meme">
            <input
                type="text"
                placeholder="Top Text"
                name="topText"
                onChange={handleChange}
                value={meme.topText}
            />
            <input
                type="text"
                placeholder="Bottom Text"
                name="bottomText"
                onChange={handleChange}
                value={meme.bottomText}
            />
            <button onClick={getImg}>Get a new meme image 🖼</button>
            <div className="img-status">
                <h1 className="img-text top">{meme.topText}</h1>
                <h1 className="img-text bottom">{meme.bottomText}</h1>
                <img src={meme.imgUrl}/>
            </div>
        </div>
    )
}