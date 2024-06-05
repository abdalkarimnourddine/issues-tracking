'use client';
import React, { useState } from 'react';
import { Button, Callout, Text, TextArea, TextField } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm,Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Resolver } from 'dns';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';

// interface IssueFrom{
//     title:string,
//     description:string
// }
type IssueFrom =z.infer<typeof createIssueSchema>;
const NewIssuePage = () => {
  const [error,setError] = useState('');
  const router= useRouter();
  const {register,control,handleSubmit,formState:{errors}} =useForm<IssueFrom>({resolver:zodResolver(createIssueSchema)});
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
          {errors.title && (<Text color='red' as='p'>{errors.title.message}</Text>)}
          <Controller
           name="description"
           control={control}
           render={({ field }) => <SimpleMDE placeholder="description" {...field} />}
           />
           {errors.description && (<Text color='red' as='p'>{errors.description.message}</Text>)}
          <Button>Submit</Button>
        </form>
        </div> 
  )
}

export default NewIssuePage