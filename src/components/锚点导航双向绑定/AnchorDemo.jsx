import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FloorItems } from './data'

export default function AnchorDemo () {
  const navigate = useNavigate() // 用于在React Router中进行页面导航
  const location = useLocation() // 获取当前页面的URL信息
  const [offsetTopList, setOffsetTopList] = useState([]) // 保存每个锚点位置的信息
  const [activeBar, setActiveBar] = useState(FloorItems[0].key) // 用于标记当前活动的锚点

  useEffect(() => {
    const offsetTop = []
    FloorItems.forEach(item => {
      const curDom = document.getElementById(item.key) // 获取每个锚点元素的DOM节点
      if (curDom) {
        offsetTop.push({
          id: item.key,
          offsetTop: curDom.getBoundingClientRect().top // 获取锚点元素相对于视口顶部的位置
        })
      }
    })
    setOffsetTopList(offsetTop) // 保存锚点位置信息到状态中
  }, [])

  const ref = useRef(null) // 创建一个引用，用于获取滚动容器的DOM节点

  const onScrollEvent = () => {
    if (offsetTopList && ref.current) {
      for (let i = offsetTopList.length - 1; i >= 0; i--) {
        if (ref.current.scrollTop + 400 >= offsetTopList[i].offsetTop) {
          setActiveBar(offsetTopList[i].id) // 更新活动的锚点状态

          // 构建新的URL路径，用于导航
          const newPath = `${location.pathname}${location.search}`
          navigate(offsetTopList[i].id, { replace: true, state: { newPath } })

          // 获取对应的锚点链接元素并修改其样式
          const anchorElement = document.querySelector(
            `a[href="#${offsetTopList[i].id}"]`
          )
          if (anchorElement) {
            anchorElement.style.color = 'red' // 修改锚点链接的颜色属性
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
      anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start' }) // 平滑滚动到锚点位置

      // 构建新的URL路径，用于导航
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
        onScrollCapture={onScrollEvent} // 监听滚动事件并执行onScrollEvent函数
        ref={ref} // 将引用绑定到滚动容器的DOM节点
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
              color: activeBar === item.key ? 'red' : 'black' // 根据活动状态设置锚点链接颜色
            }}
            onClick={handleClick(item)} // 点击锚点链接时触发handleClick函数
          >
            {item.content}
          </a>
        ))}
      </div>
    </div>
  )
}
