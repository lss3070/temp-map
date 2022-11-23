// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

interface CustomApiRequest extends NextApiRequest{
  searchParams:{
    lat:string;
    lon:string;
  }
}

export default async function handler(
  req: CustomApiRequest,
  res: NextApiResponse<any>
) {

  const list = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.query.lat},${req.query.lng}&keyword=점심&radius=500&opennow=true&type=restaurant&language=ko&key=AIzaSyD7hySl2ct4VunK1C99CeZ-9ithi1dlOZY`)


  res.status(200).json(list.data.results)
}


//`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.query.lat},${req.query.lng}&radius=800&opennow=true&type=restaurant&language=ko&key=AIzaSyD7hySl2ct4VunK1C99CeZ-9ithi1dlOZY`