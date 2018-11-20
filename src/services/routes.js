import Login from '../screens/Login'
import Register from '../screens/Register'
import Pitches from '../screens/Pitches'
import Pitch from '../screens/Pitch'
import PitchCreate from '../screens/PitchCreate'

export default [
    {
        name: 'Login',
        pathname: '/',
        component: Login,
        exact: true,
        auth: false,
    },
    {
        name: 'Register',
        pathname: '/register',
        component: Register,
        exact: false,
        auth: false,
    },
    {
        name: 'Pitches',
        pathname: '/pitches',
        component: Pitches,
        exact: false,
        auth: true,
    },
    {
        name: 'Pitch Create',
        pathname: '/pitch/new',
        component: PitchCreate,
        exact: false,
        auth: true,
    },
    {
        name: 'Pitch',
        pathname: '/pitch/:id',
        component: Pitch,
        exact: false,
        auth: true,
    },
    
]