import example4 from '@/Assets/Images/example4.png'
import example7 from '@/Assets/Images/example7.png'
import example8 from '@/Assets/Images/example8.png'
import { ReactTyped } from 'react-typed'

export default function How() {
    return (
        <section id="how" className="flex flex-col justify-between p-5 text-black bg-[#d3c1b2]">
            <div className="max-w-[1240px] h-auto mx-auto mt-44">
                <div className="lg:text-left sm:text-center custom:text-center md:text-center">
                    <div className="title uppercase">
                        <ReactTyped className='text-5xl tracking-tight' startWhenVisible showCursor={false} strings={["<h2>How to book an appointment</h2>"]} typeSpeed={40} />
                    </div>
                </div>

                {/* Imagens e textos */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-24">
                    {/* Card 1 */}
                    <div className="bg-[#f4f4f4] p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
                        <h2 className='text-3xl font-bold mb-4'>Clique em "Solicitar orçamento"</h2>
                        <p className="text-[18px] font-light">
                        O botão "solicitar oçamento" vai redirecionar para um formulário para que possamos começar seu atendimento.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-[#f4f4f4] p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
                        <h2 className='text-3xl font-bold mb-4'>Preencha o formulário</h2>
                        <p className="text-[18px] font-light">
                        Informe seu nome, idade, disponibilidade, cidade, parte do corpo e, principalmente, ideia e referências para a tatuagem.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-[#f4f4f4] p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
                        <h2 className='text-3xl font-bold mb-4'>Agendamento e sessão</h2>
                        <p className="text-[18px] font-light">
                        Pronto! Em poucos dias entrarei em contato com você para prosseguirmos com o projeto.
                        </p>
                    </div>
                </div>


                <p className='text text-center mt-20'>
                    Todos os desenhos são únicos e autorais, proibidos de serem reproduzidos por terceiros. Eu não tatuo obras de outros tatuadores ou artistas, e também não crio designs para serem tatuados por outros tatuadores. Além disso, não realizo tatuagens em menores de 18 anos. Todas as minhas obras são exclusivas e tatuadas apenas uma vez, garantindo que cada design seja único para cada cliente.
                </p>

                <div className="flex justify-center mt-20 mb-10">
                    <button className="px-6 py-3 bg-[#FFF] text-black text-2xl rounded-full hover:bg-[#7c8f77] transition duration-300 uppercase">
                        Solicitar orçamento
                    </button>
                </div>
            </div>
        </section>

    )
}