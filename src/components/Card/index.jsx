import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useLocalStorage } from 'react-use'
import { toast } from 'react-toastify';

const validationSchema = yup.object().shape({
    homeTeamScore: yup.string().required(),
    awayTeamScore: yup.string().required()
})

export const Card = ({ disabled, gameId, homeTeam, awayTeam, homeTeamScore, awayTeamScore, gameTime}) => {
    const [auth] = useLocalStorage('auth')
    const formik = useFormik({
        onSubmit: (values) => {
            axios.post('http://localhost:3000' + '/hunches', { ...values, gameId },
                { 
                    headers: {
                        authorization: `Bearer ${auth.accessToken}`
                    },
                }
            )
            .then((res) => {
                toast.success('Palpite realizado com sucesso!');
                return true;
            })
            .catch((error) => {
                console.error(error);
                toast.error('Não foi possível salvar o palpite');
                return;
            });
        },
        initialValues: {
            homeTeamScore,
            awayTeamScore
        },
        validationSchema
    })
    return (
        <div className="rounded-xl border border-gray-300 p-4 text-center space-y-4">
            <span className="text-sm md:text-base text-gray-700 font-bold">{gameTime}</span>
            <form className="flex space-x-4 justify-center items-center">
                <span className="uppercase">{homeTeam}</span>
                <img src={`/img/bandeiras/${homeTeam}.png`} />
                <input
                    type="number"
                    className="bg-red-500/[0.2] w-[55px] h-[55px] text-red-700 text-xl text-center rounded-md"
                    name="homeTeamScore"
                    value={formik.values.homeTeamScore}
                    onChange={formik.handleChange}
                    onBlur={formik.handleSubmit}
                    disabled={disabled}
                />
                <span className="mx-4 text-red-500 font-bold">X</span>
                <input
                    type="number"
                    className="bg-red-500/[0.2] w-[55px] h-[55px] text-red-700 text-xl text-center rounded-md"
                    name="awayTeamScore"
                    value={formik.values.awayTeamScore}
                    onChange={formik.handleChange}
                    onBlur={formik.handleSubmit}
                    disabled={disabled}
                />
                <img src={`/img/bandeiras/${awayTeam}.png`} />
                <span className="uppercase">{awayTeam}</span>
            </form>
        </div>
    )
}