export default {
  id: 'root',
  name: 'class',
  description: 'class',
  routes: [
    {
      type: 'folder',
      path: '',
      priority: 0,
      children: [
        {
          id: 'index',
          name: 'Index',
          description: 'Index',
          routes: [
            {
              type: 'file',
              path: 'index',
              mimeTypes: ['application/json']
            },
            {
              type: 'file',
              path: 'manifest',
              mimeTypes: ['application/json']
            },
          ]
        },
        {
          id: 'functions',
          routes: [
            {
              type: 'filesCollection',
              path: 'functions',
              priority: 0,
            },
            {
              path: 'cloudCode',
              priority: 1,
              isDeprecated: true
            }
          ]
        },

        {
          id: 'class',
          routes: [
            {
              type: 'folder',
              path: 'class',
              priority: 0,
              isDeprecated: false,
              children: [
                {
                  id: 'index',
                  routes: [
                    {
                      type: 'file',
                      mimeTypes: ['text/javascript'],
                      path: 'index',
                    }
                  ]
                },
                {
                  id: 'protocols',
                  routes: [
                    {
                      type: 'file',
                      mimeTypes: ['text/javascript'],
                      path: 'protocols',
                    }
                  ]
                },
              ]
            }
          ],
        },
        {
          id: 'seed',
          routes: [
            {
              type: 'folder',
              path: 'seed',
              priority: 0,
              isDeprecated: false,
              children: [
                {
                  id: 'index',
                  routes: [
                    {
                      type: 'file',
                      mimeTypes: ['text/javascript'],
                      path: 'index',
                    }
                  ]
                },
                {
                  id: 'ref',
                  routes: [
                    {
                      type: 'file',
                      mimeTypes: ['text/javascript'],
                      path: 'ref',
                    }
                  ]
                },
                {
                  id: 'transformer',
                  routes: [
                    {
                      type: 'file',
                      mimeTypes: ['text/javascript'],
                      path: 'transformer',
                    }
                  ]
                },
                {
                  id: 'executor',
                  routes: [
                    {
                      type: 'file',
                      mimeTypes: ['application/json'],
                      path: 'executor',
                    }
                  ]
                },
                {
                  id: 'data',
                  routes: [
                    {
                      type: 'file',
                      mimeTypes: ['application/json'],
                      path: 'data',
                    }
                  ]
                },
                {
                  id: 'validator',
                  routes: [
                    {
                      type: 'file',
                      mimeTypes: ['text/javascript'],
                      path: 'validator',
                    }
                  ]
                },
              ]
            }
          ],
        },
        {
          id: 'lib',
          routes: [
            {
              type: 'filesCollection',
              path: 'lib',
              priority: 0,
            }
          ]
        },
        {
          id: 'triggers',
          routes: [
            {
              type: 'folder',
              path: 'triggers',
              priority: 0,
              isDeprecated: false,
              children: [
                {
                  id: 'beforeSave',
                  routes: [
                    {
                      type: 'file',
                      mimeTypes: ['text/javascript'],
                      path: 'beforeSave',
                    }
                  ]
                },
                {
                  id: 'afterSave',
                  routes: [
                    {
                      type: 'file',
                      mimeTypes: ['text/javascript'],
                      path: 'afterSave',
                    }
                  ]
                }
              ]
            }
          ],
        }
      ]
    },
  ]
}