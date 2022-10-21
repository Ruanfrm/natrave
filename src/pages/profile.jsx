import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAsync, useLocalStorage } from 'react-use'
import { format, formatISO } from 'date-fns'
import { toast } from 'react-toastify';
import axios from 'axios'
import { Icon, Card, DateSelect } from '~/components'

export const Profile = () => {

    const params = useParams();
    const navigate = useNavigate();
    const [currentDate, setDate] = useState(formatISO(new Date(2022, 10, 20)))
    const [auth, setAuth] = useLocalStorage('auth', {})

    const games = useAsync(async () => {
        return await axios.get(import.meta.env.VITE_API_URL + '/games', {params: { gameTime: currentDate }})
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                console.error(error);
                toast.error('Erro ao carregar os jogos');
                return;
            });
    }, [currentDate])

    const hunches = useAsync(async () => {
        return await axios.get(import.meta.env.VITE_API_URL + `/${auth.user.username}`)
            .then((res) => {
                const hunches = res.data.hunches.reduce((acc, hunch) => {
                    acc[hunch.gameId] = {
                        homeTeamScore: hunch.homeTeamScore.toString(),
                        awayTeamScore: hunch.awayTeamScore.toString()
                    }
                    console.log(acc);
                    return acc;
                }, {})
                return hunches;
            })
            .catch((error) => {
                console.error(error);
                toast.error('Erro ao carregar os palpites');
                return;
            });
    }, [currentDate, auth.user.username])

    const isLoading = games.loading || hunches.loading;
    const hasError = games.error || hunches.error;
    const isDone = !isLoading && !hasError;

    const logout = () => {
        setAuth({})
        navigate('/login')
    }

    return (
        <>
            <header className="bg-red-500 text-white">
                <div className="container max-w-3xl flex justify-between p-4">
                    <img src="/img/logo-fundo-vermelho.svg" className="w-32 md:w-40" />
                    {auth?.user?.id && (
                        <div onClick={logout} className="p-2 cursor-pointer">
                            Sair
                        </div>
                    )}
                </div>
            </header>
            <main className="space-y-6">
                <section id="header" className="bg-red-500 text-white">
                    <div className="container max-w-3xl space-y-2 p-4">
                        <a href="/dashboard">
                            <Icon name="back" className="w-10" />
                        </a>
                        <h3 className="text-2xl font-bold">{ auth?.user?.name }</h3>
                    </div>
                </section>
                <section id="content" className="container max-w-3xl p-4 space-y-4">
                    <h2 className="text-red-500 text-xl font-bold">Seus palpites</h2>
                    <DateSelect currentDate={currentDate} onChange={setDate} />
                    <div className="max-w-3xl space-y-4">
                        {isLoading && 
                            <div className="bg-yellow-500/[0.2] border-t-4 border-yellow-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                                <div className="flex justify-center">
                                <div>
                                    <p className="font-bold">Carregando...</p>
                                </div>
                                </div>
                            </div>
                        }
                        {hasError && 'Ops! Algo deu errado!'}
                        {isDone && games.value?.map(game => (
                            <Card 
                                key={game.id}
                                gameId={game.id}
                                homeTeam={game.homeTeam}
                                awayTeam={ game.awayTeam}
                                gameTime={format(new Date(game.gameTime), 'H:mm')}
                                homeTeamScore={hunches?.value?.[game.id]?.homeTeamScore || ''}
                                awayTeamScore={hunches?.value?.[game.id]?.awayTeamScore || ''}
                                disabled={true}
                            />
                        ))}
                        {isDone && games.value.length === 0 && 
                            <div className="bg-red-500/[0.2] border-t-4 border-red-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                                <div className="flex">
                                <div className="py-1"><svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                                <div>
                                    <p className="font-bold">Nenhum resultado encontrado</p>
                                    <p className="text-sm">Recarregue a página e tente novamente</p>
                                </div>
                                </div>
                            </div>
                        }
                    </div>
                </section>
            </main>
        </>
    )
}