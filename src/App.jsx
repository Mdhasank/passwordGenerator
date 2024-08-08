import { useCallback, useEffect, useRef, useState } from "react";
function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeCharacters, setIncludeCharacters] = useState(false);

  const generatePassword = useCallback(()=>{
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let numbers = '0123456789';
    let charactersList = "'!@#$%^&*()_+-={}:<>'";
    if(includeNumbers) str += numbers;
    if(includeCharacters) str += charactersList;
    for(let i = 0; i < length; i++){
      pass += str.charAt(Math.floor(Math.random() * str.length));
      }
      setPassword(pass);
  },[length,includeNumbers,includeCharacters,setPassword])

  useEffect(()=>{
    generatePassword();
  },[length,includeNumbers,includeCharacters,generatePassword])

const passwordRef = useRef();

  const copyPassword = useCallback(()=>{
    navigator.clipboard.writeText(password)
      passwordRef.current?.select();
          },[password])

  return (
     <div className="flex justify-center items-center h-screen bg-gradient-to-r from-teal-200 to-blue-600">
      <div className="bg-white rounded-lg p-8 shadow-lg max-w-96 text-center">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Password Generator</h1>
        <div className="flex items-center mb-6">
          <input
            type="text"
            value={password}
            ref={passwordRef}
            readOnly
            className="border-none bg-gray-100 p-2 rounded-l-md w-full text-sm text-center"
          />
          <button
             onClick={copyPassword}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-teal-300 transition"
          >
            Copy
          </button>
        </div>
        <div className="mb-6 text-left">
          <label className="block text-blue-600 font-medium mb-2">Password Length:  {length}</label>
          <input
            type="range"
            min="6"
            max="24"
            value={length}
            onChange={(e)=>setLength(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="mb-4 text-left">
          <label className="flex items-center text-blue-600">
            <input
              type="checkbox"
              defaultChecked={includeNumbers}
              onChange={() => setIncludeNumbers((prev)=> !prev)}
              className="mr-2"
            />
            Include Numbers
          </label>
        </div>
        <div className="mb-6 text-left">
          <label className="flex items-center text-blue-600">
            <input
              type="checkbox"
              defaultChecked={includeCharacters}
              onChange={() => setIncludeCharacters((prev)=> !prev)}
              className="mr-2"
            />
            Include Characters
          </label>
        </div>
        <button
          onClick={generatePassword}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-teal-300 transition"
        >
          Generate Password
        </button>
      </div>
    </div>
  )
}

export default App
