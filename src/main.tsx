import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ConfigProvider } from 'antd'
import { antConfig } from './lib/constants/antConfig.ts'

import { RouterProvider } from 'react-router-dom'
import { routes } from './lib/constants/navigatin.tsx'



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider theme={antConfig}>
      <RouterProvider router={routes} />
    </ConfigProvider>
  </React.StrictMode>
);
