import React, { useEffect } from 'react'
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import B1 from './B1'
import B2 from './B2'

export default function B () {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/')
  }, [])
  return (
    <div>
      <Link to='/b1'>我是B1</Link> &nbsp;&nbsp;
      <Link to='/b2'>我是B2</Link>
      <hr />
      <Routes>
        <Route path='/b1' element={<B1 />} />
        <Route path='/b2' element={<B2 />} />
        <Route path='/' element={<Navigate to='/b1' />} />
      </Routes>
    </div>
  )
}
