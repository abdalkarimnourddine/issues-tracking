'use client';
import React, { useState } from 'react';
import { Button, Callout, TextArea, TextField } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm,Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueFrom{
    title:string,
    description:string
}

const NewIssuePage = () => {
  const [error,setError] = useState('');
  const router= useRouter();
  const {register,control,handleSubmit} =useForm<IssueFrom>();
  return (
       <div className='max-w-xl space-y-3'>
        {error && (
        <Callout.Root color='red'>
        <Callout.Text>
            {error}  
        </Callout.Text>
      </Callout.Root>)}
         <form className=' space-y-3' onSubmit={handleSubmit(
         async (data) => {
         try {
            await axios.post('/api/issues/',data);   
            await router.push('/issues');   
         } catch (error) {
            setError('An excepted error occured');
            console.log(error);
             
        }
         })}>
          <TextField.Root placeholder="title" {...register('title')}/>

          <Controller
           name="description"
           control={control}
           render={({ field }) => <SimpleMDE placeholder="description" {...field} />}
           />
          <Button>Submit</Button>
        </form>
        </div> 
  )
}

export default NewIssuePage