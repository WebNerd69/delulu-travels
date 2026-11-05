import z from "zod"

const Document = z.object({
     id: z.string(),
     title: z.string(),
     query: z.string(),
     link: z.string(),
     content: z.array(
          z.object({
               heading:z.string(),
               content:z.string(),
               level:z.number(),
          })
     ),
     unChunkedContent: z.string()
})

export type Document = z.infer<typeof Document>

export interface RankedDocument extends Document {
     score: number
}