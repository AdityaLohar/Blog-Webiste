import Quote from '../component/Quote'
import Auth from '../component/Auth'

const Signin = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 mx-5'>
      <Auth type="signin" />
      <div className='hidden md:block'>
        <Quote />
      </div>
    </div>
  )
}

export default Signin