import LayoutDash from '@/components/layout/layout'
import StoresListPage from '@/components/widgets/stores/list'
import useAuth from '@/hooks/useAuth'
import React from 'react'

const stores = () => {
  const { auth } = useAuth()
  if (!auth.isAuthenticated) {
    // window.location.href='/login'
  }
  return (
    <>
      <StoresListPage />
    </>
    // <LayoutDash>
    // <StoresListPage />
    // </LayoutDash>
  )
}

export default stores