import React from 'react';
import { TextField } from '@mui/material';

const ContactForm = () => {
  return (
    <div className="flex flex-col p-4 items-center">
      <h1 className="text-2xl flex justify-center font-bold">Contact</h1>
      <div className="m-4 shadow-xl bg-white p-4">
        <TextField id="outlined-basic" label="Name" variant="outlined" className="m-2" style={{ width: '200px'}} />
        <TextField id="outlined-basic" label="Email" variant="outlined" className="m-2" style={{ width: '200px'}} />
        <TextField id="outlined-basic" label="Contact No." variant="outlined" className="m-2" style={{ width: '200px'}}/>
        <TextField fullWidth label="Subject" id="fullWidth" variant="outlined" className="m-2" />
        <TextField fullWidth multiline label="Message"  rows={6} id="fullWidth" variant="outlined" className="m-2" />
      </div>
      <button className='font-bold bg-yellow-300 px-4 p-2 rounded-md hover:bg-yellow-400'>Send</button>
    </div>
  );
};

export default ContactForm;
