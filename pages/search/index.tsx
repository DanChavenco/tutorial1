import { useState, useCallback } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'

import Nav from '../../components/nav'
import api from '../../utils/api'

interface Teacher {
  _id: string,
  name: string,
  email: string,
  cellphone: string,
  teacher: boolean,
  coins: number,
  courses: string[],
  available_hours: Record<string,number[]>,
  available_locations: string[],
  appoitments: Record<string,unknown[]>
  reviews: Record<string,unknown[]>
}

const SearchPage: NextPage = () => {
  const [textInput, setTextInput] = useState('')
  const [data, setData] = useState<Teacher[]>([])
  const [session, loading] = useSession()

  const handleSearch = useCallback(() => {
    api(`/api/search/${textInput}`).then((response) => {
      const teachers: Teacher[] = response.data
      setData(teachers)
    })
  }, [textInput, setData])

  return (
    <div>
      <Nav />
        {!session && 
          <div className="text-3xl">
            Not signed in <br/>
            <button onClick={(): Promise<void> => signIn("auth0")}>Sign in</button>
          </div>}
        {session && (
          <>
            <h1>Bem vindo a página Search.</h1>
            <div className="text-3xl">
              Signed in as {session.user.email} <br/>
              <button onClick={(): Promise<void> => signOut()}>Sign out</button>
            </div>
            <input
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              type="text"
              placeholder="Digite a disciplina que você procura..."
              className="bg-pink-200"
            />
            <button type="submit" className="bg-blue-200" onClick={handleSearch}>
              Pesquisar
            </button>

            {data.length !== 0 && 
              data.map((teacher) => (
                <Link href={`/search/${teacher._id}`} key={teacher._id}>
                  <a>
                    <h1 className="text-2xl">{teacher.name}</h1>
                  </a>
                </Link>
              ))}
          </>
        )}
        {loading && (
          <div className="text-5xl">
            <h1>CARREGANDO...</h1>
          </div>
        )}
    </div>
  )
}

export default SearchPage;
