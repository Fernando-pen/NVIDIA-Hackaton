// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css'; // 1. Importe os estilos

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login bem sucedido com:', { email, password });

    const questionarioRespondido = localStorage.getItem('questionarioCompleto');

    if(questionarioRespondido == 'true') {
        console.log('Questionário já respondido, direcionando para Dashboard');
        navigate('/dashboard');
    } else {
        console.log('Usuario ainda nao respondeu formulario');
        navigate('/questionario');
    }
  };

  // 2. Use `styles.nomeDaClasse` para aplicar as classes
  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>Seja Bem Vindo!</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email"></label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
              placeholder='Email'
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password"></label>
            <input
            
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
              placeholder='Senha'
            />
          </div>
          <button type="submit" className={styles.button}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}