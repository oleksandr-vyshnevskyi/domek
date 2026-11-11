import {prisma} from '@/lib/prisma'

export default async function List() {
    const posts = await prisma.post.findMany();
    // const users = await prisma.User.findMany();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <ul className="space-y-2 text-sm">
        {posts.map((post) => (
          <li key={post.id} className="flex items-center justify-between rounded-md border p-2">
            <div>
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-muted-foreground">{post.content}</p>
              <p className="text-xs text-muted-foreground">{post.published ? "Published" : "Draft"}</p>
              <p className="text-xs text-muted-foreground">ID {post.id}</p>
            </div>
          </li>
      ))}
    </ul>
    </div>
  )
}