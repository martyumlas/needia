import Profile from '../../view/profile/Profile'
import CreateOffer from '../../view/profile/CreateOffer'
import CreateNeed from '../../view/profile/CreateNeed'
import MyOffers from '../../view/profile/MyOffers'
import MyNeeds from '../../view/profile/MyNeeds'
import EditProfile from '../../view/profile/EditProfile'

import Form from '../../components/Form'

const profile = [
    {
        path : '/profile',
        component: Profile,
        name : 'Profile',
        meta: {
            requiresAuth: true
          },
            children: [
            // {
            //     path: '/profile',
            //     component: MyProfile
            // },
            {
                path: '/profile',
                component: MyOffers
            },
            {
                path: '/my-needs',
                component: MyNeeds
            },
            {
                path: '/create-offer',
                component: CreateOffer
            },
            {
                path: '/create-need',
                component: CreateNeed
            },
            {
                path : '/form',
                component: Form,
                name: 'Form'
            },
            {
                path : '/edit-profile',
                component: EditProfile,
                name: 'EditProfile'
            }
        ]
    }
]

export default profile