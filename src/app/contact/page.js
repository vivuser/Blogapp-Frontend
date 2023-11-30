import { TextField } from "@mui/material";

export default function Contact() {

    return (
        <div className="flex flex-col p-4 items-center">
            <h1 className="text-2xl flex justify-center">Contact</h1>
            <div className="flex justify-center m-4">
            <TextField id="outlined-basic" label="Name" variant="outlined" className="m-2"/>
            <TextField id="outlined-basic" label="Email" variant="outlined" className="m-2" />
            <TextField id="outlined-basic" label="Contact No." variant="outlined" className="m-2"/>
            <div className="w-full max-w-md">
            <TextField fullWidth label="message" id="fullWidth" className="m-2"/>
            </div>
            </div>
        </div>
    )
}