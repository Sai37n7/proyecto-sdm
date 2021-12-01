import React, { useContext, useState } from 'react'
import {AuthContext} from '../context/AuthContext'
import {AuthTypes} from '../types/AuthTypes'
import { useHistory } from 'react-router-dom';
import '../css/login.css'
import Swal from 'sweetalert2'

export const Login = ({history}) => {

    const { dispatch } = useContext(AuthContext);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    history = useHistory();

    async function myFun(){
        Swal.fire({
            title: 'Verificando datos',
            text: 'Espere por favor',
            showConfirmButton: false,
            allowOutsideClick: false,
                onBeforeOpen: () => {
                    Swal.showLoading()
                },
        });
        await fetch('https://sdib.com.mx/portafolio/sdm_backend/public/api/auth/login',{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        }).then(res => res.json()).then(resData =>{
            if(resData.response_flag !== 1){
                Swal.close();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El correo o la contraseña son incorrectos',
                })
            }else{
                Swal.close();
                localStorage.setItem("token", resData.response.token);
                localStorage.setItem("sucursal", resData.response.sucursal);
                dispatch({type: AuthTypes.login});
                history.push("/inventario")
            }
        })
    }

    return (
        <>
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="fadeIn first">
                        <img className="img-rounded uwu mt-4" src="img/logo.png" id="icon" alt="User Icon" />
                    </div>
                        <input type="email"
                        onChange={(e)=>setEmail(e.target.value)}
                        value={email}
                        className="fadeIn second" 
                        placeholder="Correo" />
                        <input type="password"
                        onChange={(e)=>setPassword(e.target.value)}
                        value={password}
                        className="fadeIn third"
                        placeholder="Contraseña" />
                        <button onClick={myFun} className="fadeIn fourth">Iniciar sesión</button>
                    <div id="formFooter">
                        <a className="underlineHover" href="/#">¿Olvidaste tu contraseña?</a>
                    </div>
                </div>
            </div>
        </>
    )
}
