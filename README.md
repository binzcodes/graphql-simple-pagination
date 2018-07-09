A simple pagination helper for GraphQL.

`npm install --save graphql-simple-pagination`

*graphql-simple-pagination* provides input and resolver helpers 
to implement super-simple application-layer paging.

#### Usage
```
const { paginationInputType, paginationResolver } = require('graphql-simple-pagination')

const User = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      // ...
      comments: {
        type: CommentType,
        args: {
          pagination: {
            type: paginationInputType
          }
        },
        resolve: (user, args) => paginationResolver(user.comments, args.pagination)
    })
```

#### API
```
const data = [{...},...]

const args = {
  rowsPerPage: 10, // number of items per page
  page: 0, // page number
  sortBy: null, // key to sort by
  descending: false // default sort ascent
}

const opts = {
  indexOffset: 0 // [0,-1] offsets page number to zero out index
}

let result = paginationResolver(data, args, opts)
console.log(result)
```