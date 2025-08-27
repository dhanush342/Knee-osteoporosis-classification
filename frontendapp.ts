// frontend/src/App.tsx
import React, { useState } from 'react'


function App(){
const [file, setFile] = useState<File| null>(null)
const [result, setResult] = useState<any>(null)
const [explain, setExplain] = useState<any>(null)


const upload = async () => {
if(!file) return
const form = new FormData()
form.append('file', file)
const res = await fetch('/predict', { method:'POST', body: form })
}

}

export default App