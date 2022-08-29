import './error.css';

const errorImg =
  'https://media1.giphy.com/media/C21GGDOpKT6Z4VuXyn/200w.gif?cid=82a1493ba4p9buriuueaqjfscvn05d4rxyyp3b5gd56t11tj&rid=200w.gif&ct=g';

function ErrorPage() {
  return (
    <div>

      <img src={errorImg} alt="404 error" className="error-img" />
      
    </div>
  );
}

export default ErrorPage;
