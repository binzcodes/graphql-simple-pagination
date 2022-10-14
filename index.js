const {
  GraphQLInputObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt
} = require('graphql')
const _ = require('lodash')

module.exports.paginationInputType = new GraphQLInputObjectType({
  name: 'PaginationInput',
  description: 'Input definition for pagination',
  fields: {
    page: {
      description: 'Page number',
      type: GraphQLInt
    },
    rowsPerPage: {
      description: 'Maximum number of rows to return for each page.',
      type: GraphQLInt
    },
    sortBy: {
      description: 'Object key to sort by.',
      type: GraphQLString
    },
    descending: {
      description: 'Set true to change sort order to descending',
      type: GraphQLBoolean
    }
  }
})

module.exports.paginationResolver = (data, args, { indexOffset: indexOffset = 0 } = {}) => {
  let {
    page: page = 0,
    rowsPerPage: rowsPerPage = 10,
    sortBy: sortBy = null,
    descending: descending = false
  } = args || {}

  if (rowsPerPage < 1) {
    rowsPerPage = data.length;
    page = 0;
  }

  let pageOffset = Math.max(0, page + indexOffset)
  let sortOrder = descending ? 'desc' : 'asc'
  let sorted = _.orderBy(data, [sortBy], [sortOrder])
  let chunked = _.chunk(sorted, parseInt(rowsPerPage))
  return chunked[parseInt(pageOffset)]
}
