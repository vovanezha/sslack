([
  {
    route: '/signup',
    method: 'POST',

    handler: async ({req, res, body}) => {
      // TODO: validate body

      const result = await handlers.Auth.signup(body);
      console.log(result);

      res.end('hello from handler, how are you?');
    }
  },

  {
    route: '/signin',
    method: 'POST',

    handler: ({req, res, body}) => {
      console.log('hello from handler, how are you?');
    }
  },
])
