import Sidebar from "./Sidebar";

function ProfilePage() {

  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="flex justify-center">
      <Sidebar />
      <div className="w-full lg:w-2/3 xl:w-1/2 mt-4 p-4">
        <div className="flex items-center mb-4">
          
          <div>
            <h2 className="text-2xl font-semibold">hi,{user.name}</h2>
           
          </div>
        </div>

      
      </div>
    </div>
  );
}

export default ProfilePage;
