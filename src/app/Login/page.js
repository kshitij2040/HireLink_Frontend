import LoginPage from '../../components/LoginPage';

export default function Login() {
  return (
    <div className="relative z-0 h-screen">
      <div className='absolute top-4 z-50 text-4xl left-4'>
        <h1>HireLink</h1>
      </div>
      {/* bg-image */}
      <img className="absolute inset-0 h-full w-full object-cover -z-50" src=".\Vector 1.png" alt="Background" />
      {/* blur div */}
      <div className="flex absolute inset-0 items-center justify-center z-30 backdrop-blur-2xl bg-opacity-50">
      <LoginPage/>
      </div>
    </div>
  );
}
