import Profile from '../../view/profile/Profile'
import CreateOffer from '../../view/profile/CreateOffer'
import CreateNeed from '../../view/profile/CreateNeed'
import MyOffers from '../../view/profile/MyOffers'
import MyNeeds from '../../view/profile/MyNeeds'
import EditProfile from '../../view/profile/EditProfile'
import UpdatePassword from '../../view/profile/UpdatePassword'
import SavedOffers from '../../view/profile/SavedOffers'
import SavedNeeds from '../../view/profile/SavedNeeds'
import UserProfile from '../../view/profile/UserProfile'

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
            },
            {
                path : '/update-password',
                component: UpdatePassword,
                name: 'UpdatePassword'
            },
            {
                path : '/saved-offers',
                component: SavedOffers,
                name: 'SavedOffers'
            },
            {
                path : '/saved-needs',
                component: SavedNeeds,
                name: 'SavedNeeds'
            },
        ]
    },
    {
        path: '/user-profile/:id',
        component: UserProfile,
        name: 'UserProfile',
        meta: {
            requiresAuth: true
          },
    }
]

export default profile