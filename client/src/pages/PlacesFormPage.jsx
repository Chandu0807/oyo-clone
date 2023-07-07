import PhotosUploader from "../PhotosUploader";
import Features from "../Features";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
export default function PlacesFormPage(){
     const {id}=useParams();
     
    const[title,setTitle]=useState('');
    const[address,setAddress]=useState('');
    const[addedPhotos,setAddedPhotos]=useState([]);
    const[description,setDescription]=useState('');
    const[features,SetFeatures]=useState([]);
    const[extraInfo,SetExtraInfo]=useState('');
    const[checkIn,SetCheckIn]=useState('');
    const[checkOut,SetCheckOut]=useState('');
    const[maxGuests,setMaxGuests]=useState(1);
    const [price,setPrice] = useState(100);
    const[redirect,setRedirect]=useState(false);

    useEffect(() => {
        if (!id) {
          return;
        }

    
    axios.get('/places/'+id).then(response => {
       const {data} = response;
       setTitle(data.title);
       setAddress(data.address);
       setAddedPhotos(data.photos);
       setDescription(data.description);
       SetFeatures(data.features);
       SetExtraInfo(data.extraInfo);
       SetCheckIn(data.checkIn);
       SetCheckOut(data.checkOut);
       setMaxGuests(data.maxGuests);
       setPrice(data.price);
      
    });
  }, [id]);

    function inputHeader(text){
        return(
            <h1 className="text-xl font-semibold mt-4">{text}</h1>
        );
    }

    function inputDescription(text){
        return(
            <p className="text-blue-300 text-sm">{text}</p>
        );
    }
    function preInput(header,description){
        return(
            <>
            {inputHeader(header)}
            {inputDescription(description)}

            </>
        );
    }

    async function savePlace(ev) {
        ev.preventDefault();
       const placeData=  {
          title, address,addedPhotos,
          description, features, extraInfo,
          checkIn, checkOut, maxGuests,price,
        };
        if (id) {
           
            await axios.put('/places', {
              id, ...placeData
            });
            setRedirect(true);
          } else {
          
            await axios.post('/places', placeData);
            setRedirect(true);
          }
      
        }

      if(redirect){
        return <Navigate to ={'/account/places'}/>
      }


    return(
        <div>
            <AccountNav/>
            <form className="w-full " onSubmit={savePlace}>
                {preInput('Title','title for place should be small and catchy!!')}  
               <input
                type ='text'value={title} 
               onChange={ev=>setTitle(ev.target.value)} 
               placeholder="title for example :name"/> 
                {preInput('Address','address to the place')}
               <input  
               type = 'text' value={address} 
               onChange={ev=>setAddress(ev.target.value)} 
               placeholder="address"/>
               {preInput('Photos','more the better')}
                <PhotosUploader  addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
                {preInput('Description','Description of place')}
                <textarea 
                value={description} 
                onChange={ev =>setDescription(ev.target.value)}/>
                {preInput('features','select all the features')}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 w-3/6">
                    <Features selected={features} 
                    onChange={SetFeatures}/>
                </div>
                {preInput('extra info','Rules..')}      
                <textarea 
                value={extraInfo}         
                onChange={ev=>SetExtraInfo(ev.target.value)}/>
                {preInput('Check in and Checkout times, Max guests','add check in and checkout times')}               
                <div className="w-1/6 gap-2 font-semibold">
                <div>
                    <h1 className="mt-2 -mb-1">&nbsp; Checkin time </h1>
                   
                        <input value={checkIn} 
                        
                        
                        onChange={ev =>SetCheckIn(ev.target.value)} 
                        type='text' placeholder="16"/>
                    </div>
                <div>
                    <h1 className="mt-2 -mb-1">&nbsp; Checkout time</h1>
                    <input  value={checkOut} onChange={ev => SetCheckOut(ev.target.value)} 
                    type='text' placeholder="12"/>
                </div>
                <div>
                <h1  className="mt-2 -mb-1"> &nbsp;Max guests</h1>
                    <input  value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} 
                    type='number' placeholder="2 or 3"/>
                </div>
                <div>
                <h1  className="mt-2 -mb-1"> &nbsp;price for night</h1>
                    <input  value={price} onChange={ev => setPrice(ev.target.value)} 
                    type='number' placeholder="2 or 3"/>
                </div>

                </div>
                
              <center>  <button className=" bg-primary my-4 w-4/5 ">Save</button></center>
            </form>
            </div>
    );
}