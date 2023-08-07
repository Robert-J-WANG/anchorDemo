import React, { useEffect } from 'react'
import { Link, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import A1 from './A1'
import A2 from './A2'

export default function A () {
  useEffect(() => {
    // Redirect to '/a1' initially
    window.location.pathname !== '/a1' && navigate('/')
  }, [])

  const navigate = useNavigate()

  return (
    <div>
      <Link to='/a1'>我是A1</Link> &nbsp;&nbsp;
      <Link to='/a2'>我是A2</Link>
      <hr />
      <Routes>
        <Route path='/a1' element={<A1 />} />
        <Route path='/a2' element={<A2 />} />
        <Route path='/' element={<Navigate to='/a1' />} />
      </Routes>
    </div>
  )
}
