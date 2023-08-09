import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FloorItems } from './data'

export default function AnchorDemo () {
  const navigate = useNavigate()
  const location = useLocation()
  const [offsetTopList, setOffsetTopList] = useState([])
  const [activeBar, setActiveBar] = useState(FloorItems[0].key)

  useEffect(() => {
    const offsetTop = []
    FloorItems.forEach(item => {
      const curDom = document.getElementById(item.key)
      if (curDom) {
        offsetTop.push({
          id: item.key,
          offsetTop: curDom.getBoundingClientRect().top
        })
      }
    })
    setOffsetTopList(offsetTop)
  }, [])

  const ref = useRef(null)

  const onScrollEvent = () => {
    if (offsetTopList && ref.current) {
      for (let i = offsetTopList.length - 1; i >= 0; i--) {
        if (ref.current.scrollTop + 400 >= offsetTopList[i].offsetTop) {
          setActiveBar(offsetTopList[i].id)
          const newPath = `${location.pathname}${location.search}`
          navigate(offsetTopList[i].id, { replace: true, state: { newPath } })

          const anchorElement = document.querySelector(
            `a[href="#${offsetTopList[i].id}"]`
          )
          if (anchorElement) {
            anchorElement.style.color = 'red' // Modify anchor's attribute
          }
          break
        }
      }
    }
  }

  const handleClick = item => e => {
    e.preventDefault()
    const anchorElement = document.getElementById(item.key)
    if (anchorElement) {
      const offsetTop = anchorElement.getBoundingClientRect().top
      anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start' })

      const newPath = `${location.pathname}${location.search}`
      navigate(item.key, { replace: true, state: { newPath } })
    }
  }

  return (
    <div>
      <div
        style={{
          overflow: 'scroll',
          scrollBehavior: 'smooth',
          height: '100vh'
        }}
        onScrollCapture={onScrollEvent}
        ref={ref}
      >
        {FloorItems.map(item => (
          <div
            key={item.key}
            id={item.key}
            style={{
              height: '600px',
              border: '1px solid red',
              margin: '10px 0'
            }}
          >
            {item.content}
          </div>
        ))}
      </div>
      <div
        style={{
          position: 'fixed',
          right: '0px',
          top: '300px'
        }}
      >
        {FloorItems.map(item => (
          <a
            key={item.key}
            href={`#${item.key}`}
            style={{
              height: '50px',
              width: '100px',
              border: '1px solid black',
              margin: '10px 0',
              backgroundColor: '#fff',
              display: 'block',
              lineHeight: '50px',
              textAlign: 'center',
              textDecoration: 'none',
              color: activeBar === item.key ? 'red' : 'black'
            }}
            onClick={handleClick(item)}
          >
            {item.content}
          </a>
        ))}
      </div>
    </div>
  )
}
