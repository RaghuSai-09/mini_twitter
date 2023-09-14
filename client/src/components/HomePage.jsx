
import Sidebar from './Sidebar';
import Feed from './Feed';
import Followers from './Followers/Followers.jsx';

function TwitterHomePage() {
  return (
    <div className="flex justify-center min-h-screen mx-auto md:w-10/12">
      <div className='w-1/5 border-slate-100 border-r-2'> 
        <Sidebar/>
      </div>
      <div className='w-3/5 border-slate-100 border-2'>  
      <Feed />
      </div>
      <div className='w-2/6 border-l-2 border-slate-100' >
      <Followers />
      </div>
    </div>
  );
}

export default TwitterHomePage;
