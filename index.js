import {
  GraphQLInputObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
} from "graphql";
import _ from "lodash";

export const paginationInputType = new GraphQLInputObjectType({
  name: "PaginationInput",
  description: "Input definition for pagination",
  fields: {
    page: {
      description: "Page number",
      type: GraphQLInt,
    },
    rowsPerPage: {
      description: "Maximum number of rows to return for each page.",
      type: GraphQLInt,
    },
    sortBy: {
      description: "Object key to sort by.",
      type: GraphQLString,
    },
    descending: {
      description: "Set true to change sort order to descending",
      type: GraphQLBoolean,
    },
  },
});

export function paginationResolver(
  data,
  args,
  {indexOffset: indexOffset = 0} = {}
) {
  let {
    page: page = 0,
    rowsPerPage: rowsPerPage = 10,
    sortBy: sortBy = null,
    descending: descending = false,
  } = args || {};

  if (rowsPerPage === 0) throw new Error("pageSize cannot be less than one");

  if (!rowsPerPage || rowsPerPage === -1) {
    rowsPerPage = data.length;
    page = 0;
  }

  let pageOffet = Math.max(0, page + indexOffset);
  let sortOrder = descending ? "desc" : "asc";
  let sorted = _.orderBy(data, [sortBy], [sortOrder]);
  let chunked = _.chunk(sorted, parseInt(rowsPerPage));
  return chunked[parseInt(pageOffet)];
}
