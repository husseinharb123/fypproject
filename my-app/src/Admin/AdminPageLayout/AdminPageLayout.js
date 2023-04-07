import React, { useEffect } from 'react'
import AdminSideNav from '../components/AdminSideNav/AdminSideNav'
import '../CommonCSS/1.scoped.css'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

export default function AdminPageLayout() {
    const parm = useParams()
    const id = parm.id
    const navigate = useNavigate()
    const [loading, setloading] = useState(false)

    useEffect(() => {
        setloading(false)
        async function fetchdata() {
            const url = `/checkstoreexist/${id}`
            try {
                const response = await axios.get(url)
                if (response.data.responseSuccess ) {
                    console.log(response);
                    setloading(true)
                }
                else{
                    navigate('*')
                }
            } catch (error) {
                setloading(false)
                navigate('/storelogin/')
            }


        }
        fetchdata()


    }, [])

    return ( <>
        { loading  &&
        <>
            <div>
                <AdminSideNav />
            </div>
            <main className="main-wrap">
                <Outlet />
            </main>
        </>
    }
    </>
    )
}
