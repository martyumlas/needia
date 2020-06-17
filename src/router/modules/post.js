import Offers from '../../view/post/Offers'
import Needs from '../../view/post/Needs'
import Post from '../../view/post/Post'

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



]

export default post