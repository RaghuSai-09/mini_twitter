

function Post() {
{/*const { author, content, createdAt } = tweet;*/}

  return (
    <div className="bg-white p-4 my-4 rounded-lg shadow-md">
      <div className="flex items-center">
        <div className="h-10 w-10 bg-gray-300 rounded-full overflow-hidden">
          {/* Author's profile picture */}
          <img src={"author.profilePictureUrl"} alt={"author.username"} className="object-cover h-full w-full" />
        </div>
        <div className="ml-2">
          <h2 className="text-lg font-semibold">{"author.username"}</h2>
          <p className="text-gray-600 text-sm">{new Date().toLocaleString()}</p>
        </div>
      </div>
      <p className="text-lg mt-2">{"content"}</p>
    </div>
  );
}

export default Post;
