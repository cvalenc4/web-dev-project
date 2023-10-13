import { useNavigate } from "react-router-dom";
export default function About() {
  const history = useNavigate();

  const buttonHandler = () => {
    history("/");
  };
  
  // this about page is planned to be finished in the future
  return (
    <section>
      <h1> Welcome to the about component </h1>
      <p> This is the about component </p>
      <button onClick={buttonHandler}> Press here to go Home </button>
    </section>
  )
}