'use client';
import React from 'react';
import { Button, TextArea, TextField } from '@radix-ui/themes';
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
  const router= useRouter();
  const {register,control,handleSubmit} =useForm<IssueFrom>();
  return (
         <form className='max-w-xl space-y-3' onSubmit={handleSubmit(
         async (data) => {await axios.post('/api/issues/',data);
         await router.push('/issues');
         })}>
          <TextField.Root placeholder="title" {...register('title')}/>

          <Controller
           name="description"
           control={control}
           render={({ field }) => <SimpleMDE placeholder="description" {...field} />}
           />
          <Button>Submit</Button>
        </form> 
  )
}

export default NewIssuePage