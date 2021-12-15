import React, { useState } from 'react'
import { Badge, TabBar } from 'antd-mobile'
import { useRoutes, useNavigate } from 'react-router-dom'
import Audit from './views/audit'
import Monitor from './views/monitor'
import Statistics from './views/statistics'
import My from './views/my'

import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'

export default () => {
  const tabs = [
    {
      key: 'audit',
      title: '审核',
      icon: <AppOutline />,
    },
    {
      key: 'statistics',
      title: '统计',
      icon: <UnorderedListOutline />,
    },
    {
      key: 'monitor',
      title: '视频监控',
      icon: (active) =>
        active ? <MessageFill /> : <MessageOutline />,
    },
    {
      key: 'my',
      title: '个人中心',
      icon: <UserOutline />,
    },
  ]
  const navigate = useNavigate()
  function tabBarChange (tabBarKey) {
    setActiveKey(tabBarKey);
    navigate(`/${tabBarKey}`, {})
  }

  const [activeKey, setActiveKey] = useState('audit')

  return (
    <>
      <div className='home-container'>
        {
          useRoutes([
            {
              path: "/",
              element: <Audit />,
            },
            {
              path: "/audit",
              element: <Audit />,
            },
            {
              path: "/statistics",
              element: <Statistics />
            },
            {
              path: "/monitor",
              element: <Monitor />
            },
            {
              path: "/my",
              element: <My />
            },
          ])
        }
      </div>
      <div className='tabbar-container'>
        <TabBar activeKey={activeKey} onChange={(tabBarKey) => tabBarChange(tabBarKey)}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>

    </>
  )
}