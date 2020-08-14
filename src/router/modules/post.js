import Offers from '../../view/post/Offers'
import Needs from '../../view/post/Needs'
import Post from '../../view/post/Post'
import Chat from '../../components/Chat'
import Review from '../../components/Review'
import ReportPost from '../../components/ReportPost'

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
        path : '/report-post/:id',
        component: ReportPost,
        name: 'ReportPost',
        meta: {
            requiresAuth: true
          },
    },
    {
        path : '/chat',
        component: Chat,
        name: 'Chat',
        meta: {
            requiresAuth: true
          },
    },
    {
        path : '/review/:post_id/:transaction_id',
        component: Review,
        name: 'Review',
        meta: {
            requiresAuth: true
          },
    },



]

export default post