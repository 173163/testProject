import React, { useEffect, useState, useRef } from 'react'
import { Image, List, } from 'antd-mobile'
import * as API from '../../api/BIeForecastMailEkpty'

export default () => {
    return (
        <div>
            <List>
                <List.Item
                    extra='次要信息'
                    title='这里是标题'
                    description='这里是描述信息'
                    clickable
                >
                    这里是主信息
                </List.Item>
                <List.Item title='这里是标题' clickable>
                    这里是主信息
                </List.Item>
                <List.Item title='这里是标题'>这里是主信息</List.Item>
            </List>
        </div>
    )
}