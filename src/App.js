import './App.css';
import styled from 'styled-components';
import montain from './assets/estacion_montange.png';
import { useState } from 'react';

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  margin: 1rem 1rem;
`;

const Title = styled.p`
  text-align: center;
  font-size: 24px;
  font-weight: 600;
`;

const Container = styled.article`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  gap: 1rem;
`;

const InformationContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const ValueInput = styled.input`
  display: block;
  font-size: 1rem;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 5px 10px;
  height: 50px;
  .error-border {
    border: 1px solid red;
  }
  .validation-message {
    border: 1px solid green;
  }
`;

const ButtonContainer = styled.button`
  cursor: pointer;
  display: block;
  width: 100%;
  padding: 10px;
  margin: 40px 0 0;
  border-radius: 5px;
  border: 0;
  font-size: 1rem;
  font-weight: 700;
  background: green;
  :disabled {
    opacity: 0.5;
  }
`;

const ErrorContainer = styled.p`
  display: block;
  color: red;
`;

const ValidationContainer = styled.p`
  display: block;
  color: green;
`;

function App() {
  const [answer, setAnswer] = useState();
  const [tries, setTries] = useState(3);
  const [buttonAvailable, setButtonAvailable] = useState(true);
  const [error, setError] = useState();
  const [validationMessage, setValidationMessage] = useState();

  const handleChange = (event) => {
    const value = event.target.value;
    setAnswer(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (answer.toUpperCase() !== 'AUTOMNE') {
      setValidationMessage(undefined);
      if (tries !== 1) {
        setError(`Vous avez encore ${tries - 1} essais !`);
        setTries(prevState => prevState - 1);
      } else {
        setButtonAvailable(false);
        setError(`Plus d'essais disponibles`);
      }
    } else {
      setError(undefined);
      setValidationMessage('Bonne réponse');
    }
  };

  return (
    <Wrapper>
      <Title>Saissez la station pour passer à l'étape suivante</Title>
      <Container>
        <InformationContainer onSubmit={handleSubmit}>
          <h2>Entrez votre réponse</h2>
          <ValueInput name='answer' type='string' value={answer} onChange={handleChange} className={error ? 'error-border' : 'validation-message'} />
          {buttonAvailable && <ButtonContainer type='submit' disabled={!(!!answer || answer?.length > 0)}>👌🏻</ButtonContainer>}
          {error && <ErrorContainer>{error}</ErrorContainer>}
          {validationMessage && <ValidationContainer>{validationMessage}</ValidationContainer>}
        </InformationContainer>
        <img src={montain} alt='' />
      </Container>
    </Wrapper>
  );
}

export default App;
