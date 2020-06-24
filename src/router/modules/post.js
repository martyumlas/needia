import Offers from '../../view/post/Offers'
import Needs from '../../view/post/Needs'
import Post from '../../view/post/Post'
import Chat from '../../components/Chat'

const post = [
    {
        path : '/',
        component: Offers,
        name: 'Offers'
    },
    {
        path : '/needs',
        component: Needs,
        name: 'Needs'
    },
    {
        path : '/post/:id',
        component: Post,
        name: 'Post'
    },
    {
        path : '/chat',
        component: Chat,
        name: 'Chat',
        meta: {
            requiresAuth: true
          },
    },



]

export default post