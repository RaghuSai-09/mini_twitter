import Sidebaroptions from './Sidebaroptions';
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  return (
    <div className="md:mx-0 mx-auto md:border-slate-200 flex flex-col  justify-start min-h-screen">
        <div className="justify-center items-center flex p-5">
            <TwitterIcon style={{ fontSize: 40}} color='primary'/>
        </div>
        <div className='flex flex-col justify-start mt-5 p-3 space-y-4'>
            <Link to='/home'>
                <Sidebaroptions Icon={HomeIcon} text="Home" />
            </Link>
            <Link to='/profile'>
                <Sidebaroptions Icon={PersonIcon} text="Profile" />
            </Link>
        </div>
    </div>
  )
}

export default Sidebar