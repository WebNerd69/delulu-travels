import {z} from "zod"

const postType = z.object(
     {
          id:z.string(),
          name:z.string(),
          title:z.string(),
          author:z.string(),
          author_info:z.object({
               full_name:z.string(),
               premium:z.boolean(),
               is_blocked:z.boolean(),
               flair:String ||null
          }),
          permalink:z.string(),
          url:z.string(),
          link_url:z.string(),
          text:z.string(),
          subreddit:z.string(),
          upvotes:z.number(),
          comments:z.number(),
          upvote_ratio:z.number(),
          over_18:z.boolean(),
          sticked:z.boolean(),
          locked:z.boolean(),
          spoiler:z.boolean(),
          is_self:z.boolean(),
          is_crosspost:z.boolean(),
          crosspost_origin: String||null,
          created_utc:z.number(),
          created:z.string()

     }
)

type REDDIT_POST_TYPE = z.infer<typeof postType>

export default REDDIT_POST_TYPE