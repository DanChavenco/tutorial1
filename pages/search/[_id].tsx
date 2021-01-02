import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import axios from 'axios'

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

//SSR
export default function TeacherProfilePage({name, email, _id}: Teacher): JSX.Element { //poderia ser props em vez da desestruturação {name,...}
  return (
    <>
    <h1 className="text-4xl"> Página do professor {name}</h1>
    <h1 className="text-2xl"> E-mail: {email}</h1>
    <h1 className="text-2xl"> ID: {_id}</h1>
    </>
  )
}

// return teacher profile
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const _id = context.query._id as string

  const response = await axios.get<Teacher>(`http://localhost:3000/api/teacher/${_id}`)

  const teacher = response.data

  return {
    props: teacher,
  }
}