import {login} from '../../util/db';
export default defineEventHandler(async(event) => {
        const {email, password} = await useBody(event)
        console.log(email, password)
        const [data, error] = await login(email, password)
        if(error) {
            if(error.code === 'P2001') {
                return {
                    status: 404,
                    body: `${error.message}`,
                }
            }
            return {
                status: 500,
                body: "Server Error"
            }
        }
        return data;
})