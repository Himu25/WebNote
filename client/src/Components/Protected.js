import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Protected = ({Component}) => {
    const navigate = useNavigate()
    useEffect(()=>{
        let isAuth = localStorage.getItem('isAuth')
        if (!isAuth) {
            navigate('/login')
        }
    })
    return (
        <Component />
    )
}

export default Protected
