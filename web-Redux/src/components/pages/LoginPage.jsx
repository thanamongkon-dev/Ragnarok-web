import React from 'react'
import Login from '../form/Login'


const LoginPage = () => {
    return (
        <div className='h-full min-h-screen p-10 mx-auto bg-slate-800'>
            <div className='max-w-md max-auto p-12 bg-white rounded-lg shadow-lg'>
                <div className='flex flex-col h-full items-center justify-center w-full mx-auto'>
                    <img src="" alt="" className="h-32 w-36" />
                    <h1 className="text-2xl font-bold text-center text-neutral-800">
                        เข้าสู่ระบบ
                    </h1>
                </div>
            </div>
            <Login />
        </div>
    )
}

export default LoginPage