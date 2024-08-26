import React from 'react'

function HeaderPage() {
  return (
    <div>
        <Header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 24px',
          position: 'fixed',
          width: '100%',
          top: 0,
          left: 0,
          zIndex: 1000,
          height: '64px',
          theme: "dark"
        }}
      >
        <div className='heading'>Real Estate Management System</div>
        <Menu
          theme="dark"
          mode="horizontal"
          items={items(navigate)}
          style={{
            fontSize: '20px',
            flex: 1,
            justifyContent: 'flex-end',
            border: 'none',
            color: '#fff'
          }}
        />
      </Header>
    </div>
  )
}

export default HeaderPage