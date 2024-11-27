'Use client'
import React, { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import rocket from '../../public/1.gif'
import Image from 'next/image';
import tree from '../../public/2.gif'
import santa from '../../public/3.gif'
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { env } from '../../next.config';
import axios, { Axios } from 'axios';
import { useRouter } from 'next/router';
import Confetti from 'react-confetti';
import logo from '../../public/logo.png'
import ConfettiExplosion from 'react-confetti-explosion';



const Dashboard = () => {
  const { data, status } = useSession();

  const [user, setUser] = useState(null);
  const[assign,setAssign]=useState(null);
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    let count = 0;

    if (data != null && count == 0) {
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/users/email/${data.user.email}`).then(res => setUser(res.data), count++)
    }

  }, [data]);


  function getSecretSanta() {
    if (user) {
      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}api/draw`,{
          giver: user.id,
        })
        .then((res) => {
          setAssign(res.data);

        })
        .catch((error) => {
          
        });
    } else {
      router.push("/");
    }
  }


 console.log(assign)
  return (
    
    <div>
      
      <div className="w-full h-screen flex backdrop-blur-sm bg-white/50 !overflow-y-hidden" data-aos="fade-down">
        
        <div className="w-1/3 bg-cover bg-center overflow-hidden max-sm:hidden" style={{ backgroundImage: `url(${rocket.src})` }}>
          <ConfettiExplosion duration={10000}/>
          <div className="w-full h-full backdrop-blur-sm bg-white/10">
              <Image src={logo} className=' w-64 p-4 z-10' alt='tecciance logo'/>
          </div>
        </div>

        
        <div className="w-1/3 bg-cover bg-center overflow-hidden max-sm:w-screen h-screen" style={{ backgroundImage: `url(${santa.src})` }}>
          <div className="w-full h-full backdrop-blur-sm bg-black/30 flex flex-col justify-between items-center">
          <ConfettiExplosion duration={10000} />
          <Image src={logo} className=' w-64 p-4 sm:hidden' alt='tecciance logo'/>
            <div className="flex flex-col items-center justify-center flex-grow">
              <h1 className='text-white text-4xl text-center font-bold'>{assign?`${'Get a gift for'}`:``}</h1>
              <h1 className="text-white text-4xl text-center font-bold">{assign?`${assign.takerName}`:`We wish you a merry christmas`}</h1>
            </div>

            <div className='mb-5'>
              <div class="centerer">
                <button class="button" disabled={assign} onClick={getSecretSanta}>Time to Choose!</button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/3 bg-cover bg-center overflow-hidden max-sm:hidden" style={{ backgroundImage: `url(${tree.src})` }}>
        <ConfettiExplosion duration={10000} />
          <div className="w-full h-full backdrop-blur-sm bg-white/10">
          </div>
        </div>
      </div>
    </div>
  )
};

export default Dashboard;
