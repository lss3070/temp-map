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

  const result =[]
  const list = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.query.lat},${req.query.lng}&keyword=점심&radius=400&opennow=true&type=restaurant&language=ko&key=AIzaSyD7hySl2ct4VunK1C99CeZ-9ithi1dlOZY`)
  
  result.push(...list.data.results);
  if(list.data.next_page_token){
    const one = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyD7hySl2ct4VunK1C99CeZ-9ithi1dlOZY&pagetoken=${list.data.next_page_token}`)
    
    result.push(...one.data.results);

    if(one.data.next_page_token){
      const two = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyD7hySl2ct4VunK1C99CeZ-9ithi1dlOZY&pagetoken=${one.data.next_page_token}`)
      result.push(...two.data.results);
    }
  }
  
  res.status(200).json(result)
}


//`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.query.lat},${req.query.lng}&radius=800&opennow=true&type=restaurant&language=ko&key=AIzaSyD7hySl2ct4VunK1C99CeZ-9ithi1dlOZY`