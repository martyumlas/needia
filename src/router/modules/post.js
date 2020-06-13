import Offers from '../../view/post/Offers'
import Needs from '../../view/post/Needs'

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

]

export default post