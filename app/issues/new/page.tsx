'use client';
import React from 'react'
import { Button, TextArea, TextField } from '@radix-ui/themes'
const NewIssuePage = () => {
  return (
         <div className='max-w-xl space-y-3'>
          <TextField.Root placeholder="title">
          </TextField.Root>
          <TextArea placeholder="description" />
          <Button>Submit</Button>
        </div>
  )
}

export default NewIssuePage