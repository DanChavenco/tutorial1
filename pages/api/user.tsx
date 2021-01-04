import { NextApiRequest, NextApiResponse } from 'next';
import connect  from '../../utils/database';

interface ErrorResponseType {
  error: string;
};

interface SuccessResponseType {
  _id: string,
  name: string,
  email: string,
  cellphone: string,
  teacher: boolean,
  coins: number,
  courses: string[],
  available_hours: IAvailableHours,
  available_locations: string[],
  appoitments: object[],
  reviews: object[]
}

interface IAvailableHours {
  monday: number[],
  tuesday: number[],
  wednesday: number[],
  thursday: number[],
  friday: number[],
}

export default async(
  req:NextApiRequest, 
  res: NextApiResponse<ErrorResponseType | SuccessResponseType>
  ): Promise<void> => {
    if (req.method === "POST") {
      const { 
        name, 
        email, 
        cellphone, 
        teacher, 
        courses, 
        available_hours, 
        available_locations 
      }: {
        name: string, 
        email: string, 
        cellphone: string, 
        teacher: string, 
        courses: string[], 
        available_hours: IAvailableHours,
        available_locations: Record<string, number[]>
      } = req.body;

      // check if available hours is between 7:00 and 20:00
      let invalidHour = false
      for(const weekday in available_hours){
        available_hours[weekday].forEach((hour) => {
          if (hour < 7 || hour > 20) {
            invalidHour = true
            return;
          }
        })
      }

      if (invalidHour) {
        res.status(400).json({error: "You cannot teach between 20:00 and 07:00."});
        return;
      }

      if (!teacher) {
        if (!name || !email || !cellphone) {
          res.status(400).json({error: "Missing body parameter."});
          return;
        }
      } else if (teacher) {
        if (!name || !email || !cellphone || !courses || !available_hours || !available_locations) {
          res.status(400).json({error: "Missing body parameter."});
          return;
        }
      }

      const { db } = await connect();

      const response = await db.collection('users').insertOne({
        name, 
        email, 
        cellphone, 
        teacher,
        coins: 1,
        courses: courses || [],
        available_hours: available_hours || {},
        available_locations: available_locations || [],
        appoitments: [],
        reviews: []
      });

      res.status(200).json(response.ops[0]);
    } else {
      res.status(400).json({error: "Wrong request method."})
    }
};