import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Loader from 'components/Loader'
import 'modern-normalize/modern-normalize.css'
import './App.css'
import './index.css'
import Shop from 'pages/Shop'

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" index element={<Shop />}></Route>
      </Routes>
    </Suspense>
  )
}
