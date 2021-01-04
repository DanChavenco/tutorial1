import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import useSWR from 'swr'
import { signIn, signOut, useSession } from 'next-auth/client'

import api from '../utils/api';
import Nav from '../components/nav';

const ProfilePage: NextPage = (): JSX.Element => {
  const [ isTeacher, setIsTeacher ] = useState(null)
  const [ name, setName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ cellphone, setCellphone ] = useState("")
  const [ courses, setCourses ] = useState("")
  const [ availableLocations, setAvailableLocations ] = useState("")
  const [ availableHoursMonday, setAvailableHoursMonday ] = useState("")
  const [ availableHoursTuesday, setAvailableHoursTuesday ] = useState("")
  const [ availableHoursWednesday, setAvailableHoursWednesday ] = useState("")
  const [ availableHoursThursday, setAvailableHoursThursday ] = useState("")
  const [ availableHoursFriday, setAvailableHoursFriday ] = useState("")
  const [ loggedUserWithoutAccount, setLoggedUserWithoutAccount] = useState(false)

  const [ session, loading ] = useSession();

  // conditional use of SWR
  const { data, error } = useSWR(
    !loggedUserWithoutAccount && !loading 
      ? `/api/user/${session?.user.email}` 
      : null, 
    api
  );

  // if an error occurs, then run effect {}
  useEffect(() => {
    if (error) setLoggedUserWithoutAccount(true)
  },[error])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = {
      name,
      email,
      cellphone,
      courses: courses.split(",").map((item)=>item.trim()),
      availableLocations: availableLocations.split(",").map((item)=>item.trim()),
    }

    console.log(data)
  }

  return (
    <div>
      <Nav />
        {!session && 
          <div className="text-3xl">
            Favor fazer login para acessar essa página. <br/>
            <button onClick={(): Promise<void> => signIn("auth0")}>Sign in</button>
          </div>}
        {session && data && (
          <>
          <h1>Bem vindo a página Profile.</h1>
          <div className="text-3xl">
            Signed in as {session.user.email} <br/>
            <button onClick={(): Promise<void> => signOut()}>Sign out</button>
          </div>
          <p>{data.data.coins} moeda(s)</p>
          </>)}
        {/*session && error*/ loggedUserWithoutAccount && (
          <div className="flex flex-col items-center"> 
            <h1 className="text-3xl">Seja bem vindo ao Teach Other!</h1>
            <h1 className="text-2xl">Por favor, finalize a criação do seu perfil:</h1>
            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name" 
                className="bg-pink-200 my-4"
              />
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail" 
                className="bg-pink-200 my-4"
              />
              <input 
                type="text"
                value={cellphone}
                onChange={(e) => setCellphone(e.target.value)}                
                placeholder="Cellphone" 
                className="bg-pink-200 my-4"
              />
              <div>
                <h1>Você deseja ser professor?</h1>
                <div 
                  className="bg-green-400 cursor-pointer my-2" 
                  onClick={()=>setIsTeacher(true)}
                  >
                  Sim
                </div>
                <div 
                  className="bg-red-400 cursor-pointer my-2"
                  onClick={()=>setIsTeacher(false)}
                  >
                  Não
                </div>
              </div>
              {isTeacher &&
                <>
                  <h1>Escreva as suas matérias (separadas por vírgula)</h1>
                  <input 
                    type="text" 
                    value={courses}
                    onChange={(e) => setCourses(e.target.value)}
                    placeholder="Matérias que você vai lecionar" 
                    className="bg-pink-200 my-4"
                  />
                   <h1>Escreva em quais locais você pode dar aula (separados por vírgula)</h1>
                  <input 
                    type="text"
                    value={availableLocations}
                    onChange={(e) => setAvailableLocations(e.target.value)} 
                    placeholder="Ex: Faculdade UnB, Remoto" 
                    className="bg-pink-200 my-4"
                  />
                  <h1>Escreva os horários você pode dar aula (separados por vírgula)</h1>
                  <h2>Segunda:</h2>
                  <input 
                    type="text"
                    value={availableHoursMonday}
                    onChange={(e) => setAvailableHoursMonday(e.target.value)}
                    placeholder="Ex: 8, 10, 14, 16" 
                    className="bg-pink-200 my-4"
                  />
                  <h2>Terça:</h2>
                  <input 
                    type="text"
                    value={availableHoursTuesday}
                    onChange={(e) => setAvailableHoursTuesday(e.target.value)}
                    placeholder="Ex: 8, 10, 14, 16" 
                    className="bg-pink-200 my-4"
                  />
                  <h2>Quarta:</h2>
                  <input 
                    type="text"
                    value={availableHoursWednesday}
                    onChange={(e) => setAvailableHoursWednesday(e.target.value)}
                    placeholder="Ex: 8, 10, 14, 16" 
                    className="bg-pink-200 my-4"
                  />
                  <h2>Quinta:</h2>
                  <input 
                    type="text"
                    value={availableHoursThursday}
                    onChange={(e) => setAvailableHoursThursday(e.target.value)} 
                    placeholder="Ex: 8, 10, 14, 16" 
                    className="bg-pink-200 my-4"
                  />
                  <h2>Sexta:</h2>
                  <input 
                    type="text"
                    value={availableHoursFriday}
                    onChange={(e) => setAvailableHoursFriday(e.target.value)}
                    placeholder="Ex: 8, 10, 14, 16" 
                    className="bg-pink-200 my-4"
                  />                                    
                </>
              }
              {isTeacher === false &&
                <h1 className="my-2">Beleza! Seu perfil pode ser criado.</h1>
              }
              <button type="submit" className="btn-blue mb-10">Criar perfil</button>
            </form>
          </div>
        )}
        {loading && (
          <div className="text-5xl">
            <h1>CARREGANDO...</h1>
          </div>
        )}
    </div>
  )
}

export default ProfilePage;
