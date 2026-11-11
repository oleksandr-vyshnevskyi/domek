import {prisma} from '@/lib/prisma'

export default async function List() {
    // const posts = await prisma.post.findMany();
    // const users = await prisma.User.findMany();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <ul className="space-y-2 text-sm">
       
    </ul>
    </div>
  )
}