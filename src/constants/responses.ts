export const RESPONSES = {
  success: {
    message: 'The operation was a success.',
    status: 200,
  },

  deleted: {
    message: 'The resource was deleted successfully.',
    status: 200,
  },

  found: {
    message: 'Here is the required resource.',
    status: 200,
  },

  updated: {
    message: 'Success updating the resource.',
    status: 201,
  },

  created: {
    message: 'The resource was created successfully.',
    status: 201,
  },

  badRequest: {
    message: 'Invalid request. Please check what you’ve sent.',
    status: 400,
  },

  missingField: {
    message: 'Essential data is missing in the request.',
    status: 400,
  },

  notUpdated: {
    message: 'The date was not updated.',
    status: 400,
  },

  unauthorized: {
    message:
      'Unauthorized access. You need to be authenticated to perform this action.',
    status: 401,
  },

  forbidden: {
    message: 'You do not have permission to perform this operation.',
    status: 403,
  },

  notFound: {
    message: 'The requested resource could not be found.',
    status: 404,
  },

  internalError: {
    message: 'There was an internal server error. Please try again later.',
    status: 500,
  },
};
