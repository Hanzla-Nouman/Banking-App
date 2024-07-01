import Authform from '@/components/ui/Authform'
import React from 'react'

const Signin = () => {
  return (
    <section className='flex-center size-full max-sm:px-6'>
      <Authform type="sign-in"/>
    </section>
  )
}

export default Signin