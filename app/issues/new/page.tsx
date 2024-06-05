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
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

// interface IssueFrom{
//     title:string,
//     description:string
// }
type IssueFrom =z.infer<typeof createIssueSchema>;
const NewIssuePage = () => {
  const [error,setError] = useState('');
  const [isSubmitting,setSubmitting]=useState(false);
  const {register,control,handleSubmit,formState:{errors}} =useForm<IssueFrom>({resolver:zodResolver(createIssueSchema)});
  const onSubmit = handleSubmit(
    async (data) => {
    try {
       setSubmitting(true);
       await axios.post('/api/issues/',data);   
       await router.push('/issues');   
    } catch (error) {
     setSubmitting(false);
       setError('An excepted error occured');
   }
    });
  const router= useRouter();
  
  return (
       <div className='max-w-xl space-y-3'>
        {error && (
        <Callout.Root color='red'>
        <Callout.Text>
            {error}  
        </Callout.Text>
      </Callout.Root>)}
         <form className=' space-y-3' onSubmit={onSubmit}>
          <TextField.Root placeholder="title" {...register('title')}/>
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          <Controller
           name="description"
           control={control}
           render={({ field }) => <SimpleMDE placeholder="description" {...field} />}
           />
           <ErrorMessage>{errors.description?.message}</ErrorMessage>
          <Button disabled={isSubmitting}>Submit {isSubmitting && (<Spinner/>)}</Button>
        </form>
        </div> 
  )
}

export default NewIssuePage