import { useEffect, useState } from "react"

export default function(url: string, id: string): { a: string, b: string } {
    const [data, setData] = useState({a:'',b:''})

    useEffect(() => {
        console.log(1213);
        
        setTimeout(() => {
            setData(() => ({ a: '1', b: '2' }))
        }, 1000)
    }, [url, id])

    return data
}