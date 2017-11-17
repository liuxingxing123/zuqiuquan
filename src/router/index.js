import Vue from 'vue'
import Router from 'vue-router'
import hot from '@/components/hot/hot';
import attention from '@/components/attention/attention';
import index from '@/components/index/index';
import faxian from '@/components/faxian/faxian';
import myself from '@/components/myself/myself';
import logout from '@/components/logout/logout';
Vue.use(Router)

export default new Router({
     routes: [
		{
			path: '/hot',
			component: hot,
		},
    	{
			path: '/attention',
			component: attention
		},
		{
          path: '/index',
          component: index
        },
        {
          path: '/faxian',
          component: faxian
        },
         {
          path: '/myself',
          component: myself
        },
        {
          path: '/logout',
          component: logout
        },
        { 
     	path: '/', 
     	redirect: '/index'
   		}
	],
	 mode:'history',
	 linkActiveClass:'active'
})
