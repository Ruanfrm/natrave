import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify';
import { useLocalStorage } from 'react-use'
import { Icon, Input } from '~/components' 
import { Navigate, useNavigate } from 'react-router-dom'

const validationSchema = yup.object().shape({
    email: yup.string().email('Informe um e-mail válido').required('Preencha seu e-mail'),
    password: yup.string().required('Preencha sua senha')
})

export const Login = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useLocalStorage('auth', {})
    const formik = useFormik({
        onSubmit: async (values) => {
            return await axios.post(import.meta.env.VITE_API_URL + '/login', {}, {
                auth: {
                    username: values.email,
                    password: values.password
                }
            })
            .then((res) => {
                setAuth(res.data);
                navigate('/dashboard');
            })
            .catch((error) => {
                console.log(formik.isSubmitting);
                formik.isSubmitting = false;
                console.error(error);
                toast.error(error?.response?.data);
                return [];
            });
        },
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema
    })

    if(auth?.user?.id) {
        return <Navigate to="/dashboard" replace="true" />
    }
    return (
        <div>
            <header className="p-4 border-b border-red-300">
                <div className="container max-w-xl flex justify-center">
                    <img src="/img/logo-fundo-branco.svg" className="w-32 md:w-40" />
                </div>
            </header>
            <main className="container max-w-xl p-4">
                <div className="p-4 flex space-x-4 items-center">
                    <a href="/">
                        <Icon name="arrowLeft" className="h-6"/>
                    </a>
                    <h2 className="text-xl font-bold">Entre na sua conta</h2>
                </div>
                <form className="p-4 space-y-6" onSubmit={formik.handleSubmit}>
                    <Input 
                        type="text"
                        name="email"
                        label="Seu e-mail"
                        placeholder="Digite seu e-mail"
                        error={formik.touched.email && formik.errors.email}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <Input 
                        type="password"
                        name="password"
                        label="Sua senha"
                        placeholder="Digite sua senha"
                        error={formik.touched.password && formik.errors.password}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <button type="submit" className="w-full text-center text-white bg-red-500 text px-6 py-3 rounded-xl disabled:opacity-50"
                        disabled={!formik.isValid || formik.isSubmitting}>
                        {formik.isSubmitting ? 'Carregando...' : 'Entrar'}
                    </button>
                </form>
            </main>
        </div>
    )
}