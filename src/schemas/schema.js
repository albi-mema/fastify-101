
const getTODOsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            status: { type: 'boolean' },
            content: { type: 'string' }
          }
        }
      }
    }
  }
}

const getTODOOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          status: { type: 'boolean' },
          content: { type: 'string' }
        }
      }
    }
  }
}

const postTODOopts = {
  schema: {
    response: {
      201: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          status: { type: 'boolean' },
          content: { type: 'string' }
        }
      }
    }
  }
}

const deleteTODOopts = {
  schema: {
    response: {
      201: {
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    }
  }
}

const putTODOopts = {
  schema: {
    response: {
      201: {
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    }
  }
}

module.exports = { putTODOopts, deleteTODOopts, postTODOopts, getTODOsOpts, getTODOOpts }
