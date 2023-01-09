// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios, { AxiosError } from 'axios'
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

  try{

    console.log("!!!!!")
    console.log(req.query.id);
    const detail = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.query.id}&key=AIzaSyD7hySl2ct4VunK1C99CeZ-9ithi1dlOZY&language=ko`)

    // console.log('!~~~~~')
    // console.log(localDetail.statusText);
    // if(localDetail){
    //   res.status(200).json(detail.data.result)
    // }




    res.status(200).json(detail.data.result)
  }catch(error){
    console.log('error!!')
    console.log(error);
    res.status(400)
  }
  
}


//`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.query.lat},${req.query.lng}&radius=800&opennow=true&type=restaurant&language=ko&key=AIzaSyD7hySl2ct4VunK1C99CeZ-9ithi1dlOZY`