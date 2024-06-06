import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Card, Heading, Text } from '@radix-ui/themes'
// import { Flex } from '@radix-ui/themes/src/index.js'
import { notFound } from 'next/navigation'
import React from 'react'
import ReactMarkdown from 'react-markdown'
interface Props {
    params: {id: string},
}
const IssueDetailPage = async ({params}: Props) => {
    const issue= await prisma.issue.findUnique({
        where:{id : parseInt(params.id)}
    })
  if (!issue)
    {
        notFound();
    }
  return (

    <div className='space-y-3'>
        <Heading>{issue.title}</Heading>
        <div className='flex space-x-3 items-center'>
        <IssueStatusBadge status={issue.status}/> 
        <Text>{issue.createdAt.toDateString()}</Text>
        </div>
        <Card className='prose'>
        <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
    </div>
  )
}

export default IssueDetailPage