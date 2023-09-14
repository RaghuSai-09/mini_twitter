
const Sidebaroptions = ({active,text,Icon}) => {
  return (
    <div>
        <div className={`flex items-center space-x-2 p-4 hover:bg-gray-200 rounded-xl cursor-pointer ${active && 'bg-gray-200'}`}>
            <Icon className="h-8 w-8 text-blue-500"/>
            <h2 className="hidden sm:inline-flex font-medium">{text}</h2>
        </div>

    </div>
  )
}

export default Sidebaroptions;