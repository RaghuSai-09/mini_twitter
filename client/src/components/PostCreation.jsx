import  { useState } from 'react';

function PostCreationForm({ onPostSubmit }) {
  const [content, setContent] = useState('');

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() === '') {
      return; 
    }
    onPostSubmit(content);
    setContent('');
  };

  return (
    
    <div className="bg-white p-4  justify-center items-center rounded-lg border-b-2 border-slate-200">
      <form onSubmit={handleSubmit}>
        <textarea
          className=" min-w-fit w-full bg-slate-200 p-2 border rounded-md focus:outline-none focus:border-slate-500"
          rows="3"
          placeholder="What's happening?"
          value={content}
          onChange={handleContentChange}
        />
        <div className="flex justify-end items-center  mt-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none"
          >
            Tweet
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostCreationForm;
